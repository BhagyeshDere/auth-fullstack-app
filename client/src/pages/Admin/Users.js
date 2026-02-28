import { useEffect, useState } from "react";
import API from "../../services/api";

export default function Users() {
  const [users, setUsers] = useState([]);
  const [form, setForm] = useState({
    name: "",
    email: "",
    password: ""
  });

  const fetchUsers = async () => {
    try {
      const res = await API.get("/admin/users");
      setUsers(res.data);
    } catch (err) {
      console.log(err.response?.data || err.message);
    }
  };

  useEffect(() => {
    fetchUsers();
  }, []);

  const handleSubmit = async (e) => {
    e.preventDefault();

    if (!form.name || !form.email || !form.password) {
      alert("All fields required");
      return;
    }

    try {
      await API.post("/admin/users", form);

      setForm({
        name: "",
        email: "",
        password: ""
      });

      fetchUsers();
    } catch (err) {
      console.log(err.response?.data || err.message);
    }
  };

  const handleDelete = async (id) => {
    if (!window.confirm("Are you sure?")) return;

    try {
      await API.delete(`/admin/users/${id}`);
      fetchUsers();
    } catch (err) {
      console.log(err.response?.data || err.message);
    }
  };

  return (
    <div className="space-y-6">

      <h1 className="text-2xl font-bold">All Users</h1>

      {/* Add User Form */}
      <form
        onSubmit={handleSubmit}
        className="bg-white p-6 rounded-2xl shadow-lg grid md:grid-cols-3 gap-4"
      >
        <input
          placeholder="Name"
          value={form.name}
          className="border p-2 rounded"
          onChange={e => setForm({ ...form, name: e.target.value })}
        />

        <input
          placeholder="Email"
          value={form.email}
          className="border p-2 rounded"
          onChange={e => setForm({ ...form, email: e.target.value })}
        />

        <input
          type="password"
          placeholder="Password"
          value={form.password}
          className="border p-2 rounded"
          onChange={e => setForm({ ...form, password: e.target.value })}
        />

        <button
          type="submit"
          className="md:col-span-3 bg-indigo-600 text-white py-2 rounded-lg hover:bg-indigo-700 transition"
        >
          Add User
        </button>
      </form>

      {/* Users Table */}
      <div className="bg-white p-6 rounded-2xl shadow-lg overflow-x-auto">
        <table className="w-full text-left">
          <thead className="border-b">
            <tr>
              <th>ID</th>
              <th>Name</th>
              <th>Email</th>
              <th>Joined</th>
              <th>Action</th>
            </tr>
          </thead>

          <tbody>
            {users.length === 0 ? (
              <tr>
                <td colSpan="5" className="text-center py-4 text-gray-500">
                  No Users Found
                </td>
              </tr>
            ) : (
              users.map(user => (
                <tr key={user.id} className="border-b hover:bg-gray-50">
                  <td>{user.id}</td>
                  <td>{user.name}</td>
                  <td>{user.email}</td>
                  <td>
                    {user.created_at
                      ? new Date(user.created_at).toLocaleDateString()
                      : "-"}
                  </td>
                  <td>
                    <button
                      onClick={() => handleDelete(user.id)}
                      className="bg-red-500 text-white px-3 py-1 rounded hover:bg-red-600"
                    >
                      Delete
                    </button>
                  </td>
                </tr>
              ))
            )}
          </tbody>
        </table>
      </div>
    </div>
  );
}