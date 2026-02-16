# 🤖 Integração com OpenRouter (IA Gratuita) - Guia de Uso

Este projeto utiliza o **OpenRouter**, permitindo o acesso a modelos compatíveis com a API da OpenAI (como o `gpt-3.5-turbo`) de forma simples e segura.

## 📋 Pré-requisitos

1. **Conta OpenRouter**: Crie uma conta em [OpenRouter.ai](https://openrouter.ai/)
2. **API Key**: Obtenha sua chave gratuita em [OpenRouter Keys](https://openrouter.ai/keys)
3. **Créditos**: Para modelos marcados como `:free`, você não precisa de créditos pagos.

## 🚀 Como Configurar

### Passo 1: Criar arquivo `.env`

Se ainda não o fez, copie o arquivo `.env.example` e renomeie para `.env`:

```bash
cp .env.example .env
```

### Passo 2: Adicionar sua API Key

Abra o arquivo `.env` e substitua `your-openrouter-key-here` pela sua chave do OpenRouter:

```env
VITE_OPENAI_API_KEY=sk-or-v1-xxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxx
VITE_API_ENDPOINT=http://localhost:3001
```

⚠️ **IMPORTANTE**: O prefixo da chave do OpenRouter costuma ser `sk-or-v1-`.

### Passo 3: Iniciar o Projeto

Você tem duas opções:

#### Opção A: Rodar tudo junto (Recomendado)
```bash
npm run dev:full
```
Este comando inicia simultaneamente:
- Frontend (Vite) na porta 5173
- Backend (Express) na porta 3001

#### Opção B: Rodar separadamente
Em dois terminais diferentes:

**Terminal 1 - Frontend:**
```bash
npm run dev
```

**Terminal 2 - Backend:**
```bash
npm run server
```

### Passo 4: Testar

1. Abra o navegador em `http://localhost:5173`
2. Navegue até a página "Assistente IA"
3. Digite uma mensagem e veja a resposta real da OpenAI! 🎉

## 🔄 Como Funciona

### Sistema Híbrido Inteligente

O projeto usa um hook `useAgent()` que **detecta automaticamente** qual agente usar:

```typescript
// src/hooks/use-agent.ts
export function useAgent() {
    const hasApiKey = import.meta.env.VITE_OPENAI_API_KEY && 
                      import.meta.env.VITE_OPENAI_API_KEY !== 'your-api-key-here';
    
    const useReal = hasApiKey && !forceMock;
    
    return useReal ? useRealAgent() : useMockAgent();
}
```

**Comportamento:**
- ✅ **Com API Key configurada**: Usa a IA real via OpenRouter (ex: GPT-3.5 Turbo)
- ❌ **Sem API Key**: Usa agente mock (simulado) para desenvolvimento offline
- 🔧 **Forçar Mock**: Adicione `VITE_FORCE_MOCK=true` no `.env`

### Arquitetura

```
┌─────────────┐      ┌─────────────┐      ┌─────────────┐
│   Frontend  │─────▶│   Backend   │─────▶│   OpenAI    │
│  (React)    │      │  (Express)  │      │     API     │
│  Port 5173  │      │  Port 3001  │      │             │
└─────────────┘      └─────────────┘      └─────────────┘
```

**Por que usar um backend?**
- 🔒 **Segurança**: API key fica no servidor, não exposta no frontend
- 🎯 **Controle**: Podemos adicionar rate limiting, logs, etc.
- 📊 **Monitoramento**: Rastrear uso e custos

## 💰 Custos

O projeto está configurado por padrão com o modelo **GPT-3.5 Turbo**, conhecido pelo seu equilíbrio entre performance e custo:

- **Input**: ~$0.15 por 1M tokens
- **Output**: ~$0.60 por 1M tokens

Para referência:
- 1 conversa típica ≈ 500-1000 tokens
- 1000 conversas ≈ $0.50 - $1.00

## 🛠️ Personalização

### Alterar o Modelo

Edite `server.js` linha 48:

```javascript
model: 'openai/gpt-3.5-turbo', // Altere para outros modelos disponíveis no OpenRouter
```

### Modificar o System Prompt

Edite `server.js` linhas 19-32 para customizar o comportamento do agente.

### Ajustar Temperatura

Edite `server.js` linha 50:

```javascript
temperature: 0.7, // 0.0 = mais determinístico, 1.0 = mais criativo
```

## 🐛 Troubleshooting

### Erro: "Cannot find module 'ai/react'"
Execute:
```bash
npm install
```

### Erro: "Invalid API Key"
- Verifique se a API key está correta no `.env`
- Confirme que a key começa com `sk-`
- Verifique se tem créditos na conta OpenAI

### Erro: "CORS"
- Certifique-se de que o backend está rodando na porta 3001
- Verifique se `VITE_API_ENDPOINT` está correto no `.env`

### Agente não responde
1. Abra o console do navegador (F12)
2. Verifique se há mensagens de erro
3. Confirme que o backend está rodando
4. Teste o endpoint: `http://localhost:3001/api/health`

## 📚 Recursos Adicionais

- [Documentação OpenAI](https://platform.openai.com/docs)
- [Vercel AI SDK](https://sdk.vercel.ai/docs)
- [Pricing OpenAI](https://openai.com/api/pricing/)

## 🎓 Modo de Desenvolvimento

Para desenvolver sem gastar créditos da OpenAI, adicione no `.env`:

```env
VITE_FORCE_MOCK=true
```

Isso força o uso do agente mock mesmo com API key configurada.

---

**Desenvolvido com 🤖 e ⚡ por Anthony Mendoza**
