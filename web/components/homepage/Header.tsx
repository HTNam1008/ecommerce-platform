"use client";

import Link from "next/link";
import Image from "next/image";
import { useAuthStore } from "@/store/authStore";
import { useCurrentCart } from "@/store/cartStore";
import { Container, Heart, LogIn, ShoppingBag, ShoppingCart } from "lucide-react";
import SearchBarHeader from "./SearchBar.Header";

export default function Header() {
  const user = useAuthStore((state) => state.user);
  const cart = useCurrentCart();

  return (
    <header className="bg-white h-16 sticky top-0 z-50 border-b shadow-sm">
      <nav aria-label="Global" className="flex items-center justify-between h-full">
        <div className="flex items-center lg:flex-1 ml-8">
          <Link href="/" className="flex items-center gap-2">
            <div className="rounded-full bg-gradient-to-r from-purple-600 to-blue-600 p-2">
              <ShoppingBag className="size-6 text-white" />
            </div>
            <span className="text-2xl font-bold text-gray-900">ShopHub</span>
          </Link>
          <SearchBarHeader />
        </div>

        <div className="flex flex-1 items-center justify-end space-x-6 mr-8">
          <a href="/order" className="flex items-center justify-center text-black text-sm font-semibold">
            <Container className="mr-2" /> Orders
          </a>
          <a href="/favourite" className="flex items-center justify-center text-black text-sm font-semibold">
            <Heart className="mr-2" /> Favourites
          </a>
          <div className="flex items-center justify-center text-black text-sm font-semibold">
            <Link href="/cart" className="relative flex items-center">
              <ShoppingCart className="mr-2" />
              {cart.length > 0 && (
                <span className="absolute -top-2 left-4 bg-red-500 text-white text-xs rounded-full px-1">
                  {cart.length}
                </span>
              )}
              <span>Cart</span>
            </Link>
          </div>
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
              <span className="text-sm font-medium font-semibold text-black">{user.name}</span>
              {/* <LogoutButton /> */}
            </div>
          ) : (
            <a href="/login" className="flex items-center justify-center text-black text-sm font-semibold">
              <LogIn className="mr-2" /> Login
            </a>
          )}
        </div>
      </nav>

    </header>
  )
  // const user = useAuthStore((state) => state.user);
  // const cart = useCurrentCart();
  // return (
  //   <header className="w-full border-b bg-white">
  //     <div className="max-w-6xl mx-auto flex items-center justify-between p-4">
  //       {/* Left: Logo */}
  //       <Link href="/" className="text-xl font-bold">
  //         E-Commerce
  //       </Link>

  //       {/* Right */}
  //       <div className="flex items-center gap-4">
  //         {/* Cart */}
  //         <Link href="/cart" className="relative">
  //           🛒
  //           {cart.length > 0 && (
  //             <span className="absolute -top-2 -right-2 bg-red-500 text-white text-xs rounded-full px-1">
  //               {cart.length}
  //             </span>
  //           )}
  //         </Link>

  //         {/* Auth */}
  //         {user ? (
  //           <div className="flex items-center gap-2">
  //             {user.avatar && (
  //               <Image
  //                 src={user.avatar}
  //                 alt={user.name}
  //                 width={32}
  //                 height={32}
  //                 className="rounded-full"
  //               />
  //             )}
  //             <span className="text-sm font-medium">{user.name}</span>
  //             <LogoutButton />
  //           </div>
  //         ) : (
  //           <GoogleLoginButton />
  //         )}
  //       </div>
  //     </div>
  //   </header>
  // );
}
