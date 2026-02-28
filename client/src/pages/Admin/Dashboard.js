import { useEffect, useState } from "react";
import API from "../../services/api";
import {
  Chart as ChartJS,
  CategoryScale,
  LinearScale,
  BarElement,
  Tooltip,
  Legend
} from "chart.js";
import { Bar } from "react-chartjs-2";

ChartJS.register(CategoryScale, LinearScale, BarElement, Tooltip, Legend);

export default function Dashboard() {
  const [data, setData] = useState(null);
  const [monthlyUsers, setMonthlyUsers] = useState([]);
  const [recentProducts, setRecentProducts] = useState([]);

  useEffect(() => {
    API.get("/admin/dashboard")
      .then(res => setData(res.data))
      .catch(err => console.log(err));

    API.get("/admin/monthly-users")
      .then(res => setMonthlyUsers(res.data))
      .catch(err => console.log(err));

    API.get("/admin/products")
      .then(res => setRecentProducts(res.data.slice(0, 5)))
      .catch(err => console.log(err));

  }, []);

  if (!data) return <div>Loading...</div>;

  const chartData = {
    labels: monthlyUsers.map(item =>
      new Date(item.month).toLocaleDateString("en-US", {
        month: "short",
        year: "numeric"
      })
    ),
    datasets: [
      {
        label: "Monthly Users",
        data: monthlyUsers.map(item => item.total),
        backgroundColor: "rgba(99, 102, 241, 0.7)"
      }
    ]
  };

  return (
    <div className="space-y-8">

      {/* Header */}
      <div>
        <h1 className="text-3xl font-bold text-gray-800">
          Welcome Back 👋
        </h1>
        <p className="text-gray-500">
          Here is your business overview
        </p>
      </div>

      {/* Stats Cards */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-6">

        <div className="bg-gradient-to-r from-indigo-500 to-purple-600 text-white p-6 rounded-2xl shadow-lg">
          <h2 className="text-lg">Total Users</h2>
          <p className="text-3xl font-bold">{data.totalUsers}</p>
        </div>

        <div className="bg-gradient-to-r from-green-400 to-green-600 text-white p-6 rounded-2xl shadow-lg">
          <h2 className="text-lg">Total Products</h2>
          <p className="text-3xl font-bold">{data.totalProducts}</p>
        </div>

        <div className="bg-gradient-to-r from-pink-500 to-red-500 text-white p-6 rounded-2xl shadow-lg">
          <h2 className="text-lg">Total Revenue</h2>
          <p className="text-3xl font-bold">₹ {data.totalRevenue}</p>
        </div>

      </div>

      {/* NEW SECTION — Monthly Users Chart */}
      <div className="bg-white p-6 rounded-2xl shadow-lg">
        <h2 className="text-xl font-semibold mb-4">
          Monthly User Growth
        </h2>
        <Bar data={chartData} />
      </div>

      {/* Existing Recent Users Table (UNCHANGED) */}
      <div className="bg-white p-6 rounded-2xl shadow-lg">
        <h2 className="text-xl font-semibold mb-4">
          Recent Users
        </h2>

        <div className="overflow-x-auto">
          <table className="w-full text-left">
            <thead>
              <tr className="border-b text-gray-600">
                <th className="pb-2">Name</th>
                <th>Email</th>
                <th>Joined</th>
              </tr>
            </thead>
            <tbody>
              {data.recentUsers?.map(user => (
                <tr key={user.id} className="border-b hover:bg-gray-50">
                  <td className="py-2">{user.name}</td>
                  <td>{user.email}</td>
                  <td>
                    {new Date(user.created_at).toLocaleDateString()}
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>

      {/* NEW SECTION — Recent Products */}
      <div className="bg-white p-6 rounded-2xl shadow-lg">
        <h2 className="text-xl font-semibold mb-4">
          Recent Products
        </h2>

        <div className="overflow-x-auto">
          <table className="w-full text-left">
            <thead>
              <tr className="border-b text-gray-600">
                <th>Title</th>
                <th>Price</th>
                <th>Category</th>
                <th>Stock</th>
              </tr>
            </thead>
            <tbody>
              {recentProducts.map(product => (
                <tr key={product.id} className="border-b hover:bg-gray-50">
                  <td>{product.title}</td>
                  <td>₹ {product.price}</td>
                  <td>{product.category}</td>
                  <td>{product.stock}</td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>

    </div>
  );
}