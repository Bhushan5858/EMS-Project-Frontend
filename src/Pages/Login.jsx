import React, { useState, useEffect } from "react";
import {
  Mail,
  Lock,
  EyeOff,
  Eye,
  Loader2,
} from "lucide-react";
import { useNavigate } from "react-router-dom";
import toast from "react-hot-toast";
import { useAuthUserStore } from "../Store/useAuthUserStore";

const Login = () => {
  const navigate = useNavigate();
  const { login, authUser } = useAuthUserStore();

  const [loading, setLoading] = useState(false);
  const [showPassword, setShowPassword] = useState(false);

  const [formData, setFormData] = useState({
    email: "",
    password: "",
  });

  useEffect(() => {
    if (authUser) navigate("/home");
  }, [authUser, navigate]);

  const validateForm = () => {
    if (!formData.email.trim()) return toast.error("Email is required");
    if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(formData.email))
      return toast.error("Invalid email");
    if (!formData.password.trim())
      return toast.error("Password is required");
    if (formData.password.length < 4)
      return toast.error("Password must be at least 4 characters");

    return true;
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (!validateForm()) return;

    try {
      setLoading(true);
      const success = await login(formData);
      if (success) navigate("/home");
    } catch (error) {
      toast.error("Login failed");
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="min-h-screen flex items-center justify-center bg-gradient-to-br from-slate-900 via-slate-800 to-slate-900 relative overflow-hidden">

      {/* Background glow */}
      <div className="absolute w-96 h-96 bg-teal-500/20 rounded-full blur-3xl -top-20 -left-20"></div>
      <div className="absolute w-96 h-96 bg-blue-500/20 rounded-full blur-3xl bottom-0 right-0"></div>

      {/* Card */}
      <div className="w-full max-w-md backdrop-blur-xl bg-white/10 border border-white/20 rounded-3xl shadow-2xl p-8">

        {/* Header */}
        <div className="mb-8 text-center">
          <h1 className="text-3xl font-bold text-white">
            Welcome Back
          </h1>
          <p className="text-sm text-slate-300 mt-2">
            Login to continue to EMS
          </p>
        </div>

        {/* Form */}
        <form onSubmit={handleSubmit} className="space-y-5">

          {/* Email */}
          <div>
            <label className="text-sm text-slate-300">Email</label>

            <div className="relative mt-1">
              <Mail className="absolute left-3 top-3 size-5 text-slate-400" />

              <input
                type="text"
                placeholder="you@company.com"
                className="w-full pl-10 pr-3 py-2 rounded-xl bg-white/10 border border-white/20 text-white placeholder-slate-400 
                focus:outline-none focus:ring-2 focus:ring-teal-500 transition-all"
                value={formData.email}
                onChange={(e) =>
                  setFormData({ ...formData, email: e.target.value })
                }
              />
            </div>
          </div>

          {/* Password */}
          <div>
            <label className="text-sm text-slate-300">Password</label>

            <div className="relative mt-1">
              <Lock className="absolute left-3 top-3 size-5 text-slate-400" />

              <input
                type={showPassword ? "text" : "password"}
                placeholder="Enter password"
                className="w-full pl-10 pr-10 py-2 rounded-xl bg-white/10 border border-white/20 text-white placeholder-slate-400 
                focus:outline-none focus:ring-2 focus:ring-teal-500 transition-all"
                value={formData.password}
                onChange={(e) =>
                  setFormData({ ...formData, password: e.target.value })
                }
              />

              <button
                type="button"
                onClick={() => setShowPassword(!showPassword)}
                className="absolute right-3 top-3 text-slate-400 hover:text-white"
              >
                {showPassword ? (
                  <EyeOff className="size-5" />
                ) : (
                  <Eye className="size-5" />
                )}
              </button>
            </div>
          </div>

          {/* Button */}
          <button
            type="submit"
            disabled={loading}
            className="w-full flex items-center justify-center gap-2 bg-teal-600 hover:bg-teal-500 text-white py-2 rounded-xl font-medium transition-all active:scale-95 disabled:opacity-70"
          >
            {loading ? (
              <>
                <Loader2 className="animate-spin size-5" />
                Logging in...
              </>
            ) : (
              "Login"
            )}
          </button>

        </form>
      </div>
    </div>
  );
};

export default Login;