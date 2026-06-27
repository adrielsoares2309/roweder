import { calcularSubtotal, calcularTotal } from '../services/carrinhoService';
import { formatarMoeda } from '../utils/formatarMoeda';

export default function CarrinhoResumo({ carrinho, taxaEntrega, action }) {
  const subtotal = calcularSubtotal(carrinho);
  const total = calcularTotal(carrinho, taxaEntrega);

  return (
    <aside className="summary-card">
      <h2>Resumo</h2>
      <div><span>Subtotal</span><strong>{formatarMoeda(subtotal)}</strong></div>
      <div><span>Taxa de entrega</span><strong>{formatarMoeda(taxaEntrega)}</strong></div>
      <div className="summary-total"><span>Total</span><strong>{formatarMoeda(total)}</strong></div>
      {action}
    </aside>
  );
}
