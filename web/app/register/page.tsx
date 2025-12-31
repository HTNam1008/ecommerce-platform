"use client";

import { useState } from "react";
import { Mail, Lock, Eye, EyeOff, ArrowRight, User, ShoppingBag, CheckCircle } from "lucide-react";
import Link from "next/link";
import GoogleLoginButton from "@/components/GoogleLoginButton";

export default function RegisterPage() {
  const [showPassword, setShowPassword] = useState(false);
  const [showConfirmPassword, setShowConfirmPassword] = useState(false);
  const [formData, setFormData] = useState({
    name: "",
    email: "",
    password: "",
    confirmPassword: "",
  });
  const [isLoading, setIsLoading] = useState(false);
  const [agreedToTerms, setAgreedToTerms] = useState(false);

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (formData.password !== formData.confirmPassword) {
      alert("Passwords don't match!");
      return;
    }
    if (!agreedToTerms) {
      alert("Please agree to the terms and conditions");
      return;
    }
    setIsLoading(true);
    // TODO: Implement register logic
    setTimeout(() => setIsLoading(false), 2000);
  };

  const passwordStrength = (password: string) => {
    if (password.length === 0) return 0;
    if (password.length < 6) return 1;
    if (password.length < 10) return 2;
    return 3;
  };

  const strength = passwordStrength(formData.password);
  const strengthColors = ["bg-gray-200", "bg-red-500", "bg-yellow-500", "bg-green-500"];
  const strengthLabels = ["", "Weak", "Medium", "Strong"];

  return (
    <div className="flex min-h-screen bg-white">
      {/* Left Side - Image/Illustration */}
      <div className="relative hidden lg:block lg:w-1/2">
        <div className="absolute inset-0 bg-gradient-to-br from-blue-600 via-purple-500 to-purple-600">
          {/* Animated Background Pattern */}
          <div className="absolute inset-0 opacity-20">
            <div className="absolute top-20 right-20 size-72 animate-pulse rounded-full bg-white blur-[64px]"></div>
            <div className="absolute bottom-20 left-20 size-96 animate-pulse rounded-full bg-white blur-[64px] [animation-delay:1.5s]"></div>
          </div>
          
          {/* Content */}
          <div className="relative flex h-full flex-col items-center justify-center p-12 text-white">
            <div className="mb-8 rounded-full bg-white/10 p-6 backdrop-blur-sm">
              <ShoppingBag className="size-24" />
            </div>
            <h2 className="mb-6 text-center text-4xl font-bold">Join Our Community</h2>
            <p className="mb-12 max-w-md text-center text-lg text-purple-100">
              Create an account and unlock exclusive benefits
            </p>
            
            {/* Benefits List */}
            <div className="w-full max-w-md space-y-4">
              <div className="flex items-center gap-4 rounded-2xl bg-white/10 p-4 backdrop-blur-sm">
                <div className="rounded-full bg-white/20 p-2">
                  <CheckCircle className="size-6" />
                </div>
                <div>
                  <div className="font-semibold">Exclusive Deals</div>
                  <div className="text-sm text-purple-100">Get access to member-only discounts</div>
                </div>
              </div>
              <div className="flex items-center gap-4 rounded-2xl bg-white/10 p-4 backdrop-blur-sm">
                <div className="rounded-full bg-white/20 p-2">
                  <CheckCircle className="size-6" />
                </div>
                <div>
                  <div className="font-semibold">Fast Checkout</div>
                  <div className="text-sm text-purple-100">Save your info for quicker purchases</div>
                </div>
              </div>
              <div className="flex items-center gap-4 rounded-2xl bg-white/10 p-4 backdrop-blur-sm">
                <div className="rounded-full bg-white/20 p-2">
                  <CheckCircle className="size-6" />
                </div>
                <div>
                  <div className="font-semibold">Order Tracking</div>
                  <div className="text-sm text-purple-100">Track your orders in real-time</div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* Right Side - Form */}
      <div className="flex w-full flex-col justify-center bg-white px-4 py-12 sm:px-6 lg:w-1/2 lg:px-20 xl:px-24">
        <div className="mx-auto w-full max-w-sm">
          {/* Logo */}
          <Link href="/" className="mb-8 flex items-center gap-2">
            <div className="rounded-full bg-gradient-to-r from-purple-600 to-blue-600 p-2">
              <ShoppingBag className="size-6 text-white" />
            </div>
            <span className="text-2xl font-bold text-gray-900">ShopHub</span>
          </Link>

          {/* Header */}
          <div className="mb-8">
            <h2 className="text-3xl font-bold text-gray-900">Create Account</h2>
            <p className="mt-2 text-gray-600">
              Sign up to start your shopping journey
            </p>
          </div>

          {/* Form */}
          <form onSubmit={handleSubmit} className="space-y-5">
            {/* Name Input */}
            <div>
              <label htmlFor="name" className="mb-2 block text-sm font-medium text-gray-700">
                Full Name
              </label>
              <div className="relative">
                <div className="pointer-events-none absolute inset-y-0 left-0 flex items-center pl-4">
                  <User className="size-5 text-gray-400" />
                </div>
                <input
                  id="name"
                  name="name"
                  type="text"
                  value={formData.name}
                  onChange={handleChange}
                  required
                  placeholder="Enter your full name"
                  className="w-full rounded-xl border-2 border-gray-300 bg-white py-3 pl-12 pr-4 text-gray-900 placeholder:text-gray-400 outline-none transition-all focus:border-purple-600 focus:ring-[4px] focus:ring-purple-100"
                />
              </div>
            </div>

            {/* Email Input */}
            <div>
              <label htmlFor="email" className="mb-2 block text-sm font-medium text-gray-700">
                Email Address
              </label>
              <div className="relative">
                <div className="pointer-events-none absolute inset-y-0 left-0 flex items-center pl-4">
                  <Mail className="size-5 text-gray-400" />
                </div>
                <input
                  id="email"
                  name="email"
                  type="email"
                  value={formData.email}
                  onChange={handleChange}
                  required
                  placeholder="Enter your email"
                  className="w-full rounded-xl border-2 border-gray-300 bg-white py-3 pl-12 pr-4 text-gray-900 placeholder:text-gray-400 outline-none transition-all focus:border-purple-600 focus:ring-[4px] focus:ring-purple-100"
                />
              </div>
            </div>

            {/* Password Input */}
            <div>
              <label htmlFor="password" className="mb-2 block text-sm font-medium text-gray-700">
                Password
              </label>
              <div className="relative">
                <div className="pointer-events-none absolute inset-y-0 left-0 flex items-center pl-4">
                  <Lock className="size-5 text-gray-400" />
                </div>
                <input
                  id="password"
                  name="password"
                  type={showPassword ? "text" : "password"}
                  value={formData.password}
                  onChange={handleChange}
                  required
                  placeholder="Create a password"
                  className="w-full rounded-xl border-2 border-gray-300 bg-white py-3 pl-12 pr-12 text-gray-900 placeholder:text-gray-400 outline-none transition-all focus:border-purple-600 focus:ring-[4px] focus:ring-purple-100"
                />
                <button
                  type="button"
                  onClick={() => setShowPassword(!showPassword)}
                  className="absolute inset-y-0 right-0 flex items-center pr-4 text-gray-400 hover:text-gray-600"
                >
                  {showPassword ? (
                    <EyeOff className="size-5" />
                  ) : (
                    <Eye className="size-5" />
                  )}
                </button>
              </div>
              
              {/* Password Strength Indicator */}
              {formData.password && (
                <div className="mt-2">
                  <div className="flex gap-1">
                    {[1, 2, 3].map((level) => (
                      <div
                        key={level}
                        className={`h-1 flex-1 rounded-full transition-all ${
                          level <= strength ? strengthColors[strength] : "bg-gray-200"
                        }`}
                      />
                    ))}
                  </div>
                  {strength > 0 && (
                    <p className="mt-1 text-xs text-gray-600">
                      Password strength: <span className="font-semibold">{strengthLabels[strength]}</span>
                    </p>
                  )}
                </div>
              )}
            </div>

            {/* Confirm Password Input */}
            <div>
              <label htmlFor="confirmPassword" className="mb-2 block text-sm font-medium text-gray-700">
                Confirm Password
              </label>
              <div className="relative">
                <div className="pointer-events-none absolute inset-y-0 left-0 flex items-center pl-4">
                  <Lock className="size-5 text-gray-400" />
                </div>
                <input
                  id="confirmPassword"
                  name="confirmPassword"
                  type={showConfirmPassword ? "text" : "password"}
                  value={formData.confirmPassword}
                  onChange={handleChange}
                  required
                  placeholder="Confirm your password"
                  className="w-full rounded-xl border-2 border-gray-300 bg-white py-3 pl-12 pr-12 text-gray-900 placeholder:text-gray-400 outline-none transition-all focus:border-purple-600 focus:ring-[4px] focus:ring-purple-100"
                />
                <button
                  type="button"
                  onClick={() => setShowConfirmPassword(!showConfirmPassword)}
                  className="absolute inset-y-0 right-0 flex items-center pr-4 text-gray-400 hover:text-gray-600"
                >
                  {showConfirmPassword ? (
                    <EyeOff className="size-5" />
                  ) : (
                    <Eye className="size-5" />
                  )}
                </button>
              </div>
              {formData.confirmPassword && formData.password !== formData.confirmPassword && (
                <p className="mt-1 text-xs text-red-600">Passwords do not match</p>
              )}
            </div>

            {/* Terms and Conditions */}
            <div>
              <label className="flex items-start">
                <input
                  type="checkbox"
                  checked={agreedToTerms}
                  onChange={(e) => setAgreedToTerms(e.target.checked)}
                  className="mt-1 size-4 rounded border-gray-300 text-purple-600 focus:ring-[2px] focus:ring-purple-500"
                />
                <span className="ml-2 text-sm text-gray-700">
                  I agree to the{" "}
                  <Link href="/terms" className="font-semibold text-purple-600 hover:text-purple-700">
                    Terms and Conditions
                  </Link>{" "}
                  and{" "}
                  <Link href="/privacy" className="font-semibold text-purple-600 hover:text-purple-700">
                    Privacy Policy
                  </Link>
                </span>
              </label>
            </div>

            {/* Submit Button */}
            <button
              type="submit"
              disabled={isLoading || !agreedToTerms}
              className="group relative w-full overflow-hidden rounded-xl bg-gradient-to-r from-purple-600 to-blue-600 py-3 font-semibold text-white shadow-lg transition-all hover:from-purple-700 hover:to-blue-700 hover:shadow-xl disabled:opacity-50 disabled:cursor-not-allowed"
            >
              <span className="relative flex items-center justify-center gap-2">
                {isLoading ? (
                  <>
                    <div className="size-5 animate-spin rounded-full border-2 border-white border-t-transparent"></div>
                    Creating account...
                  </>
                ) : (
                  <>
                    Create Account
                    <ArrowRight className="size-5 transition-transform group-hover:translate-x-1" />
                  </>
                )}
              </span>
            </button>
          </form>

          {/* Divider */}
          <div className="relative my-8">
            <div className="absolute inset-0 flex items-center">
              <div className="w-full border-t border-gray-300"></div>
            </div>
            <div className="relative flex justify-center text-sm">
              <span className="bg-white px-4 text-gray-500">Or sign up with</span>
            </div>
          </div>

          {/* Google Sign Up */}
          <GoogleLoginButton />

          {/* Sign In Link */}
          <p className="mt-8 text-center text-sm text-gray-600">
            Already have an account?{" "}
            <Link href="/login" className="font-semibold text-purple-600 hover:text-purple-700">
              Sign in
            </Link>
          </p>
        </div>
      </div>
    </div>
  );
}