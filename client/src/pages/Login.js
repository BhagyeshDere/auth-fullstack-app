import { useState } from "react";
import axios from "axios";
import { Link } from "react-router-dom";

function Login() {
  const [form, setForm] = useState({
    email: "",
    password: "",
  });

  const [showPassword, setShowPassword] = useState(false);
  const [loading, setLoading] = useState(false);

  const API_URL =
    process.env.REACT_APP_API_URL || "http://localhost:5000";

  const handleSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);

    try {
      const res = await axios.post(
        `${API_URL}/api/auth/login`,
        form
      );

      // Save JWT token
      localStorage.setItem("token", res.data.token);

      // ✅ Browser popup
      alert("Login Successful 🚀");

    } catch (err) {
      alert(
        err.response?.data?.message || "Login failed"
      );
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="relative min-h-screen flex items-center justify-center px-4 bg-gradient-to-br from-gray-950 via-indigo-950 to-black overflow-hidden">

      {/* Background Glow */}
      <div className="absolute w-[400px] h-[400px] bg-purple-600 rounded-full blur-3xl opacity-20 -top-20 -left-20 animate-pulse"></div>
      <div className="absolute w-[400px] h-[400px] bg-pink-500 rounded-full blur-3xl opacity-20 bottom-0 right-0 animate-pulse"></div>

      <div className="relative w-full max-w-md bg-white/10 backdrop-blur-2xl border border-white/20 rounded-3xl p-8 shadow-xl">

        <h2 className="text-3xl font-extrabold text-white text-center mb-6">
          Welcome Back 👋
        </h2>

        <form onSubmit={handleSubmit} className="space-y-6">

          {/* Email */}
          <input
            type="email"
            required
            value={form.email}
            onChange={(e) =>
              setForm({ ...form, email: e.target.value })
            }
            className="w-full p-4 rounded-xl bg-white/10 text-white focus:outline-none focus:ring-2 focus:ring-purple-500"
            placeholder="Email Address"
          />

          {/* Password */}
          <div className="relative">
            <input
              type={showPassword ? "text" : "password"}
              required
              value={form.password}
              onChange={(e) =>
                setForm({ ...form, password: e.target.value })
              }
              className="w-full p-4 rounded-xl bg-white/10 text-white focus:outline-none focus:ring-2 focus:ring-purple-500"
              placeholder="Password"
            />

            <button
              type="button"
              onClick={() => setShowPassword(!showPassword)}
              className="absolute right-4 top-4 text-sm text-purple-400"
            >
              {showPassword ? "Hide" : "Show"}
            </button>
          </div>

          {/* Login Button */}
          <button
            type="submit"
            disabled={loading}
            className="w-full py-4 rounded-xl bg-gradient-to-r from-purple-600 to-pink-500 text-white font-bold transition hover:scale-105 disabled:opacity-50"
          >
            {loading ? "Logging in..." : "Login 🚀"}
          </button>
        </form>

        <p className="text-center text-gray-400 mt-8">
          Don’t have an account?
          <Link
            to="/register"
            className="ml-1 text-purple-400 hover:text-white"
          >
            Register
          </Link>
        </p>
      </div>
    </div>
  );
}

export default Login;