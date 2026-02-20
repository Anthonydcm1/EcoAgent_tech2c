
Aqui está um resumo rápido do desafio técnico

Um MVP (Minimum Viable Product) é a versão mais simples possível de um produto que ainda entrega valor real para o usuário.

## ✅ O que foi entregue (100% Funcional)

1.  **Interface "Premium"**: Fiz questão de criar algo que saltasse aos olhos. Usei um design dark moderno, com transparências (glassmorphism) e 100% responsivo (funciona no PC e no Telemóvel).

2.  **Agente IA Real (Agentic Workflow)**: O chat não é só conversa. Implementei o **Function Calling** real via Vercel AI SDK. Se pedires para ele analisar o consumo, o servidor "executa" uma tool de verdade no backend para processar os dados.

3.  **Widget Flutuante**: Para facilitar a vida do utilizador,coloquei como um botão flutuante. Assim, ele pode consultar a IA enquanto navega pelo Dashboard.

4.  **Sistema Híbrido**: O projeto está pronto para review mesmo sem chave de API. Ele detecta se tens a chave da OpenAI e, se não tiveres, ele usa um **Modo Simulado (Mock)** para mostrar como o fluxo funciona.

5.  **Documentação de Agente**: Criei o ficheiro `AGENTS.md` definindo a personalidade e as regras da IA, como pedido nos pontos opcionais.

## 🛠️ O que "faltou" (Opcionais não implementados)

Como o foco foi a **velocidade de entrega** e a **inteligência do workflow** (que eram os critérios de 30% cada), deixei o seguinte para uma v2:

*   **Testes Unitários**: Por ser um MVP de alta velocidade, foquei em testes manuais de fluxo e interface.

*   **Dockerização**: O projeto roda liso com `npm run dev:full`, mas não cheguei a criar o container Docker.

*   **Deploy Online**: Mantive o projeto local para garantir que a conexão com o servidor Node.js (Backend) funcionasse perfeitamente no ambiente de avaliação.

## 💡 Por que esta solução?

Muitos projetos de IA são apenas "caixas de texto". Eu foquei em demonstrar **capacidade de execução**. O meu agente consegue separar o que é conversa do que é ação (Tool/Function Calling), que é o futuro das aplicações de IA que resolvem problemas de negócio.

---
**Anthony Mendoza**
*AI-Enabled Frontend & Agentic Workflow*
