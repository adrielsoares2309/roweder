import { Navigate, Route, Routes } from 'react-router-dom';
import Acesso from './pages/Acesso';
import Home from './pages/cliente/Home';
import Catalogo from './pages/cliente/Catalogo';
import Carrinho from './pages/cliente/Carrinho';
import Checkout from './pages/cliente/Checkout';
import PedidoFinalizado from './pages/cliente/PedidoFinalizado';
import Dashboard from './pages/admin/Dashboard';
import Pedidos from './pages/admin/Pedidos';
import Produtos from './pages/admin/Produtos';
import Configuracoes from './pages/admin/Configuracoes';

export default function App() {
  return (
    <Routes>
      <Route path="/" element={<Acesso />} />
      <Route path="/home" element={<Home />} />
      <Route path="/catalogo" element={<Catalogo />} />
      <Route path="/carrinho" element={<Carrinho />} />
      <Route path="/checkout" element={<Checkout />} />
      <Route path="/pedido-finalizado" element={<PedidoFinalizado />} />
      <Route path="/admin" element={<Dashboard />} />
      <Route path="/admin/pedidos" element={<Pedidos />} />
      <Route path="/admin/produtos" element={<Produtos />} />
      <Route path="/admin/configuracoes" element={<Configuracoes />} />
      <Route path="*" element={<Navigate to="/" replace />} />
    </Routes>
  );
}
