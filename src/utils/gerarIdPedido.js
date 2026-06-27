export function gerarIdPedido() {
  const sufixo = Date.now().toString().slice(-5);
  return `RW${sufixo}`;
}
