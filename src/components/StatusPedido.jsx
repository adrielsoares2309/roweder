export default function StatusPedido({ status }) {
  const classe = {
    'Novo pedido': 'novo',
    Aceito: 'aceito',
    'Em separacao': 'separacao',
    'Em separação': 'separacao',
    'Saiu para entrega': 'entrega',
    Entregue: 'entregue',
    Cancelado: 'cancelado',
  }[status] || 'novo';

  return <span className={`status-pill ${classe}`}>{status === 'Em separacao' ? 'Em separação' : status}</span>;
}
