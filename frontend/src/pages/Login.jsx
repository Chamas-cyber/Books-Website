import React, { useState } from "react";
import axios from "axios";
import { useNavigate } from "react-router-dom";

// Demo credentials requested by the user
const DEMO_EMAIL = "hadi.shamas41@gmail.com";
const DEMO_PASSWORD = "Chamas17";

const Login = () => {
  const navigate = useNavigate();
  // Prefill the form with the demo credentials so you can login immediately
  const [email, setEmail] = useState(DEMO_EMAIL);
  const [password, setPassword] = useState(DEMO_PASSWORD);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);

  const doLogin = async (emailToUse, passwordToUse) => {
    setError(null);
    try {
      setLoading(true);
      const res = await axios.post("http://localhost:5000/auth/login", {
        email: emailToUse,
        password: passwordToUse,
      });
      if (res.data?.token) {
        localStorage.setItem("token", res.data.token);
      }
        navigate("/home");
    } catch (err) {
      console.error(err);
      setError(err.response?.data?.message || "Login failed");
    } finally {
      setLoading(false);
    }
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (!email || !password) {
      setError("Please enter email and password");
      return;
    }
    await doLogin(email, password);
  };

  return (
    <div className="min-h-screen flex items-center justify-center bg-gray-50 p-4">
      <div className="w-full max-w-md bg-white rounded-lg shadow-md p-6">
        <h2 className="text-2xl font-semibold text-center mb-4">Login</h2>

        {error && (
          <div className="bg-red-100 text-red-800 px-3 py-2 rounded mb-4">{error}</div>
        )}

        <form onSubmit={handleSubmit} className="space-y-4">
          <div>
            <label className="block text-sm font-medium mb-1">Email</label>
            <input
              type="email"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              className="w-full border border-gray-300 rounded px-3 py-2 focus:outline-none focus:ring-2 focus:ring-sky-400"
              placeholder="you@example.com"
            />
          </div>

          <div>
            <label className="block text-sm font-medium mb-1">Password</label>
            <input
              type="password"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              className="w-full border border-gray-300 rounded px-3 py-2 focus:outline-none focus:ring-2 focus:ring-sky-400"
              placeholder="Your password"
            />
          </div>

          <div>
            <button
              type="submit"
              className="w-full bg-sky-600 hover:bg-sky-700 text-white py-2 rounded disabled:opacity-60"
              disabled={loading}
            >
              {loading ? "Logging in..." : "Login"}
            </button>
          </div>
        </form>

        <p className="text-sm text-center text-gray-500 mt-4">
          Don't have an account? <a className="text-sky-600">Register</a>
        </p>
      </div>
    </div>
  );
};

export default Login;
