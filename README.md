# Tech2C AI Challenge - EcoAgent

Este projeto é um MVP desenvolvido como parte do desafio técnico para a vaga de **AI-Enabled Frontend & Agentic Workflow Developer** na Tech2C. O objetivo foi criar uma interface moderna e inteligente para análise de dados energéticos, utilizando agentes de IA.

## 🚀 Funcionalidades Principais

1.  **Dashboard Inteligente**: Visão geral do consumo energético com KPIs modernos e responsivos.
2.  **Agente de IA (Simulado)**: Um assistente virtual capaz de "analisar" dados e sugerir melhorias. Utilizo um mock sofisticado para simular o comportamento de um LLM sem depender de chaves de API pagas.
3.  **Chat Interface**: Interface de conversação fluida (estilo ChatGPT) integrada ao fluxo de trabalho.
4.  **Upload de Arquivos**: Área drag-and-drop para envio de relatórios (simulação de fluxo).

## 🛠️ Stack Tecnológico

-   **Frontend**: React 18, Vite, TypeScript
-   **Estilização**: Tailwind CSS, Lucide Icons, Framer Motion (para animações fluidas)
-   **IA/Agentes**: Padrão de design inspirado no Vercel AI SDK (implementação mockada via hook `useMockAgent` para contornar a falta de API Key OpenAI).
-   **Arquitetura**: Componentes modulares, separação de hooks de lógica e UI.

## 📦 Como rodar o projeto

1.  **Instale as dependências**:
    ```bash
    npm install
    ```

2.  **Inicie o servidor de desenvolvimento**:
    ```bash
    npm run dev
    ```

3.  Acesse `http://localhost:5173` no seu navegador.

## 🤖 Relatório de IA

Para acelerar o desenvolvimento, utilizei diversas técnicas de IA Generativa e Automação:

-   **Geração de Código**: O código base da UI (Sidebar, Layout, Dashboard) foi acelerado por IA, garantindo padrões modernos e responsividade imediata.
-   **Mocking Inteligente**: Como não havia chave da OpenAI disponível, instruí a IA a criar um `useMockAgent` que simula latência de rede e respostas contextuais baseadas em palavras-chave ("analisar", "custo", etc), mimetizando uma chamada real de Tool Calling.
-   **Estruturação de Tarefas**: O planejamento (Task.md e Implementation Plan) foi gerado automaticamente para garantir cobertura total dos requisitos.

## 📂 Estrutura de Pastas

-   `src/components/layout`: Componentes estruturais (Sidebar, Header).
-   `src/components/ui`: Componentes reutilizáveis (FileUploader).
-   `src/pages`: Telas principais (Dashboard, Chat, Analysis).
-   `src/hooks`: Lógica de negócio e integração com IA (useMockAgent).
-   `src/lib`: Utilitários (cn, formatações).

## 💡 Decisões de Arquitetura

Optei por **Vite + React** ao invés de Next.js para manter o MVP leve e focado no client-side, dado o escopo e o tempo. A "inteligência" foi desacoplada em um hook, permitindo que no futuro, basta substituir o `useMockAgent` pelo `useChat` real do Vercel AI SDK e configurar uma rota de API, sem alterar a UI.

---

Desenvolvido com 🤖 e ⚡ por Anthony Mendoza.
