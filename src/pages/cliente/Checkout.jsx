import { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import BottomNavCliente from '../../components/BottomNavCliente';
import CarrinhoResumo from '../../components/CarrinhoResumo';
import HeaderCliente from '../../components/HeaderCliente';
import { lojaInicial } from '../../data/loja';
import { limparCarrinho, obterCarrinho } from '../../services/carrinhoService';
import { criarPedido } from '../../services/pedidoService';
import { carregarDados } from '../../services/storage';

const inicial = {
  nome: '',
  telefone: '',
  rua: '',
  numero: '',
  bairro: '',
  complemento: '',
  referencia: '',
  pagamento: 'Pix',
  troco: '',
  observacao: '',
};

export default function Checkout() {
  const navigate = useNavigate();
  const loja = carregarDados('roweder_config_loja', lojaInicial);
  const carrinho = obterCarrinho();
  const [form, setForm] = useState(inicial);
  const [erro, setErro] = useState('');

  function atualizar(campo, valor) {
    setForm((atual) => ({ ...atual, [campo]: valor }));
  }

  function finalizar(event) {
    event.preventDefault();
    const obrigatorios = ['nome', 'telefone', 'rua', 'numero', 'bairro'];
    const faltando = obrigatorios.some((campo) => !form[campo].trim());

    if (!carrinho.length) {
      setErro('Seu carrinho está vazio.');
      return;
    }
    if (faltando) {
      setErro('Preencha nome, telefone e endereço completo.');
      return;
    }

    criarPedido(form, carrinho, loja);
    limparCarrinho();
    navigate('/pedido-finalizado');
  }

  return (
    <div className="client-page">
      <HeaderCliente loja={loja} />
      <main className="client-main checkout-layout">
        <form className="form-card" onSubmit={finalizar}>
          <div className="section-heading">
            <h1>Finalização do pedido</h1>
          </div>
          {erro && <p className="form-error">{erro}</p>}
          <div className="form-grid">
            <label>Nome<input value={form.nome} onChange={(e) => atualizar('nome', e.target.value)} /></label>
            <label>Telefone<input value={form.telefone} onChange={(e) => atualizar('telefone', e.target.value)} /></label>
            <label>Rua<input value={form.rua} onChange={(e) => atualizar('rua', e.target.value)} /></label>
            <label>Número<input value={form.numero} onChange={(e) => atualizar('numero', e.target.value)} /></label>
            <label>Bairro<input value={form.bairro} onChange={(e) => atualizar('bairro', e.target.value)} /></label>
            <label>Complemento<input value={form.complemento} onChange={(e) => atualizar('complemento', e.target.value)} /></label>
            <label>Referência<input value={form.referencia} onChange={(e) => atualizar('referencia', e.target.value)} /></label>
            <label>Forma de pagamento
              <select value={form.pagamento} onChange={(e) => atualizar('pagamento', e.target.value)}>
                <option>Pix</option>
                <option>Dinheiro</option>
                <option>Cartão na entrega</option>
              </select>
            </label>
            {form.pagamento === 'Dinheiro' && (
              <label>Troco para quanto?<input value={form.troco} onChange={(e) => atualizar('troco', e.target.value)} /></label>
            )}
            <label className="full-field">Observação<textarea value={form.observacao} onChange={(e) => atualizar('observacao', e.target.value)} /></label>
          </div>
          <button className="button primary large" type="submit">Finalizar pedido</button>
        </form>
        <CarrinhoResumo carrinho={carrinho} taxaEntrega={loja.taxaEntrega} />
      </main>
      <BottomNavCliente />
    </div>
  );
}
