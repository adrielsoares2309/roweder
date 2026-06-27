import { NavLink } from 'react-router-dom';
import { obterCarrinho } from '../services/carrinhoService';
import Icon from './Icon';

export default function BottomNavCliente() {
  const quantidade = obterCarrinho().reduce((total, item) => total + item.quantidade, 0);

  return (
    <nav className="bottom-nav">
      <NavLink to="/home">
        <Icon>home</Icon>
        <span>Home</span>
      </NavLink>
      <NavLink to="/catalogo">
        <Icon>menu_book</Icon>
        <span>Catálogo</span>
      </NavLink>
      <NavLink to="/carrinho">
        <span className="nav-cart">
          <Icon>shopping_cart</Icon>
          {quantidade > 0 && <strong>{quantidade}</strong>}
        </span>
        <span>Carrinho</span>
      </NavLink>
    </nav>
  );
}
