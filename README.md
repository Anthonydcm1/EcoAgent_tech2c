# Tech2C AI Challenge - EcoAgent 🌿🔋

Este projeto é um MVP desenvolvido como parte do desafio técnico para a vaga de **AI-Enabled Frontend & Agentic Workflow Developer** na Tech2C. O foco principal foi a criação de um **Agente de IA com Capacidades de Execução (Agentic Workflow)** integrado a uma interface de alta performance.

## 🚀 Funcionalidades Principais

1.  **Agente de IA com Tool Calling (Obrigatório)**: Um workflow inteligente onde a IA não apenas conversa, mas **executa funções (Tools)** no backend para processar dados de energia e sugerir melhorias.
2.  **Interface Frontend de Alta Performance**: Dashboard moderno com efeito *glassmorphism*, suporte a **Modo Escuro (Dark Mode)** e design 100% responsivo.
3.  **ChatWidget Flutuante**: O assistente de IA foi migrado para um widget flutuante persistente, permitindo interação contínua em qualquer página do sistema.
4.  **Sistema Híbrido Real/Mock**: Alternância inteligente entre a **API do OpenRouter** (GPT-3.5 Turbo) e um Agente Simulado para demonstração sem dependência de rede.

## 🤖 Workflow do Agente de IA

O projeto implementa um fluxo de trabalho avançado baseado no conceito de **Chain of Thought** e **Function Calling**:

### 1. Fluxo de Execução
O workflow conecta a entrada do utilizador à inteligência da IA através das seguintes etapas:
- **Entrada**: O utilizador solicita uma análise (ex: "Analise meu consumo da última semana").
- **Raciocínio**: O Agente processa a intenção e decide que precisa de dados externos.
- **Invocação de Tool**: O Agente chama a função `analyzeEnergyConsumption` no backend.
- **Processamento**: O servidor executa a lógica de análise e retorna o JSON para o Agente.
- **Resposta**: O Agente interpreta os dados técnicos e entrega uma resposta humanizada e acionável ao utilizador.

### 2. Ferramentas (Tools) Implementadas
O Agente possui capacidades de execução real no servidor via `server.js`:
-   `analyzeEnergyConsumption`: Processa períodos de tempo e identifica anomalias/picos de consumo.
-   `suggestImprovements`: Gera recomendações técnicas baseadas em categorias específicas (iluminação, climatização, maquinário).

## 🛠️ Stack Tecnológico

-   **Frontend**: React 19, Vite, TypeScript.
-   **IA SDK**: Utilização do **Vercel AI SDK** (`ai`, `@ai-sdk/react`) para gestão do estado do chat.
-   **Backend**: Node.js + Express (Orquestrador do Agente).
-   **Animações**: Framer Motion (Transições de estado e micro-interações).
-   **Estilização**: Tailwind CSS.

## 📦 Como rodar o projeto

1.  **Instale as dependências**:
    ```bash
    npm install
    ```

2.  **Configure as variáveis de ambiente**:
    Crie/edite o arquivo `.env` com sua chave do OpenRouter (veja [OPENAI_SETUP.md](OPENAI_SETUP.md)):
    ```env
    VITE_OPENAI_API_KEY=sk-or-v1-sua-chave
    ```

3.  **Inicie o projeto completo (Frontend + Agent Server)**:
    ```bash
    npm run dev:full
    ```

4.  Aceda a `http://localhost:5173`.

## 📂 Estrutura de Pastas

-   `server.js`: **Cérebro do Agente**, onde residem as definições e implementações das Tools.
-   `src/components/ChatWidget.tsx`: Interface flutuante de interação com o Agente.
-   `src/hooks/use-agent.ts`: Orquestrador que decide entre o Agente Real e o Mock.
-   `src/pages/Analysis.tsx`: Interface de análise visual de dados energéticos.

---

Desenvolvido para demonstrar a fusão entre **UX Moderna** e **IA Agentélica**.
Submetido por: Anthony Mendoza.
