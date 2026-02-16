# ⚡ Início Rápido - 3 Minutos

## 🎯 Objetivo
Fazer o EcoAgent funcionar com IA real via OpenRouter (OpenAI Compatible) em menos de 3 minutos!

## 📝 Checklist

### ☑️ Pré-requisitos
- [ ] Node.js instalado (v18+)
- [ ] Conta OpenRouter criada
- [ ] API Key do OpenRouter obtida (prefixo `sk-or-v1-`)

### 🚀 Passos

#### 1️⃣ Criar arquivo .env (30 segundos)
```bash
# Windows (PowerShell)
Copy-Item .env.example .env

# Mac/Linux
cp .env.example .env
```

#### 2️⃣ Adicionar API Key (30 segundos)
Abra `.env` e cole sua chave:
```env
VITE_OPENAI_API_KEY=sk-proj-SUA_CHAVE_AQUI
```

💡 **Onde obter a chave?**
1. Acesse: https://openrouter.ai/keys
2. Clique em "Create Key"
3. Copie a chave (começa com `sk-or-v1-`)

#### 3️⃣ Instalar dependências (1 minuto)
```bash
npm install
```

#### 4️⃣ Iniciar o projeto (10 segundos)
```bash
npm run dev:full
```

Isso inicia:
- ✅ Frontend em `http://localhost:5173`
- ✅ Backend em `http://localhost:3001`

#### 5️⃣ Testar! (30 segundos)
1. Abra `http://localhost:5173`
2. Clique em "Assistente IA" no menu
3. Digite: "Olá, me ajude a economizar energia"
4. 🎉 Veja a resposta real da IA (GPT-3.5 Turbo)!

---

## 🐛 Problemas?

### ❌ Erro: "Cannot find module"
```bash
npm install
```

### ❌ Erro: "Invalid API Key"
- Verifique se copiou a chave completa
- Confirme que não tem espaços extras
- Teste em: https://platform.openai.com/playground

### ❌ Erro: "Port already in use"
Algum processo está usando a porta 3001 ou 5173.

**Solução rápida:**
```bash
# Windows
netstat -ano | findstr :3001
taskkill /PID <número_do_processo> /F

# Mac/Linux
lsof -ti:3001 | xargs kill -9
```

### ❌ Agente não responde
1. Veja o console do navegador (F12)
2. Verifique se ambos servidores estão rodando
3. Teste: http://localhost:3001/api/health

---

## 🎓 Modo Teste (Sem gastar créditos)

Quer testar sem usar a API?

No `.env`, adicione:
```env
VITE_FORCE_MOCK=true
```

Rode apenas:
```bash
npm run dev
```

O sistema usará respostas simuladas!

---

## 📊 Monitorar Uso

Acompanhe seus gastos em:
https://platform.openai.com/usage

**Dica:** Configure um limite de gastos em:
https://platform.openai.com/account/billing/limits

---

## ✅ Tudo funcionando?

Parabéns! 🎉 Agora você tem:
- ✅ Chat com IA real
- ✅ Streaming de respostas
- ✅ Sistema híbrido (mock/real)
- ✅ Backend seguro

**Próximo passo:** Explore `OPENAI_SETUP.md` para personalização avançada!

---

**Tempo total:** ~3 minutos ⏱️
