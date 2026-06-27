import { useState } from 'react';
import AdminLayout from '../../components/AdminLayout';
import { lojaInicial } from '../../data/loja';
import { carregarDados, removerDados, salvarDados } from '../../services/storage';

export default function Configuracoes() {
  const [loja, setLoja] = useState(carregarDados('roweder_config_loja', lojaInicial));
  const [salvo, setSalvo] = useState(false);
  const [limpo, setLimpo] = useState(false);

  function atualizar(campo, valor) {
    setLoja((atual) => ({ ...atual, [campo]: campo === 'taxaEntrega' ? Number(valor) : valor }));
  }

  function salvar(event) {
    event.preventDefault();
    salvarDados('roweder_config_loja', loja);
    setSalvo(true);
    setTimeout(() => setSalvo(false), 2000);
  }

  function limparDadosLocais() {
    const confirmou = window.confirm('Limpar pedidos, carrinho e último pedido salvos neste navegador?');
    if (!confirmou) return;

    removerDados('roweder_pedidos');
    removerDados('roweder_carrinho');
    removerDados('roweder_ultimo_pedido');
    setLimpo(true);
    setTimeout(() => setLimpo(false), 2500);
  }

  return (
    <AdminLayout title="Configurações" subtitle="Dados da loja usados nas telas do cliente e no carrinho.">
      <form className="form-card settings-form" onSubmit={salvar}>
        {salvo && <p className="form-success">Configurações salvas.</p>}
        {limpo && <p className="form-success">Dados locais do MVP limpos.</p>}
        <div className="form-grid">
          <label>Nome da loja<input value={loja.nome} onChange={(e) => atualizar('nome', e.target.value)} /></label>
          <label>Slogan<input value={loja.slogan} onChange={(e) => atualizar('slogan', e.target.value)} /></label>
          <label>Telefone<input value={loja.telefone} onChange={(e) => atualizar('telefone', e.target.value)} /></label>
          <label>WhatsApp<input value={loja.whatsapp} onChange={(e) => atualizar('whatsapp', e.target.value)} /></label>
          <label>Endereço<input value={loja.endereco} onChange={(e) => atualizar('endereco', e.target.value)} /></label>
          <label>Horário de funcionamento<input value={loja.horario} onChange={(e) => atualizar('horario', e.target.value)} /></label>
          <label>Taxa de entrega<input type="number" step="0.01" value={loja.taxaEntrega} onChange={(e) => atualizar('taxaEntrega', e.target.value)} /></label>
          <label>Tempo médio<input value={loja.tempoMedio} onChange={(e) => atualizar('tempoMedio', e.target.value)} /></label>
          <label>Status da loja
            <select value={loja.status} onChange={(e) => atualizar('status', e.target.value)}>
              <option>Aberta</option>
              <option>Fechada</option>
            </select>
          </label>
        </div>
        <button className="button primary large" type="submit">Salvar configurações</button>
        <button className="button subtle" type="button" onClick={limparDadosLocais}>Limpar dados locais do MVP</button>
      </form>
    </AdminLayout>
  );
}
