"use client";

import Link from "next/link";
import Image from "next/image";
import { useAuthStore } from "@/store/authStore";
import GoogleLoginButton from "./GoogleLoginButton";
import LogoutButton from "./LogoutButton";
import { useCartStore } from "@/store/cartStore";

export default function Header() {
  const user = useAuthStore((state) => state.user);
  const cartItems = useCartStore((state) => state.items);

  return (
    <header className="w-full border-b bg-white">
      <div className="max-w-6xl mx-auto flex items-center justify-between p-4">
        {/* Left: Logo */}
        <Link href="/" className="text-xl font-bold">
          E-Commerce
        </Link>

        {/* Right */}
        <div className="flex items-center gap-4">
          {/* Cart */}
          <Link href="/cart" className="relative">
            🛒
            {cartItems.length > 0 && (
              <span className="absolute -top-2 -right-2 bg-red-500 text-white text-xs rounded-full px-1">
                {cartItems.length}
              </span>
            )}
          </Link>

          {/* Auth */}
          {user ? (
            <div className="flex items-center gap-2">
              {user.avatar && (
                <Image
                  src={user.avatar}
                  alt={user.name}
                  width={32}
                  height={32}
                  className="rounded-full"
                />
              )}
              <span className="text-sm font-medium">{user.name}</span>
              <LogoutButton />
            </div>
          ) : (
            <GoogleLoginButton />
          )}
        </div>
      </div>
    </header>
  );
}
