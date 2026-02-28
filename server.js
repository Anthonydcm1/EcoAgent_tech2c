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
    apiKey: process.env.OPENAI_API_KEY,
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

// Implementação real (simulada) das ferramentas
const toolsImplementation = {
    analyzeEnergyConsumption: (args) => {
        console.log('🛠️ Executando tool: analyzeEnergyConsumption', args);
        const period = args.period || 'último mês';
        // Simulando uma análise de dados real
        return {
            status: 'success',
            period: period,
            summary: 'Detectado um pico de consumo de 25% na terça-feira entre as 18h e 20h.',
            recommendation: 'Verificar sistema de climatização neste horário.',
            anomalies: [
                { time: 'Terça, 18:30', value: '4.5kWh', average: '3.2kWh' }
            ]
        };
    },
    suggestImprovements: (args) => {
        console.log('🛠️ Executando tool: suggestImprovements', args);
        const category = args.category || 'geral';
        const suggestions = {
            'iluminação': ['Trocar lâmpadas fluorescentes por LED', 'Instalar sensores de presença'],
            'climatização': ['Limpar filtros do AC', 'Ajustar temperatura para 23°C constante'],
            'maquinário': ['Realizar manutenção preventiva nos motores', 'Trocar correias gastas'],
            'geral': ['Instalar painéis solares', 'Negociar nova tarifa horária']
        };
        return {
            category: category,
            recommendations: suggestions[category] || suggestions['geral']
        };
    }
};

// Rota Principal de Chat: Suporta Streaming e Tool Calling (Agente)
app.post('/api/chat', async (req, res) => {
    try {
        const { messages } = req.body;

        if (!messages || !Array.isArray(messages)) {
            return res.status(400).json({ error: 'Lista de mensagens é obrigatória' });
        }

        // Define os headers de streaming imediatamente para suportar a resposta em tempo real
        res.setHeader('Content-Type', 'text/plain; charset=utf-8');
        res.setHeader('Cache-Control', 'no-cache');
        res.setHeader('Connection', 'keep-alive');

        let currentMessages = [
            { role: 'system', content: SYSTEM_PROMPT },
            ...messages,
        ];

        // Loop de execução do Agente (permite que ele chame ferramentas e use o resultado)
        let iterations = 0;
        const maxIterations = 3;

        while (iterations < maxIterations) {
            iterations++;

            const completion = await openai.chat.completions.create({
                model: 'openai/gpt-3.5-turbo',
                messages: currentMessages,
                tools: tools,
                tool_choice: 'auto',
                temperature: 0.7,
                stream: false, // Para gerir tool calling no backend de forma simples, usamos stream: false na primeira fase
            });

            const message = completion.choices[0].message;
            currentMessages.push(message);

            // Se o modelo decidir NÃO chamar ferramentas, enviamos o conteúdo final e paramos
            if (!message.tool_calls) {
                if (message.content) {
                    res.write(message.content);
                }
                break;
            }

            // Se o modelo decidir CHAMAR ferramentas
            for (const toolCall of message.tool_calls) {
                const functionName = toolCall.function.name;
                const functionArgs = JSON.parse(toolCall.function.arguments);

                // Envia uma notificação visual via stream (opcional, melhora UX)
                res.write(`\n> [Agente executando: ${functionName}...]\n\n`);

                const functionResponse = toolsImplementation[functionName](functionArgs);

                currentMessages.push({
                    tool_call_id: toolCall.id,
                    role: 'tool',
                    name: functionName,
                    content: JSON.stringify(functionResponse),
                });
            }
            // O loop continua para que o modelo analise o resultado da ferramenta e responda ao usuário
        }

        res.end();
    } catch (error) {
        console.error('❌ Erro na API:', error);
        if (!res.headersSent) {
            res.status(500).json({ error: 'Erro de conexão com a IA' });
        } else {
            res.write('\n\n[Erro: Ocorreu uma interrupção na conexão com a IA]');
            res.end();
        }
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
