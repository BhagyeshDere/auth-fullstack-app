import { Link } from "react-router-dom";

export default function Sidebar() {
  return (
    <div className="w-64 min-h-screen bg-gradient-to-b from-gray-900 to-indigo-900 text-white p-6 hidden md:block">

      <h2 className="text-2xl font-bold mb-10 tracking-wide">
        Admin Panel
      </h2>

      <ul className="space-y-3">

        <li>
          <Link to="/admin/dashboard"
            className="block px-4 py-2 rounded-lg hover:bg-indigo-700 transition">
            📊 Dashboard
          </Link>
        </li>

        <li>
          <Link to="/admin/users"
            className="block px-4 py-2 rounded-lg hover:bg-indigo-700 transition">
            👤 Users
          </Link>
        </li>

        <li>
          <Link to="/admin/products"
            className="block px-4 py-2 rounded-lg hover:bg-indigo-700 transition">
            📦 Products
          </Link>
        </li>

      </ul>
    </div>
  );
}