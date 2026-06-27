import { formatarMoeda } from '../utils/formatarMoeda';

export function gerarMensagemPedido(pedido) {
  const endereco = `${pedido.cliente.rua}, ${pedido.cliente.numero} - ${pedido.cliente.bairro}`;
  const itens = pedido.itens
    .map((item) => `- ${item.quantidade}x ${item.nome} (${formatarMoeda(item.preco * item.quantidade)})`)
    .join('\n');

  return `Novo pedido ${pedido.id}\n\nCliente: ${pedido.cliente.nome}\nTelefone: ${pedido.cliente.telefone}\nEndereço: ${endereco}\nPagamento: ${pedido.cliente.pagamento}\n\nItens:\n${itens}\n\nSubtotal: ${formatarMoeda(pedido.subtotal)}\nEntrega: ${formatarMoeda(pedido.taxaEntrega)}\nTotal: ${formatarMoeda(pedido.total)}\n\nObservação: ${pedido.cliente.observacao || 'Sem observações'}`;
}

export function gerarLinkWhatsApp(numero, mensagem) {
  return `https://wa.me/${numero}?text=${encodeURIComponent(mensagem)}`;
}
