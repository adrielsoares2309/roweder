import { STATUS_PEDIDOS } from '../services/pedidoService';
import { formatarMoeda } from '../utils/formatarMoeda';
import StatusPedido from './StatusPedido';

export default function PedidoCard({ pedido, onStatus }) {
  const endereco = `${pedido.cliente.rua}, ${pedido.cliente.numero} - ${pedido.cliente.bairro}`;

  return (
    <article className="order-card">
      <div className="order-card-head">
        <div>
          <strong>#{pedido.id}</strong>
          <span>{new Date(pedido.criadoEm).toLocaleString('pt-BR')}</span>
        </div>
        <StatusPedido status={pedido.status} />
      </div>
      <div className="order-grid">
        <p><b>Cliente</b>{pedido.cliente.nome}</p>
        <p><b>Telefone</b>{pedido.cliente.telefone}</p>
        <p><b>Endereço</b>{endereco}</p>
        <p><b>Pagamento</b>{pedido.cliente.pagamento}</p>
      </div>
      <ul className="order-items">
        {pedido.itens.map((item) => (
          <li key={`${pedido.id}-${item.id}`}>
            <span>{item.quantidade}x {item.nome}</span>
            <strong>{formatarMoeda(item.preco * item.quantidade)}</strong>
          </li>
        ))}
      </ul>
      <div className="order-footer">
        <strong>{formatarMoeda(pedido.total)}</strong>
        <select value={pedido.status} onChange={(event) => onStatus(pedido.id, event.target.value)}>
          {STATUS_PEDIDOS.map((status) => <option key={status}>{status}</option>)}
        </select>
      </div>
    </article>
  );
}
