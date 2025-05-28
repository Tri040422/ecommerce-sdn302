import { useRouter } from "next/router";
import { useEffect, useState } from "react";
import axios from "axios";
import Link from "next/link";
import Image from "next/image";

export default function ProductDetail() {
  const router = useRouter();
  const { id } = router.query;
  const [product, setProduct] = useState(null);

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
      {product.image && (
        <Image
          src={product.image}
          alt={product.name}
          width={300}
          height={300}
        />
      )}
      <div style={{ marginTop: 20 }}>
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
