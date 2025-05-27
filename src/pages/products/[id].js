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
    if (!confirm("Bạn có chắc muốn xóa sản phẩm này?")) return;
    try {
      await axios.delete(`/api/products/${id}`);
      alert("Xóa thành công");
      router.push("/");
    } catch {
      alert("Lỗi khi xóa sản phẩm");
    }
  };

  if (!product) return <p>Loading...</p>;

  return (
    <div style={{ padding: 20 }}>
      <h1>{product.name}</h1>
      <p>{product.description}</p>
      <p>Giá: ${product.price}</p>
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
          Chỉnh sửa
        </Link>
        <button onClick={handleDelete}>Xóa</button>
      </div>
      <br />
      <Link href="/">Quay về trang chủ</Link>
    </div>
  );
}
