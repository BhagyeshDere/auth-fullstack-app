import { Outlet, useNavigate } from "react-router-dom";
import { useEffect, useState } from "react";
import Sidebar from "./Sidebar";

export default function AdminLayout() {
  const navigate = useNavigate();
  const [adminEmail, setAdminEmail] = useState("");
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const token = localStorage.getItem("token");

    if (!token) {
      navigate("/", { replace: true });
      return;
    }

    try {
      const base64Payload = token.split(".")[1];
      const decodedPayload = JSON.parse(
        atob(base64Payload.replace(/-/g, "+").replace(/_/g, "/"))
      );

      setAdminEmail(decodedPayload.email || "Admin");
    } catch (err) {
      localStorage.removeItem("token");
      navigate("/", { replace: true });
    } finally {
      setLoading(false);
    }
  }, [navigate]);

  const handleLogout = () => {
    localStorage.removeItem("token");
    navigate("/", { replace: true });
  };

  if (loading) return null;

  return (
    <div className="flex min-h-screen bg-gray-100">

      <Sidebar />

      <div className="flex-1 flex flex-col overflow-y-auto">

        <div className="flex justify-between items-center bg-white px-6 py-4 shadow-sm border-b">

          <h1 className="text-lg font-semibold text-gray-700">
            Admin Panel
          </h1>

          <div className="flex items-center gap-4">

            <div className="text-right">
              <p className="text-sm font-medium text-gray-800">
                {adminEmail}
              </p>
              <p className="text-xs text-gray-500">
                Administrator
              </p>
            </div>

            <button
              onClick={handleLogout}
              className="bg-red-500 text-white px-4 py-2 rounded-lg hover:bg-red-600 transition"
            >
              Logout
            </button>

          </div>

        </div>

        <div className="p-6">
          <Outlet />
        </div>

      </div>
    </div>
  );
}