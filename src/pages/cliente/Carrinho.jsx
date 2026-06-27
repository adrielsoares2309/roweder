import { useState } from 'react';
import { Link } from 'react-router-dom';
import BottomNavCliente from '../../components/BottomNavCliente';
import CarrinhoResumo from '../../components/CarrinhoResumo';
import EmptyState from '../../components/EmptyState';
import HeaderCliente from '../../components/HeaderCliente';
import Icon from '../../components/Icon';
import { lojaInicial } from '../../data/loja';
import { aumentarQuantidade, diminuirQuantidade, obterCarrinho, removerProduto } from '../../services/carrinhoService';
import { carregarDados } from '../../services/storage';
import { formatarMoeda } from '../../utils/formatarMoeda';

export default function Carrinho() {
  const loja = carregarDados('roweder_config_loja', lojaInicial);
  const [carrinho, setCarrinho] = useState(obterCarrinho());

  return (
    <div className="client-page">
      <HeaderCliente loja={loja} />
      <main className="client-main cart-layout">
        <section>
          <div className="section-heading">
            <h1>Carrinho</h1>
            <Link to="/catalogo">Continuar comprando</Link>
          </div>
          {carrinho.length ? (
            <div className="cart-list">
              {carrinho.map((item) => (
                <article className="cart-item" key={item.id}>
                  <div className="cart-thumb">
                    <img src={item.imagem} alt={item.nome} onError={(event) => { event.currentTarget.style.display = 'none'; }} />
                    <span>{item.nome.slice(0, 2).toUpperCase()}</span>
                  </div>
                  <div>
                    <h3>{item.nome}</h3>
                    <p>{formatarMoeda(item.preco)}</p>
                  </div>
                  <div className="quantity-control">
                    <button onClick={() => setCarrinho(diminuirQuantidade(item.id))}><Icon>remove</Icon></button>
                    <strong>{item.quantidade}</strong>
                    <button onClick={() => setCarrinho(aumentarQuantidade(item.id))}><Icon>add</Icon></button>
                  </div>
                  <button className="ghost-danger" onClick={() => setCarrinho(removerProduto(item.id))}>Remover</button>
                </article>
              ))}
            </div>
          ) : (
            <EmptyState
              title="Seu carrinho está vazio"
              text="Escolha seus produtos no catálogo para finalizar o pedido."
              action={<Link className="button primary" to="/catalogo">Ir para o catálogo</Link>}
            />
          )}
        </section>
        {carrinho.length > 0 && (
          <CarrinhoResumo
            carrinho={carrinho}
            taxaEntrega={loja.taxaEntrega}
            action={<Link className="button primary full" to="/checkout">Finalizar pedido</Link>}
          />
        )}
      </main>
      <BottomNavCliente />
    </div>
  );
}
