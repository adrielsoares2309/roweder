import { Link, useNavigate } from 'react-router-dom';
import BottomNavCliente from '../../components/BottomNavCliente';
import HeaderCliente from '../../components/HeaderCliente';
import Icon from '../../components/Icon';
import ProdutoCard from '../../components/ProdutoCard';
import { lojaInicial } from '../../data/loja';
import { produtosIniciais } from '../../data/produtos';
import { adicionarProduto } from '../../services/carrinhoService';
import { carregarDados } from '../../services/storage';
import { formatarMoeda } from '../../utils/formatarMoeda';

export default function Home() {
  const navigate = useNavigate();
  const loja = carregarDados('roweder_config_loja', lojaInicial);
  const produtos = carregarDados('roweder_produtos', produtosIniciais).filter((produto) => produto.ativo);
  const destaques = produtos.filter((produto) => produto.destaque).slice(0, 4);
  const categorias = [...new Set(produtos.map((produto) => produto.categoria))];

  function adicionar(produto) {
    adicionarProduto(produto);
    navigate('/carrinho');
  }

  return (
    <div className="client-page">
      <HeaderCliente loja={loja} />
      <main className="client-main">
        <section className="hero">
          <div className="hero-copy">
            <span className="eyebrow">{loja.status === 'Aberta' ? 'Aberto agora' : 'Loja fechada'}</span>
            <h1>{loja.slogan}</h1>
            <div className="hero-meta">
              <span><Icon>schedule</Icon>{loja.tempoMedio}</span>
              <span><Icon>payments</Icon>{formatarMoeda(loja.taxaEntrega)}</span>
              <span><Icon>storefront</Icon>{loja.horario}</span>
            </div>
            <Link className="button primary large" to="/catalogo">
              Fazer pedido agora <Icon>arrow_forward</Icon>
            </Link>
          </div>
          <div className="hero-panel">
            <img src="/images/logo.png" alt="Roweder Disk Gás" />
            <strong>{loja.nome}</strong>
            <span>Gás, bebidas, gelo e conveniência em poucos minutos.</span>
          </div>
        </section>

        <section className="section-block">
          <div className="section-heading">
            <h2>Categorias</h2>
            <Link to="/catalogo">Ver catálogo</Link>
          </div>
          <div className="category-strip">
            {categorias.map((categoria) => (
              <Link key={categoria} to={`/catalogo?categoria=${encodeURIComponent(categoria)}`} className="category-chip">
                <Icon>{categoria === 'Gás' ? 'local_fire_department' : categoria === 'Gelo' ? 'ac_unit' : categoria === 'Bebidas' ? 'liquor' : 'category'}</Icon>
                <span>{categoria}</span>
              </Link>
            ))}
            <Link to="/catalogo?promocao=1" className="category-chip promo">
              <Icon>local_offer</Icon>
              <span>Promoções</span>
            </Link>
          </div>
        </section>

        <section className="section-block">
          <div className="section-heading">
            <h2>Produtos em destaque</h2>
            <Link to="/catalogo">Ver todos</Link>
          </div>
          <div className="product-grid">
            {destaques.map((produto) => <ProdutoCard key={produto.id} produto={produto} onAdicionar={adicionar} />)}
          </div>
        </section>
      </main>
      <footer className="site-footer">
        <strong>{loja.nome}</strong>
        <span>{loja.endereco}</span>
        <span>{loja.telefone}</span>
      </footer>
      <BottomNavCliente />
    </div>
  );
}
