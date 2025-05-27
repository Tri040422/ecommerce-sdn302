import { useState } from "react";
import axios from "axios";
import { useRouter } from "next/router";
import Link from "next/link";

export default function CreateProduct() {
  const [form, setForm] = useState({
    name: "",
    description: "",
    price: "",
    image: "",
  });

  const router = useRouter();

  const handleChange = (e) => {
    setForm({ ...form, [e.target.name]: e.target.value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      await axios.post("/api/products", {
        ...form,
        price: parseFloat(form.price),
      });
      alert("Tạo sản phẩm thành công");
      router.push("/");
    } catch {
      alert("Lỗi tạo sản phẩm");
    }
  };

  return (
    <div style={{ padding: 20 }}>
      <h1>Tạo sản phẩm mới</h1>
      <form onSubmit={handleSubmit}>
        <input
          name="name"
          placeholder="Tên sản phẩm"
          value={form.name}
          onChange={handleChange}
          required
          style={{ width: "100%", marginBottom: 10, padding: 8 }}
        />
        <textarea
          name="description"
          placeholder="Mô tả sản phẩm"
          value={form.description}
          onChange={handleChange}
          required
          style={{ width: "100%", marginBottom: 10, padding: 8, height: 80 }}
        />
        <input
          name="price"
          type="number"
          placeholder="Giá"
          value={form.price}
          onChange={handleChange}
          required
          style={{ width: "100%", marginBottom: 10, padding: 8 }}
        />
        <input
          name="image"
          placeholder="URL hình ảnh"
          value={form.image}
          onChange={handleChange}
          style={{ width: "100%", marginBottom: 10, padding: 8 }}
        />
        <button type="submit" style={{ padding: "10px 20px" }}>
          Tạo
        </button>
      </form>
      <br />
      <Link href="/">Quay về trang chủ</Link>
    </div>
  );
}
