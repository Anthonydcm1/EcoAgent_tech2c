
import { BrowserRouter, Routes, Route } from 'react-router-dom';
import { AppLayout } from './components/layout/AppLayout';
import { Dashboard } from './pages/Dashboard';
import { Analysis } from './pages/Analysis';
import { Chat } from './pages/Chat';
import { NotFound } from './pages/NotFound';
import './App.css';

// Componente principal que define a estrutura de roteamento
function App() {
  return (
    <BrowserRouter>
      <Routes>
        {/* Layout base que envolve as sub-páginas */}
        <Route path="/" element={<AppLayout />}>
          {/* Rota inicial: Painel de controle */}
          <Route index element={<Dashboard />} />
          {/* Rota de análise de dados ambientais */}
          <Route path="analysis" element={<Analysis />} />
          {/* Rota de chat com a IA */}
          <Route path="chat" element={<Chat />} />
          {/* Rota de fallback para páginas não encontradas */}
          <Route path="*" element={<NotFound />} />
        </Route>
      </Routes>
    </BrowserRouter>
  );
}

export default App;
