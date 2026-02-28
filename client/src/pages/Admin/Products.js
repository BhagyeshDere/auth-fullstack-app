import { useEffect, useState } from "react";
import API from "../../services/api";

export default function Products() {
  const [products, setProducts] = useState([]);
  const [form, setForm] = useState({
    title: "",
    price: "",
    category: "",
    stock: ""
  });

  const fetchProducts = async () => {
    try {
      const res = await API.get("/admin/products");
      setProducts(res.data);
    } catch (err) {
      console.log(err);
    }
  };

  useEffect(() => {
    fetchProducts();
  }, []);

  const handleSubmit = async (e) => {
    e.preventDefault();

    // ✅ Basic validation
    if (!form.title || !form.price) {
      alert("Title and Price are required");
      return;
    }

    try {
      await API.post("/admin/products", {
        title: form.title,
        price: Number(form.price),   // 🔥 convert to number
        category: form.category,
        stock: Number(form.stock) || 0  // 🔥 convert safely
      });

      alert("Product Added Successfully");

      // Reset form
      setForm({
        title: "",
        price: "",
        category: "",
        stock: ""
      });

      fetchProducts();

    } catch (error) {
      console.log(error.response?.data);
      alert("Error adding product");
    }
  };

  return (
    <div className="space-y-8">

      <h1 className="text-2xl font-bold">Products</h1>

      {/* Add Product Form */}
      <form
        onSubmit={handleSubmit}
        className="bg-white p-6 rounded-2xl shadow-lg grid md:grid-cols-4 gap-4"
      >

        <input
          placeholder="Title"
          value={form.title}
          className="border p-2 rounded"
          onChange={e => setForm({ ...form, title: e.target.value })}
        />

        <input
          type="number"
          placeholder="Price"
          value={form.price}
          className="border p-2 rounded"
          onChange={e => setForm({ ...form, price: e.target.value })}
        />

        <input
          placeholder="Category"
          value={form.category}
          className="border p-2 rounded"
          onChange={e => setForm({ ...form, category: e.target.value })}
        />

        <input
          type="number"
          placeholder="Stock"
          value={form.stock}
          className="border p-2 rounded"
          onChange={e => setForm({ ...form, stock: e.target.value })}
        />

        <button
          type="submit"
          className="col-span-4 bg-indigo-600 text-white py-2 rounded-lg hover:bg-indigo-700 transition"
        >
          Add Product
        </button>

      </form>

      {/* Products Table */}
      <div className="bg-white p-6 rounded-2xl shadow-lg overflow-x-auto">
        <table className="w-full">
          <thead className="border-b">
            <tr>
              <th>Title</th>
              <th>Price</th>
              <th>Category</th>
              <th>Stock</th>
            </tr>
          </thead>
          <tbody>
            {products.map(p => (
              <tr key={p.id} className="border-b hover:bg-gray-50">
                <td>{p.title}</td>
                <td>₹ {p.price}</td>
                <td>{p.category}</td>
                <td>{p.stock}</td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>

    </div>
  );
}