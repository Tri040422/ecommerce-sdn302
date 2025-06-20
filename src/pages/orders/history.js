import { useEffect, useState } from "react";
import axios from "axios";
import OrderList from "../../components/OrderList";

export default function OrderHistoryPage() {
  const [orders, setOrders] = useState([]);

  useEffect(() => {
    axios.get("/api/orders").then((res) => setOrders(res.data));
  }, []);

  return (
    <div style={{ padding: 20 }}>
      <h1>Order History</h1>
      <OrderList orders={orders} />
    </div>
  );
}
