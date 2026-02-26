import { useState } from "react";
import axios from "axios";
import { Link, useNavigate } from "react-router-dom";

function Login() {
  const navigate = useNavigate();

  const [form, setForm] = useState({
    email: "",
    password: ""
  });

  const [showPassword, setShowPassword] = useState(false);

  const handleSubmit = async (e) => {
    e.preventDefault();

    try {
      const res = await axios.post(
        "http://localhost:5000/api/auth/login",
        form
      );

      localStorage.setItem("token", res.data.token);
      alert("Login Successful");

      navigate("/");

    } catch (err) {
      alert(err.response?.data?.message || "Login failed");
    }
  };

  return (
    <div className="relative min-h-screen flex items-center justify-center px-4 bg-gradient-to-br from-gray-950 via-indigo-950 to-black overflow-hidden">

      {/* Animated Glow Background */}
      <div className="absolute w-[400px] h-[400px] bg-purple-600 rounded-full blur-3xl opacity-20 -top-20 -left-20 animate-pulse"></div>
      <div className="absolute w-[400px] h-[400px] bg-pink-500 rounded-full blur-3xl opacity-20 bottom-0 right-0 animate-pulse"></div>

      {/* Glass Card */}
      <div className="relative w-full max-w-md sm:max-w-lg bg-white/10 backdrop-blur-2xl border border-white/20 shadow-[0_0_50px_rgba(168,85,247,0.15)] rounded-3xl p-8 sm:p-12 transition-all duration-500">

        <h2 className="text-3xl sm:text-4xl font-extrabold text-white text-center mb-10 tracking-wide">
          Welcome Back 👋
        </h2>

        <form onSubmit={handleSubmit} className="space-y-7">

          {/* Email Field */}
          <div className="relative">
            <input
              type="email"
              required
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

          {/* Password Field */}
          <div className="relative">
            <input
              type={showPassword ? "text" : "password"}
              required
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

          {/* Login Button */}
          <button
            type="submit"
            className="w-full py-4 rounded-xl bg-gradient-to-r from-purple-600 to-pink-500 text-white font-bold tracking-wide hover:scale-105 hover:shadow-xl hover:shadow-purple-600/40 transition duration-300"
          >
            Login 🚀
          </button>

        </form>

        {/* Register Link */}
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