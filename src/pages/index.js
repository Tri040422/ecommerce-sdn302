import { useEffect, useState } from "react";
import axios from "axios";
import Link from "next/link";
import { useSession, signOut } from "next-auth/react";

export default function Home() {
  const { data: session, status } = useSession();
  const [products, setProducts] = useState([]);

  useEffect(() => {
    axios
      .get("/api/products")
      .then((res) => setProducts(res.data))
      .catch((err) => console.error(err));
  }, []);

  if (status === "loading") {
    return <p>Loading...</p>;
  }

  return (
    <div style={{ padding: 20 }}>
      <h1>Product list</h1>

      {session ? (
        <>
          <p>Welcome, {session.user.name}!</p>
          <button onClick={() => signOut({ callbackUrl: "/" })}>Logout</button>

          <Link
            href="/products/create"
            style={{ display: "inline-block", marginBottom: 20 }}
          >
            Create new products
          </Link>
        </>
      ) : (
        <div>
          <p>You are not logged in.</p>
          <Link href="/auth/login">Login</Link>
        </div>
      )}

      <ul>
        {products.map((product) => (
          <li key={product._id} style={{ marginBottom: 10 }}>
            <Link href={`/products/${product._id}`}>
              {product.name} - ${product.price}
            </Link>
          </li>
        ))}
      </ul>
    </div>
  );
}
