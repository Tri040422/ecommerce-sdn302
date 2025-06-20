import { useRouter } from "next/router";
import { useEffect, useState } from "react";
import axios from "axios";
import Link from "next/link";
import { useCart } from "../../context/CartContext";

export default function ProductDetail() {
  const router = useRouter();
  const { id } = router.query;
  const [product, setProduct] = useState(null);
  const { addToCart } = useCart();

  useEffect(() => {
    if (!id) return;
    axios
      .get(`/api/products/${id}`)
      .then((res) => setProduct(res.data))
      .catch((err) => console.error(err));
  }, [id]);

  const handleDelete = async () => {
    if (!confirm("Are you sure you want to delete this product?")) return;
    try {
      await axios.delete(`/api/products/${id}`);
      alert("Deleted successfully");
      router.push("/");
    } catch {
      alert("Error deleting product");
    }
  };

  if (!product) return <p>Loading...</p>;

  return (
    <div style={{ padding: 20 }}>
      <h1>{product.name}</h1>
      <p>{product.description}</p>
      <p>Price: ${product.price}</p>
      {product.image ? (
        /* eslint-disable @next/next/no-img-element */
        <img
          src={product.image}
          alt={product.name}
          style={{ width: 300, height: 300, objectFit: "cover" }}
        />
      ) : (
        <p>No image available</p>
      )}

      <div style={{ marginTop: 20 }}>
        <button onClick={() => addToCart(product)} style={{ marginTop: 10 }}>
          Add to Cart
        </button>
        <Link href={`/products/edit/${id}`} style={{ marginRight: 10 }}>
          Edit
        </Link>
        <button onClick={handleDelete}>Delete</button>
      </div>
      <br />
      <Link href="/">Return to home page</Link>
    </div>
  );
}
