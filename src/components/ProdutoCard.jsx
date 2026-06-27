import { formatarMoeda } from '../utils/formatarMoeda';
import Icon from './Icon';

export default function ProdutoCard({ produto, onAdicionar, compacto = false }) {
  return (
    <article className={`product-card ${compacto ? 'product-card-compact' : ''}`}>
      <div className="product-image">
        <img src={produto.imagem} alt={produto.nome} onError={(event) => { event.currentTarget.style.display = 'none'; }} />
        <span className="fallback-product">{produto.nome.slice(0, 2).toUpperCase()}</span>
        {produto.promocao && <span className="badge badge-error">Promo</span>}
        {produto.destaque && <span className="badge badge-blue">Destaque</span>}
      </div>
      <div className="product-body">
        <p className="product-category">{produto.categoria}</p>
        <h3>{produto.nome}</h3>
        <p>{produto.descricao}</p>
        <div className="product-actions">
          <strong>{formatarMoeda(produto.preco)}</strong>
          <button className="icon-button primary" type="button" onClick={() => onAdicionar(produto)} title="Adicionar">
            <Icon>add</Icon>
          </button>
        </div>
      </div>
    </article>
  );
}
