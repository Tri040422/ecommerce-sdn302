import { useCart } from "../context/CartContext";
import Link from "next/link";
import axios from "axios";
import { useRouter } from "next/router";

export default function CartPage() {
  const { cartItems, removeFromCart, clearCart } = useCart();
  console.log("🛒 cartItems:", cartItems);
  const router = useRouter();

  const total = cartItems.reduce(
    (sum, item) => sum + item.price * item.quantity,
    0
  );

  const handlePlaceOrder = async () => {
    try {
      await axios.post("/api/orders", {
        products: cartItems,
        totalAmount: total,
      });
      alert("Order placed!");
      clearCart();
      router.push("/orders");
    } catch (err) {
      console.log(err);
      alert("Error placing order");
    }
  };

  return (
    <div style={{ padding: 20 }}>
      <h1>Your Cart</h1>
      {cartItems.length === 0 ? (
        <p>Your cart is empty.</p>
      ) : (
        <>
          <ul>
            {cartItems.map((item) => (
              <li key={item._id}>
                {item.name} - ${item.price} x {item.quantity}
                <button onClick={() => removeFromCart(item._id)}>Remove</button>
              </li>
            ))}
          </ul>
          <p>Total: ${total}</p>
          <button onClick={handlePlaceOrder}>Place Order</button>
        </>
      )}
      <br />
      <Link href="/">Back to Products</Link>
    </div>
  );
}
