import { useState } from 'react';
import AdminLayout from '../../components/AdminLayout';
import { produtosIniciais } from '../../data/produtos';
import { carregarDados, salvarDados } from '../../services/storage';
import { formatarMoeda } from '../../utils/formatarMoeda';
import { publicAssetUrl } from '../../utils/publicAssetUrl';

const vazio = {
  nome: '',
  categoria: '',
  descricao: '',
  preco: '',
  imagem: '/images/produtos/novo-produto.png',
  ativo: true,
  promocao: false,
  destaque: false,
};

export default function Produtos() {
  const [produtos, setProdutos] = useState(carregarDados('roweder_produtos', produtosIniciais));
  const [novo, setNovo] = useState(vazio);

  function persistir(lista) {
    setProdutos(lista);
    salvarDados('roweder_produtos', lista);
  }

  function editar(id, campo, valor) {
    persistir(produtos.map((produto) => produto.id === id ? { ...produto, [campo]: campo === 'preco' ? Number(valor) : valor } : produto));
  }

  function alternar(id, campo) {
    persistir(produtos.map((produto) => produto.id === id ? { ...produto, [campo]: !produto[campo] } : produto));
  }

  function remover(id) {
    persistir(produtos.filter((produto) => produto.id !== id));
  }

  function adicionar(event) {
    event.preventDefault();
    if (!novo.nome || !novo.categoria || !novo.preco) return;
    persistir([{ ...novo, id: `produto-${Date.now()}`, preco: Number(novo.preco) }, ...produtos]);
    setNovo(vazio);
  }

  return (
    <AdminLayout title="Produtos" subtitle="Edite catálogo, preços, imagens e exibição no cliente.">
      <form className="panel-card product-create" onSubmit={adicionar}>
        <h2>Novo produto</h2>
        <input placeholder="Nome" value={novo.nome} onChange={(e) => setNovo({ ...novo, nome: e.target.value })} />
        <input placeholder="Categoria" value={novo.categoria} onChange={(e) => setNovo({ ...novo, categoria: e.target.value })} />
        <input placeholder="Descrição" value={novo.descricao} onChange={(e) => setNovo({ ...novo, descricao: e.target.value })} />
        <input placeholder="Preço" type="number" step="0.01" value={novo.preco} onChange={(e) => setNovo({ ...novo, preco: e.target.value })} />
        <input placeholder="Caminho da imagem" value={novo.imagem} onChange={(e) => setNovo({ ...novo, imagem: e.target.value })} />
        <button className="button primary" type="submit">Adicionar</button>
      </form>

      <section className="products-admin-list">
        {produtos.map((produto) => (
          <article className="product-admin-card" key={produto.id}>
            <div className="admin-product-media">
              <img src={publicAssetUrl(produto.imagem)} alt={produto.nome} onError={(event) => { event.currentTarget.style.display = 'none'; }} />
              <span>{produto.nome.slice(0, 2).toUpperCase()}</span>
            </div>
            <div className="admin-product-fields">
              <input value={produto.nome} onChange={(e) => editar(produto.id, 'nome', e.target.value)} />
              <input value={produto.categoria} onChange={(e) => editar(produto.id, 'categoria', e.target.value)} />
              <textarea value={produto.descricao} onChange={(e) => editar(produto.id, 'descricao', e.target.value)} />
              <input type="number" step="0.01" value={produto.preco} onChange={(e) => editar(produto.id, 'preco', e.target.value)} />
              <input value={produto.imagem} onChange={(e) => editar(produto.id, 'imagem', e.target.value)} />
            </div>
            <div className="admin-product-actions">
              <strong>{formatarMoeda(produto.preco)}</strong>
              <label><input type="checkbox" checked={produto.ativo} onChange={() => alternar(produto.id, 'ativo')} /> Ativo</label>
              <label><input type="checkbox" checked={produto.promocao} onChange={() => alternar(produto.id, 'promocao')} /> Marcar como promoção</label>
              <label><input type="checkbox" checked={produto.destaque} onChange={() => alternar(produto.id, 'destaque')} /> Destaque</label>
              <button className="ghost-danger" type="button" onClick={() => remover(produto.id)}>Remover</button>
            </div>
          </article>
        ))}
      </section>
    </AdminLayout>
  );
}
