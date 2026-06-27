import { pedidosIniciais } from '../data/pedidos';
import { gerarIdPedido } from '../utils/gerarIdPedido';
import { calcularSubtotal } from './carrinhoService';
import { carregarDados, salvarDados } from './storage';

const CHAVE_PEDIDOS = 'roweder_pedidos';
const CHAVE_ULTIMO = 'roweder_ultimo_pedido';

export const STATUS_PEDIDOS = [
  'Novo pedido',
  'Aceito',
  'Em separação',
  'Saiu para entrega',
  'Entregue',
  'Cancelado',
];

export function listarPedidos() {
  return carregarDados(CHAVE_PEDIDOS, pedidosIniciais).map((pedido) => ({
    ...pedido,
    status: pedido.status === 'Em separacao' ? 'Em separação' : pedido.status,
  }));
}

export function criarPedido(dadosCliente, carrinho, loja) {
  const subtotal = calcularSubtotal(carrinho);
  const taxaEntrega = Number(loja.taxaEntrega || 0);
  const pedido = {
    id: gerarIdPedido(),
    criadoEm: new Date().toISOString(),
    cliente: dadosCliente,
    itens: carrinho,
    subtotal,
    taxaEntrega,
    total: subtotal + taxaEntrega,
    status: 'Novo pedido',
  };

  const pedidos = [pedido, ...listarPedidos()];
  salvarDados(CHAVE_PEDIDOS, pedidos);
  salvarDados(CHAVE_ULTIMO, pedido);
  return pedido;
}

export function atualizarStatusPedido(id, novoStatus) {
  const pedidos = listarPedidos().map((pedido) => (
    pedido.id === id ? { ...pedido, status: novoStatus } : pedido
  ));
  salvarDados(CHAVE_PEDIDOS, pedidos);
  return pedidos;
}

export function obterUltimoPedido() {
  return carregarDados(CHAVE_ULTIMO, null);
}

export function calcularDashboard(pedidos, produtos) {
  const hoje = new Date().toDateString();
  const pedidosHoje = pedidos.filter((pedido) => new Date(pedido.criadoEm).toDateString() === hoje);
  const faturamento = pedidosHoje.reduce((total, pedido) => total + Number(pedido.total || 0), 0);
  const pendentes = pedidos.filter((pedido) => !['Entregue', 'Cancelado'].includes(pedido.status)).length;
  const produtosAtivos = produtos.filter((produto) => produto.ativo).length;

  return {
    pedidosHoje: pedidosHoje.length,
    faturamento,
    pendentes,
    produtosAtivos,
    ticketMedio: pedidosHoje.length ? faturamento / pedidosHoje.length : 0,
  };
}
