import axios from "axios";
import { useEffect, useState } from "react";
import Link from "next/link";

export default function OrdersPage() {
  const [orders, setOrders] = useState([]);

  useEffect(() => {
    axios
      .get("/api/orders")
      .then((res) => setOrders(res.data))
      .catch((err) => console.error(err));
  }, []);

  return (
    <div style={{ padding: 20 }}>
      <h1>Order History</h1>
      {orders.length === 0 ? (
        <p>No orders yet.</p>
      ) : (
        <ul>
          {orders.map((order) => (
            <li key={order._id}>
              Total: ${order.totalAmount} - Status: {order.status}
            </li>
          ))}
        </ul>
      )}
      <br />
      <Link href="/">Back to Home</Link>
    </div>
  );
}
