import { useRouter } from "next/router";
import { useEffect, useState } from "react";
import axios from "axios";
import Link from "next/link";

export default function EditProduct() {
  const router = useRouter();
  const { id } = router.query;
  const [form, setForm] = useState({
    name: "",
    description: "",
    price: "",
    image: "",
  });

  useEffect(() => {
    if (!id) return;
    axios
      .get(`/api/products/${id}`)
      .then((res) => {
        setForm({
          name: res.data.name,
          description: res.data.description,
          price: res.data.price,
          image: res.data.image || "",
        });
      })
      .catch((err) => console.error(err));
  }, [id]);

  const handleChange = (e) => {
    setForm({ ...form, [e.target.name]: e.target.value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      await axios.put(`/api/products/${id}`, {
        ...form,
        price: parseFloat(form.price),
      });
      alert("Updated successfully");
      router.push(`/products/${id}`);
    } catch {
      alert("Error updating");
    }
  };

  return (
    <div style={{ padding: 20 }}>
      <h1>Edit product</h1>
      <form onSubmit={handleSubmit}>
        <input
          name="name"
          placeholder="Product name"
          value={form.name}
          onChange={handleChange}
          required
          style={{ width: "100%", marginBottom: 10, padding: 8 }}
        />
        <textarea
          name="description"
          placeholder="Product description"
          value={form.description}
          onChange={handleChange}
          required
          style={{ width: "100%", marginBottom: 10, padding: 8, height: 80 }}
        />
        <input
          name="price"
          type="number"
          placeholder="Price"
          value={form.price}
          onChange={handleChange}
          required
          style={{ width: "100%", marginBottom: 10, padding: 8 }}
        />
        <input
          name="image"
          placeholder="Image URL"
          value={form.image}
          onChange={handleChange}
          style={{ width: "100%", marginBottom: 10, padding: 8 }}
        />
        <button type="submit" style={{ padding: "10px 20px" }}>
          Save
        </button>
      </form>
      <br />
      <Link href={`/products/${id}`}>Back to details</Link>
    </div>
  );
}
