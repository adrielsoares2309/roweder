export function salvarDados(chave, dados) {
  localStorage.setItem(chave, JSON.stringify(dados));
}

export function carregarDados(chave, padrao) {
  const salvo = localStorage.getItem(chave);
  if (!salvo) return padrao;

  try {
    return JSON.parse(salvo);
  } catch {
    return padrao;
  }
}

export function removerDados(chave) {
  localStorage.removeItem(chave);
}
