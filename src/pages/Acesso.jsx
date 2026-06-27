import { Link } from 'react-router-dom';
import Icon from '../components/Icon';

export default function Acesso() {
  return (
    <main className="access-page">
      <section className="access-card">
        <img src={`${import.meta.env.BASE_URL}images/logo.png`} alt="Roweder Disk Gás" />
        <span className="access-eyebrow">MVP demonstrativo para pedidos online</span>
        <h1>Roweder Disk Gás</h1>
        <p>Escolha como deseja acessar o sistema.</p>
        <div className="access-actions">
          <Link className="button primary large" to="/home">
            Entrar como cliente <Icon>arrow_forward</Icon>
          </Link>
          <Link className="button secondary large" to="/admin">
            Entrar como admin <Icon>dashboard</Icon>
          </Link>
        </div>
      </section>
    </main>
  );
}
