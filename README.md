# Tech2C AI Challenge - EcoAgent

Este projeto é um MVP desenvolvido como parte do desafio técnico para a vaga de **AI-Enabled Frontend & Agentic Workflow Developer** na Tech2C. O objetivo foi criar uma interface moderna e inteligente para análise de dados energéticos, utilizando agentes de IA.

## 🚀 Funcionalidades Principais

1.  **Dashboard Inteligente**: Visão geral do consumo energético com KPIs modernos e responsivos.
2.  **Agente de IA Real/Mock**: Um assistente virtual que utiliza a **API do OpenRouter** (compatível com OpenAI) para aceder a modelos como o **GPT-3.5 Turbo** ou funcionar em modo simulado. O sistema alterna automaticamente baseado na configuração. [Ver guia de configuração](OPENAI_SETUP.md)
3.  **Chat Interface**: Interface de conversação fluida (estilo ChatGPT) integrada ao fluxo de trabalho.
4.  **Upload de Arquivos**: Área drag-and-drop para envio de relatórios (simulação de fluxo).

## 🛠️ Stack Tecnológico

-   **Frontend**: React 19, Vite, TypeScript
-   **Estilização**: Tailwind CSS, Lucide Icons, Framer Motion (para animações fluidas)
-   **IA/Agentes**: Padrão de design Vercel AI SDK integrado com **OpenRouter**.
-   **Backend**: Node.js + Express para orquestração de chamadas de IA.
-   **Arquitetura**: Sistema híbrido Real/Mock que alterna automaticamente.

## 📦 Como rodar o projeto

1.  **Instale as dependências**:
    ```bash
    npm install
    ```

2.  **Inicie o projeto completo (Frontend + Backend de IA)**:
    ```bash
    npm run dev:full
    ```

3.  Acesse `http://localhost:5173` no seu navegador.

## 🤖 Arquitetura de IA

Este projeto implementa um sistema de agente de IA robusto e pronto para produção:

-   **OpenRouter Integration**: Utiliza modelos potentes (como `openai/gpt-3.5-turbo`) seguindo o protocolo oficial da OpenAI.
-   **Streaming de Respostas**: As mensagens são exibidas em tempo real conforme são geradas.
-   **Fallback Automático**: Se não houver chave de API configurada no `.env`, o sistema utiliza um **Agente Mock** sofisticado que simula o comportamento da IA localmente.
-   **Tool Calling Concept**: O backend está preparado para integração com ferramentas externas (análise de dados, melhorias técnicas).

## 📂 Estrutura de Pastas

-   `src/pages`: Telas principais (Dashboard, Chat, Analysis).
-   `src/hooks`: Cérebro do sistema (`use-agent.ts` coordena a lógica híbrida).
-   `server.js`: Servidor Node.js para intermediação segura com APIs de IA.

## 💡 Decisões de Arquitetura

Optei por **Vite + React 19** para máxima performance. A inteligência foi desacoplada em um sistema de hooks modulares. O uso de um servidor backend garante que as chaves de API nunca sejam expostas ao browser do utilizador final, seguindo as melhores práticas de segurança.

---

Desenvolvido com 🤖 e ⚡ por Anthony Mendoza.
