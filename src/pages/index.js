import { useEffect, useState } from "react";
import axios from "axios";
import Link from "next/link";
import { useSession, signOut } from "next-auth/react";
import { useCart } from "../context/CartContext";

export default function Home() {
  const { data: session, status } = useSession();
  const [products, setProducts] = useState([]);
  const { addToCart } = useCart();

  useEffect(() => {
    axios
      .get("/api/products")
      .then((res) => setProducts(res.data))
      .catch((err) => console.error(err));
  }, []);

  if (status === "loading") return <p>Loading...</p>;

  return (
    <div style={{ padding: 20 }}>
      <h1>Product list</h1>

      {session ? (
        <>
          <p>Welcome, {session.user.name || session.user.email}!</p>
          <button onClick={() => signOut({ callbackUrl: "/" })}>
            Logout
          </button>{" "}
          |
          <Link href="/products/create" style={{ marginLeft: 10 }}>
            Create new products
          </Link>{" "}
          |
          <Link href="/cart" style={{ marginLeft: 10 }}>
            View Cart
          </Link>{" "}
          |
          <Link href="/orders" style={{ marginLeft: 10 }}>
            Order History
          </Link>
        </>
      ) : (
        <div>
          <p>You are not logged in.</p>
          <Link href="/auth/login">Login</Link>
        </div>
      )}

      <ul style={{ marginTop: 20 }}>
        {products.map((product) => (
          <li key={product._id} style={{ marginBottom: 10 }}>
            <Link href={`/products/${product._id}`}>
              {product.name} - ${product.price}
            </Link>
            <button
              onClick={() => addToCart(product)}
              style={{ marginLeft: 10 }}
            >
              Add to Cart
            </button>
          </li>
        ))}
      </ul>
    </div>
  );
}
