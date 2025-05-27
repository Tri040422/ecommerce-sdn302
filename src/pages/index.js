import { useEffect, useState } from "react";
import axios from "axios";
import Link from "next/link";

export default function Home() {
  const [products, setProducts] = useState([]);

  useEffect(() => {
    axios
      .get("/api/products")
      .then((res) => setProducts(res.data))
      .catch((err) => console.error(err));
  }, []);

  return (
    <div style={{ padding: 20 }}>
      <h1>Danh sách sản phẩm</h1>
      <Link
        href="/products/create"
        style={{ display: "inline-block", marginBottom: 20 }}
      >
        Tạo sản phẩm mới
      </Link>
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
