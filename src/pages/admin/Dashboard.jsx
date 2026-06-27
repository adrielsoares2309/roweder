import { Link } from 'react-router-dom';
import AdminLayout from '../../components/AdminLayout';
import StatusPedido from '../../components/StatusPedido';
import { lojaInicial } from '../../data/loja';
import { produtosIniciais } from '../../data/produtos';
import { calcularDashboard, listarPedidos } from '../../services/pedidoService';
import { carregarDados } from '../../services/storage';
import { formatarMoeda } from '../../utils/formatarMoeda';

export default function Dashboard() {
  const loja = carregarDados('roweder_config_loja', lojaInicial);
  const produtos = carregarDados('roweder_produtos', produtosIniciais);
  const pedidos = listarPedidos();
  const dashboard = calcularDashboard(pedidos, produtos);
  const maisVendidos = produtos.filter((produto) => produto.destaque || produto.promocao).slice(0, 4);

  return (
    <AdminLayout title="Visão geral" subtitle="Acompanhe as métricas e a operação de hoje.">
      <section className="stats-grid">
        <Metric title="Pedidos hoje" value={dashboard.pedidosHoje} icon="local_shipping" />
        <Metric title="Faturamento estimado" value={formatarMoeda(dashboard.faturamento)} icon="payments" />
        <Metric title="Pedidos pendentes" value={dashboard.pendentes} icon="warning" danger />
        <Metric title="Produtos ativos" value={dashboard.produtosAtivos} icon="inventory_2" />
        <Metric title="Ticket médio" value={formatarMoeda(dashboard.ticketMedio)} icon="point_of_sale" />
      </section>

      <section className="admin-grid">
        <div className="panel-card wide">
          <div className="panel-head">
            <h2>Vendas da semana</h2>
            <span>Gráfico demonstrativo</span>
          </div>
          <div className="fake-chart">
            {[38, 62, 42, 80, 95, 66, 28].map((altura, index) => <i key={index} style={{ height: `${altura}%` }} />)}
          </div>
        </div>
        <div className="panel-card">
          <div className="panel-head">
            <h2>Status da loja</h2>
          </div>
          <strong className={`store-status ${loja.status === 'Fechada' ? 'closed' : ''}`}>{loja.status}</strong>
          <p>Controle o status em Configurações.</p>
          <Link to="/admin/configuracoes" className="button secondary full">Editar configurações</Link>
        </div>
      </section>

      <section className="admin-grid">
        <div className="panel-card wide">
          <div className="panel-head">
            <h2>Pedidos recentes</h2>
            <Link to="/admin/pedidos">Ver todos</Link>
          </div>
          {pedidos.length ? (
            <div className="table-wrap">
              <table>
                <thead>
                  <tr><th>ID</th><th>Cliente</th><th>Total</th><th>Status</th></tr>
                </thead>
                <tbody>
                  {pedidos.slice(0, 5).map((pedido) => (
                    <tr key={pedido.id}>
                      <td>#{pedido.id}</td>
                      <td>{pedido.cliente.nome}</td>
                      <td>{formatarMoeda(pedido.total)}</td>
                      <td><StatusPedido status={pedido.status} /></td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          ) : (
            <p className="muted-message">Nenhum pedido recente.</p>
          )}
        </div>
        <div className="panel-card">
          <div className="panel-head">
            <h2>Produtos mais vendidos</h2>
          </div>
          <ul className="best-list">
            {maisVendidos.map((produto) => (
              <li key={produto.id}><span>{produto.nome}</span><strong>{formatarMoeda(produto.preco)}</strong></li>
            ))}
          </ul>
        </div>
      </section>
    </AdminLayout>
  );
}

function Metric({ title, value, icon, danger = false }) {
  return (
    <article className={`metric-card ${danger ? 'danger' : ''}`}>
      <span className="material-symbols-outlined">{icon}</span>
      <p>{title}</p>
      <strong>{value}</strong>
    </article>
  );
}
