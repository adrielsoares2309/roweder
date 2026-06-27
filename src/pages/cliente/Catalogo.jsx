import { useMemo, useState } from 'react';
import { Link, useSearchParams } from 'react-router-dom';
import BottomNavCliente from '../../components/BottomNavCliente';
import EmptyState from '../../components/EmptyState';
import HeaderCliente from '../../components/HeaderCliente';
import Icon from '../../components/Icon';
import ProdutoCard from '../../components/ProdutoCard';
import { lojaInicial } from '../../data/loja';
import { produtosIniciais } from '../../data/produtos';
import { adicionarProduto, obterCarrinho } from '../../services/carrinhoService';
import { carregarDados } from '../../services/storage';

export default function Catalogo() {
  const [params] = useSearchParams();
  const [busca, setBusca] = useState('');
  const [categoria, setCategoria] = useState(params.get('categoria') || 'Todos');
  const [carrinho, setCarrinho] = useState(obterCarrinho());
  const loja = carregarDados('roweder_config_loja', lojaInicial);
  const produtos = carregarDados('roweder_produtos', produtosIniciais).filter((produto) => produto.ativo);
  const categorias = ['Todos', ...new Set(produtos.map((produto) => produto.categoria))];
  const promocao = params.get('promocao') === '1';

  const filtrados = useMemo(() => produtos.filter((produto) => {
    const texto = `${produto.nome} ${produto.descricao} ${produto.categoria}`.toLowerCase();
    const bateBusca = texto.includes(busca.toLowerCase());
    const bateCategoria = categoria === 'Todos' || produto.categoria === categoria;
    return bateBusca && bateCategoria && (!promocao || produto.promocao);
  }), [busca, categoria, produtos, promocao]);

  function adicionar(produto) {
    setCarrinho(adicionarProduto(produto));
  }

  const quantidade = carrinho.reduce((total, item) => total + item.quantidade, 0);

  return (
    <div className="client-page">
      <HeaderCliente loja={loja} />
      <main className="client-main">
        <section className="catalog-toolbar">
          <div className="search-box">
            <Icon>search</Icon>
            <input value={busca} onChange={(event) => setBusca(event.target.value)} placeholder="Buscar produtos..." />
          </div>
          <div className="filter-row">
            {categorias.map((item) => (
              <button key={item} type="button" className={categoria === item ? 'active' : ''} onClick={() => setCategoria(item)}>
                {item}
              </button>
            ))}
          </div>
        </section>
        <div className="section-heading">
          <h1>Catálogo</h1>
          <Link className="cart-floating" to="/carrinho"><Icon>shopping_cart</Icon>{quantidade} itens</Link>
        </div>
        {filtrados.length ? (
          <div className="product-grid catalog-grid">
            {filtrados.map((produto) => <ProdutoCard key={produto.id} produto={produto} onAdicionar={adicionar} />)}
          </div>
        ) : (
          <EmptyState title="Nenhum produto encontrado" text="Tente outra busca ou categoria." />
        )}
      </main>
      <BottomNavCliente />
    </div>
  );
}
