import { carregarDados, salvarDados, removerDados } from './storage';

const CHAVE = 'roweder_carrinho';

export function obterCarrinho() {
  return carregarDados(CHAVE, []);
}

export function salvarCarrinho(carrinho) {
  salvarDados(CHAVE, carrinho);
}

export function adicionarProduto(produto) {
  const carrinho = obterCarrinho();
  const existente = carrinho.find((item) => item.id === produto.id);
  const proximoCarrinho = existente
    ? carrinho.map((item) => item.id === produto.id ? { ...item, quantidade: item.quantidade + 1 } : item)
    : [...carrinho, { id: produto.id, nome: produto.nome, preco: produto.preco, imagem: produto.imagem, quantidade: 1 }];

  salvarCarrinho(proximoCarrinho);
  return proximoCarrinho;
}

export function removerProduto(id) {
  const proximoCarrinho = obterCarrinho().filter((item) => item.id !== id);
  salvarCarrinho(proximoCarrinho);
  return proximoCarrinho;
}

export function aumentarQuantidade(id) {
  const proximoCarrinho = obterCarrinho().map((item) => item.id === id ? { ...item, quantidade: item.quantidade + 1 } : item);
  salvarCarrinho(proximoCarrinho);
  return proximoCarrinho;
}

export function diminuirQuantidade(id) {
  const proximoCarrinho = obterCarrinho()
    .map((item) => item.id === id ? { ...item, quantidade: item.quantidade - 1 } : item)
    .filter((item) => item.quantidade > 0);
  salvarCarrinho(proximoCarrinho);
  return proximoCarrinho;
}

export function limparCarrinho() {
  removerDados(CHAVE);
}

export function calcularSubtotal(carrinho) {
  return carrinho.reduce((total, item) => total + item.preco * item.quantidade, 0);
}

export function calcularTotal(carrinho, taxaEntrega) {
  return calcularSubtotal(carrinho) + Number(taxaEntrega || 0);
}
