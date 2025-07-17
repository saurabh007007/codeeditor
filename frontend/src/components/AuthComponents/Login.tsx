import React, { useState } from 'react'
import { useForm } from "react-hook-form"
import { zodResolver } from "@hookform/resolvers/zod"
import { Link } from 'react-router-dom'
import {
  Code,
  Eye,
  EyeOff,
  Loader2,
  Lock,
  Mail,
} from "lucide-react";
import { z } from "zod";
import { useAuthStore } from '../../store/useAuthStore';

const LoginSchema = z.object({
  email: z.string().email("Enter a valid email"),
  password: z.string().min(6, "Password must be at least 6 characters"),
})

export const Login = () => {
  const { isLoggingIn, login } = useAuthStore()
  const [showPassword, setShowPassword] = useState(false);

  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm({
    resolver: zodResolver(LoginSchema)
  })

  const onSubmit = async (data) => {
    try {
      await login(data)
    } catch (error) {
      console.error("Login failed", error)
    }
  }

  return (
    <div className='h-screen grid lg:grid-cols-2 bg-gradient-to-br from-zinc-900 via-zinc-800 to-zinc-900 text-white'>
      {/* Left Side */}
      <div className="hidden lg:flex items-center justify-center bg-gradient-to-br from-primary to-indigo-600 text-white">
        <div className="text-center space-y-4 px-12">
          <Code className="w-16 h-16 mx-auto text-white drop-shadow-lg" />
          <h2 className="text-3xl font-bold">DevDash</h2>
          <p className="text-zinc-100 text-lg">
            Manage your developer tools in one place. Fast. Secure. Intuitive.
          </p>
        </div>
      </div>

      {/* Right Side - Form */}
      <div className="flex items-center justify-center px-6 sm:px-12">
        <div className="w-full max-w-md bg-zinc-800/50 backdrop-blur rounded-xl p-8 shadow-xl space-y-8">
          <div className="text-center">
            <h1 className="text-3xl font-extrabold tracking-tight">Welcome Back</h1>
            <p className="text-zinc-400">Login to your account</p>
          </div>

          <form onSubmit={handleSubmit(onSubmit)} className="space-y-5">
            {/* Email */}
            <div className="form-control">
              <label className="label text-sm font-semibold mb-1">Email</label>
              <div className="relative">
                <Mail className="absolute left-3 top-3.5 h-5 w-5 text-zinc-400" />
                <input
                  type="email"
                  {...register("email")}
                  placeholder="you@example.com"
                  className={`input w-full pl-10 pr-3 py-2 rounded-lg bg-zinc-700 text-white placeholder-zinc-400 focus:outline-none focus:ring-2 focus:ring-primary/70 transition-all ${
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
              <label className="label text-sm font-semibold mb-1">Password</label>
              <div className="relative">
                <Lock className="absolute left-3 top-3.5 h-5 w-5 text-zinc-400" />
                <input
                  type={showPassword ? "text" : "password"}
                  {...register("password")}
                  placeholder="••••••••"
                  className={`input w-full pl-10 pr-10 py-2 rounded-lg bg-zinc-700 text-white placeholder-zinc-400 focus:outline-none focus:ring-2 focus:ring-primary/70 transition-all ${
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

            {/* Submit */}
            <button
              type="submit"
              className="btn btn-primary w-full py-2 rounded-lg text-white font-semibold tracking-wide hover:bg-primary/80 transition-all flex items-center justify-center gap-2"
              disabled={isLoggingIn}
            >
              {isLoggingIn ? (
                <>
                  <Loader2 className="h-5 w-5 animate-spin" />
                  Signing in...
                </>
              ) : (
                "Sign in"
              )}
            </button>
          </form>

          {/* Footer */}
          <div className="text-center pt-4 text-sm text-zinc-400">
            Don’t have an account?{" "}
            <Link to="/signup" className="text-primary hover:underline">
              Sign up
            </Link>
          </div>
        </div>
      </div>
    </div>
  )
}
