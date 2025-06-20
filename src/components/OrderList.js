export default function OrderList({ orders }) {
  return (
    <ul>
      {orders.map((order) => (
        <li key={order._id} style={{ marginBottom: 20 }}>
          <p>Order ID: {order._id}</p>
          <p>Status: {order.status}</p>
          <p>Total: ${order.totalAmount.toFixed(2)}</p>
          <ul>
            {order.products.map((item, idx) => (
              <li key={idx}>
                {item.product?.name} x {item.quantity}
              </li>
            ))}
          </ul>
        </li>
      ))}
    </ul>
  );
}
