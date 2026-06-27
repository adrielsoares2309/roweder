import { Link, NavLink } from 'react-router-dom';
import { obterCarrinho } from '../services/carrinhoService';
import Icon from './Icon';
import Logo from './Logo';

export default function HeaderCliente({ loja }) {
  const quantidade = obterCarrinho().reduce((total, item) => total + item.quantidade, 0);

  return (
    <header className="cliente-header">
      <Link className="brand" to="/home">
        <Logo className="header-logo" alt="Roweder" />
        <span>{loja?.nome || 'Roweder Disk Gás'}</span>
      </Link>
      <nav className="desktop-nav">
        <NavLink to="/home">Home</NavLink>
        <NavLink to="/catalogo">Catálogo</NavLink>
        <NavLink to="/carrinho" className="cart-link">
          <Icon>shopping_cart</Icon>
          {quantidade > 0 && <strong>{quantidade}</strong>}
        </NavLink>
      </nav>
    </header>
  );
}
