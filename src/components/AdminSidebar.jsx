import { NavLink } from 'react-router-dom';
import Icon from './Icon';
import Logo from './Logo';

export default function AdminSidebar() {
  const links = [
    ['Dashboard', '/admin', 'dashboard'],
    ['Pedidos', '/admin/pedidos', 'receipt_long'],
    ['Produtos', '/admin/produtos', 'inventory_2'],
    ['Configurações', '/admin/configuracoes', 'settings'],
  ];

  return (
    <nav className="admin-sidebar">
      <div className="admin-brand">
        <Logo alt="Roweder" />
        <div>
          <strong>Painel admin</strong>
          <span>Roweder Disk Gás</span>
        </div>
      </div>
      {links.map(([label, to, icon]) => (
        <NavLink key={to} to={to} end={to === '/admin'}>
          <Icon>{icon}</Icon>
          <span>{label}</span>
        </NavLink>
      ))}
    </nav>
  );
}
