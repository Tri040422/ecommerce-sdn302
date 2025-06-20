import { useCart } from "../../context/CartContext";
import axios from "axios";
import { useRouter } from "next/router";

export default function CheckoutPage() {
  const { cartItems, clearCart } = useCart();
  const router = useRouter();

  const handlePlaceOrder = async () => {
    const products = cartItems.map((item) => ({
      product: item._id,
      quantity: item.quantity,
    }));
    const totalAmount = cartItems.reduce(
      (sum, item) => sum + item.price * item.quantity,
      0
    );

    try {
      await axios.post("/api/orders", { products, totalAmount });
      clearCart();
      alert("Order placed!");
      router.push("/orders/history");
    } catch (err) {
      console.log(err);
      alert("Error placing order");
    }
  };

  return (
    <div style={{ padding: 20 }}>
      <h1>Checkout</h1>
      <button onClick={handlePlaceOrder}>Confirm & Place Order</button>
    </div>
  );
}
