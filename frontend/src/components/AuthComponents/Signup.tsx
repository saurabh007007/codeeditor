import { useState } from "react";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { Link } from "react-router-dom";
import { Code, Eye, EyeOff, Loader2, Lock, Mail } from "lucide-react";
import { z } from "zod";
import { useAuthStore } from "../../store/useAuthStore";

const SignUpSchema = z.object({
  email: z.string().email("Enter a valid email"),
  password: z.string().min(6, "Password must be at least 6 characters"),
  name: z.string().min(3, "Name must be at least 3 characters"),
});

export const Signup = () => {
  const [showPassword, setShowPassword] = useState(false);
  const { signup, isSigninUp } = useAuthStore();

  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm({
    resolver: zodResolver(SignUpSchema),
  });

  const onSubmit = async (data) => {
    try {
      await signup(data);
      console.log("signup data", data);
    } catch (error) {
      console.error("SignUp failed:", error);
    }
  };

  return (
    <div className="min-h-screen flex items-center justify-center bg-gradient-to-br from-zinc-900 via-zinc-800 to-zinc-900 text-white px-4">
      <div className="w-full max-w-xl backdrop-blur bg-white/5 border border-white/10 rounded-2xl p-8 sm:p-10 shadow-2xl">
        <div className="text-center mb-8">
          <div className="flex flex-col items-center gap-3">
            <div className="w-14 h-14 bg-primary/10 rounded-xl flex items-center justify-center">
              <Code className="w-6 h-6 text-primary" />
            </div>
            <h1 className="text-3xl font-bold">Create an Account</h1>
            <p className="text-zinc-400">Get started with your journey</p>
          </div>
        </div>

        <form onSubmit={handleSubmit(onSubmit)} className="space-y-6">
          {/* Name */}
          <div className="form-control">
            <label className="label text-sm font-medium mb-1">Name</label>
            <div className="relative">
              <Code className="absolute left-3 top-3.5 h-5 w-5 text-zinc-400" />
              <input
                type="text"
                {...register("name")}
                placeholder="John Doe"
                className={`input w-full pl-10 py-2 rounded-lg bg-zinc-700 text-white placeholder-zinc-400 focus:outline-none focus:ring-2 focus:ring-primary/60 ${
                  errors.name ? "border-red-500 focus:ring-red-500" : "border border-zinc-600"
                }`}
              />
            </div>
            {errors.name && (
              <p className="text-red-400 text-sm mt-1">{errors.name.message}</p>
            )}
          </div>

          {/* Email */}
          <div className="form-control">
            <label className="label text-sm font-medium mb-1">Email</label>
            <div className="relative">
              <Mail className="absolute left-3 top-3.5 h-5 w-5 text-zinc-400" />
              <input
                type="email"
                {...register("email")}
                placeholder="you@example.com"
                className={`input w-full pl-10 py-2 rounded-lg bg-zinc-700 text-white placeholder-zinc-400 focus:outline-none focus:ring-2 focus:ring-primary/60 ${
                  errors.email ? "border-red-500 focus:ring-red-500" : "border border-zinc-600"
                }`}
              />
            </div>
            {errors.email && (
              <p className="text-red-400 text-sm mt-1">{errors.email.message}</p>
            )}
          </div>

          {/* Password */}
          <div className="form-control">
            <label className="label text-sm font-medium mb-1">Password</label>
            <div className="relative">
              <Lock className="absolute left-3 top-3.5 h-5 w-5 text-zinc-400" />
              <input
                type={showPassword ? "text" : "password"}
                {...register("password")}
                placeholder="••••••••"
                className={`input w-full pl-10 pr-10 py-2 rounded-lg bg-zinc-700 text-white placeholder-zinc-400 focus:outline-none focus:ring-2 focus:ring-primary/60 ${
                  errors.password ? "border-red-500 focus:ring-red-500" : "border border-zinc-600"
                }`}
              />
              <button
                type="button"
                className="absolute right-3 top-3.5 text-zinc-400 hover:text-white transition"
                onClick={() => setShowPassword(!showPassword)}
              >
                {showPassword ? <EyeOff className="h-5 w-5" /> : <Eye className="h-5 w-5" />}
              </button>
            </div>
            {errors.password && (
              <p className="text-red-400 text-sm mt-1">{errors.password.message}</p>
            )}
          </div>

          {/* Submit Button */}
          <button
            type="submit"
            className="btn btn-primary w-full flex items-center justify-center gap-2 py-2 font-semibold tracking-wide hover:bg-primary/80 transition-all"
            disabled={isSigninUp}
          >
            {isSigninUp ? (
              <>
                <Loader2 className="h-5 w-5 animate-spin" />
                Creating Account...
              </>
            ) : (
              "Sign Up"
            )}
          </button>
        </form>

        {/* Footer */}
        <div className="text-center pt-6 text-sm text-zinc-400">
          Already have an account?{" "}
          <Link to="/login" className="text-primary hover:underline">
            Sign in
          </Link>
        </div>
      </div>
    </div>
  );
};
