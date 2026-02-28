import { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import API from "../services/api";

function Login() {
  const navigate = useNavigate();

  const [form, setForm] = useState({
    email: "",
    password: ""
  });

  const [showPassword, setShowPassword] = useState(false);
  const [loading, setLoading] = useState(false);

  const handleSubmit = async (e) => {
    e.preventDefault();

    if (loading) return;

    try {
      setLoading(true);

      const res = await API.post("/auth/login", form);

      // Save token
      localStorage.setItem("token", res.data.token);

      // Redirect to dashboard
      navigate("/admin/dashboard", { replace: true });

    } catch (err) {
      alert(err.response?.data?.message || "Login failed");
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="relative min-h-screen flex items-center justify-center px-4 bg-gradient-to-br from-gray-950 via-indigo-950 to-black overflow-hidden">

      <div className="absolute w-[400px] h-[400px] bg-purple-600 rounded-full blur-3xl opacity-20 -top-20 -left-20 animate-pulse"></div>
      <div className="absolute w-[400px] h-[400px] bg-pink-500 rounded-full blur-3xl opacity-20 bottom-0 right-0 animate-pulse"></div>

      <div className="relative w-full max-w-md sm:max-w-lg bg-white/10 backdrop-blur-2xl border border-white/20 shadow-[0_0_50px_rgba(168,85,247,0.15)] rounded-3xl p-8 sm:p-12 transition-all duration-500">

        <h2 className="text-3xl sm:text-4xl font-extrabold text-white text-center mb-10 tracking-wide">
          Welcome Back 👋
        </h2>

        <form onSubmit={handleSubmit} className="space-y-7">

          <div className="relative">
            <input
              type="email"
              required
              value={form.email}
              className="peer w-full p-4 rounded-xl bg-white/10 text-white placeholder-transparent focus:outline-none focus:ring-2 focus:ring-purple-500 focus:shadow-lg focus:shadow-purple-500/30 transition"
              placeholder="Email"
              onChange={(e) =>
                setForm({ ...form, email: e.target.value })
              }
            />
            <label
              className="absolute left-4 px-2 bg-[#0f172a] text-purple-300 text-sm transition-all 
              peer-placeholder-shown:top-4 
              peer-placeholder-shown:text-base 
              peer-placeholder-shown:text-gray-400 
              peer-placeholder-shown:bg-transparent
              peer-focus:-top-2.5 
              peer-focus:text-sm 
              peer-focus:text-purple-300
              -top-2.5"
            >
              Email Address
            </label>
          </div>

          <div className="relative">
            <input
              type={showPassword ? "text" : "password"}
              required
              value={form.password}
              className="peer w-full p-4 rounded-xl bg-white/10 text-white placeholder-transparent focus:outline-none focus:ring-2 focus:ring-purple-500 focus:shadow-lg focus:shadow-purple-500/30 transition"
              placeholder="Password"
              onChange={(e) =>
                setForm({ ...form, password: e.target.value })
              }
            />
            <label
              className="absolute left-4 px-2 bg-[#0f172a] text-purple-300 text-sm transition-all 
              peer-placeholder-shown:top-4 
              peer-placeholder-shown:text-base 
              peer-placeholder-shown:text-gray-400 
              peer-placeholder-shown:bg-transparent
              peer-focus:-top-2.5 
              peer-focus:text-sm 
              peer-focus:text-purple-300
              -top-2.5"
            >
              Password
            </label>

            <button
              type="button"
              onClick={() => setShowPassword(!showPassword)}
              className="absolute right-4 top-4 text-sm text-purple-400 hover:text-white transition"
            >
              {showPassword ? "Hide" : "Show"}
            </button>
          </div>

          <button
            type="submit"
            disabled={loading}
            className="w-full py-4 rounded-xl bg-gradient-to-r from-purple-600 to-pink-500 text-white font-bold tracking-wide hover:scale-105 hover:shadow-xl hover:shadow-purple-600/40 transition duration-300 disabled:opacity-60"
          >
            {loading ? "Logging in..." : "Login 🚀"}
          </button>

        </form>

        <p className="text-center text-gray-400 mt-10 text-sm sm:text-base">
          Don’t have an account?
          <Link
            to="/register"
            className="font-semibold ml-1 text-purple-400 hover:text-white transition"
          >
            Register
          </Link>
        </p>

      </div>
    </div>
  );
}

export default Login;