import { useState } from 'react';
import AdminLayout from '../../components/AdminLayout';
import EmptyState from '../../components/EmptyState';
import PedidoCard from '../../components/PedidoCard';
import { atualizarStatusPedido, listarPedidos } from '../../services/pedidoService';

export default function Pedidos() {
  const [pedidos, setPedidos] = useState(listarPedidos());

  function mudarStatus(id, status) {
    setPedidos(atualizarStatusPedido(id, status));
  }

  return (
    <AdminLayout title="Pedidos" subtitle="Gerencie os pedidos e atualize o status da entrega.">
      <section className="orders-list">
        {pedidos.length ? (
          pedidos.map((pedido) => <PedidoCard key={pedido.id} pedido={pedido} onStatus={mudarStatus} />)
        ) : (
          <EmptyState title="Nenhum pedido recebido ainda." text="Quando um cliente finalizar um pedido, ele aparecerá aqui." />
        )}
      </section>
    </AdminLayout>
  );
}
