import express from 'express';
import cors from 'cors';
import OpenAI from 'openai';
import dotenv from 'dotenv';

// Configuração inicial: Carrega as variáveis do ficheiro .env
dotenv.config();

const app = express();
const PORT = process.env.PORT || 3001;

// Middlewares essenciais para o funcionamento da API
app.use(cors()); // Permite que o frontend (Vite) aceda a esta API
app.use(express.json()); // Permite receber e ler dados em formato JSON

// Configuração do Cliente OpenAI adaptado para o OpenRouter
// O OpenRouter segue o mesmo protocolo da OpenAI, permitindo usar modelos gratuitos
const openai = new OpenAI({
    apiKey: process.env.VITE_OPENAI_API_KEY,
    baseURL: 'https://openrouter.ai/api/v1',
    defaultHeaders: {
        'HTTP-Referer': 'http://localhost:5173', // Obrigatório para o OpenRouter
        'X-Title': 'EcoAgent',                  // Identificação opcional do projeto
    }
});

// Prompt de Sistema: Define a personalidade e regras do EcoAgent
const SYSTEM_PROMPT = `Você é o EcoAgent, um assistente especializado em energia, alimentado pelo modelo gpt-oss-120b via OpenRouter.
Sua missão é analisar dados de consumo e sugerir otimizações.
Sempre que o usuário fornecer dados, procure por anomalias (picos acima de 20% da média).
Seja conciso e use formatação Markdown para listas e ênfase.

Diretrizes de Personalidade:
- Tom: Profissional, prestativo e analítico.
- Objetivo: Ajudar o usuário a reduzir custos e entender seu consumo.
- Limitações: Não deve dar conselhos financeiros legais, apenas estimativas baseadas em dados técnicos.

Ferramentas disponíveis:
1. analyzeEnergyConsumption: Analisa dados de consumo e identifica picos e anomalias
2. suggestImprovements: Sugere ações para melhorar eficiência energética`;

// Definição técnica das ferramentas que o modelo pode decidir "chamar"
const tools = [
    {
        type: 'function',
        function: {
            name: 'analyzeEnergyConsumption',
            description: 'Analisa dados de consumo e identifica picos e anomalias',
            parameters: {
                type: 'object',
                properties: {
                    period: { type: 'string', description: 'O período a analisar (ex: "última semana")' },
                },
            },
        },
    },
    {
        type: 'function',
        function: {
            name: 'suggestImprovements',
            description: 'Sugere ações para melhorar eficiência energética baseada no contexto',
            parameters: {
                type: 'object',
                properties: {
                    category: { type: 'string', enum: ['iluminação', 'climatização', 'maquinário', 'geral'] },
                },
            },
        },
    }
];

// Rota Principal de Chat: Suporta Streaming (respostas em tempo real)
app.post('/api/chat', async (req, res) => {
    try {
        const { messages } = req.body;

        if (!messages || !Array.isArray(messages)) {
            return res.status(400).json({ error: 'Lista de mensagens é obrigatória' });
        }

        // Combina o prompt de sistema com o histórico do utilizador
        const messagesWithSystem = [
            { role: 'system', content: SYSTEM_PROMPT },
            ...messages,
        ];

        // 1. Solicita a resposta ao modelo ANTES de definir os headers
        const stream = await openai.chat.completions.create({
            model: 'openai/gpt-3.5-turbo', // Modelo oficial OpenAI via OpenRouter
            messages: messagesWithSystem,
            stream: true,
            temperature: 0.7,
            max_tokens: 1000,
        });

        // 2. Se chegou aqui, a ligação funcionou. Define os headers de streaming.
        res.setHeader('Content-Type', 'text/plain; charset=utf-8');
        res.setHeader('Cache-Control', 'no-cache');
        res.setHeader('Connection', 'keep-alive');

        // 3. Envia os dados como texto puro (compatível com useChat)
        for await (const chunk of stream) {
            const content = chunk.choices[0]?.delta?.content || '';
            if (content) {
                res.write(content);
            }
        }

        res.end();
    } catch (error) {
        console.error('❌ Erro na API:', error.message);

        // Se ainda não enviamos nada, podemos enviar um JSON de erro
        if (!res.headersSent) {
            if (error.status === 404 || error.message?.includes('data policy')) {
                return res.status(500).json({
                    error: 'Configuração do OpenRouter necessária',
                    message: 'Verifique se ativou o 3º interruptor no OpenRouter e REINICIE o comando npm run dev:full.'
                });
            }
            return res.status(500).json({
                error: 'Erro de conexão com a IA',
                message: error.message || 'O servidor de IA não respondeu corretamente.'
            });
        }
        res.end();
    }
});

// Endpoint de Chat Simples (Fallback) para casos onde o streaming não é desejado
app.post('/api/chat/simple', async (req, res) => {
    try {
        const { messages } = req.body;

        if (!messages || !Array.isArray(messages)) {
            return res.status(400).json({ error: 'Lista de mensagens é obrigatória' });
        }

        const messagesWithSystem = [
            { role: 'system', content: SYSTEM_PROMPT },
            ...messages,
        ];

        const completion = await openai.chat.completions.create({
            model: 'meta-llama/llama-3.3-70b-instruct:free',
            messages: messagesWithSystem,
            temperature: 0.7,
            max_tokens: 1000,
        });

        const response = completion.choices[0]?.message?.content || '';
        res.json({ content: response });
    } catch (error) {
        console.error('Erro no endpoint de chat simples:', error);
        res.status(500).json({
            error: 'Erro interno no servidor',
            message: error.message
        });
    }
});

// Endpoint de monitorização (Health Check)
app.get('/api/health', (req, res) => {
    res.json({ status: 'ok', server: 'EcoAgent API', timestamp: new Date().toISOString() });
});

// Inicia o servidor na porta configurada
app.listen(PORT, () => {
    console.log(`🚀 EcoAgent API Server running on http://localhost:${PORT}`);
    console.log(`📡 Chat endpoint: http://localhost:${PORT}/api/chat`);
    console.log(`📡 Model: meta-llama/llama-3.3-70b-instruct:free`);
});
