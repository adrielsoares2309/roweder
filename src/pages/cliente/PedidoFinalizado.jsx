import { Link } from 'react-router-dom';
import BottomNavCliente from '../../components/BottomNavCliente';
import HeaderCliente from '../../components/HeaderCliente';
import Icon from '../../components/Icon';
import StatusPedido from '../../components/StatusPedido';
import { lojaInicial } from '../../data/loja';
import { obterUltimoPedido } from '../../services/pedidoService';
import { carregarDados } from '../../services/storage';
import { gerarLinkWhatsApp, gerarMensagemPedido } from '../../services/whatsappService';
import { formatarMoeda } from '../../utils/formatarMoeda';

export default function PedidoFinalizado() {
  const loja = carregarDados('roweder_config_loja', lojaInicial);
  const pedido = obterUltimoPedido();

  if (!pedido) {
    return (
      <div className="client-page">
        <HeaderCliente loja={loja} />
        <main className="client-main success-page">
          <h1>Nenhum pedido encontrado</h1>
          <Link className="button primary" to="/home">Voltar ao início</Link>
        </main>
        <BottomNavCliente />
      </div>
    );
  }

  const linkWhatsApp = gerarLinkWhatsApp(loja.whatsapp, gerarMensagemPedido(pedido));

  return (
    <div className="client-page">
      <HeaderCliente loja={loja} />
      <main className="client-main success-page">
        <section className="success-card">
          <div className="success-icon"><Icon>check_circle</Icon></div>
          <p>Pedido recebido</p>
          <h1>#{pedido.id}</h1>
          <StatusPedido status={pedido.status} />
          <p>Tempo estimado: <strong>{loja.tempoMedio}</strong></p>
          <p>Total: <strong>{formatarMoeda(pedido.total)}</strong></p>
          <div className="success-actions">
            <a className="button primary" href={linkWhatsApp} target="_blank" rel="noreferrer">Enviar pedido pelo WhatsApp</a>
            <Link className="button secondary" to="/home">Voltar ao início</Link>
          </div>
        </section>
      </main>
      <BottomNavCliente />
    </div>
  );
}
