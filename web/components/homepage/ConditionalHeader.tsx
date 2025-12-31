"use client";

import { usePathname } from "next/navigation";
import Header from "./Header";

export default function ConditionalHeader() {
  const pathname = usePathname();
  
  // Ẩn header ở các trang login và register
  const hideHeader = pathname === "/login" || pathname === "/register";

  if (hideHeader) {
    return null;
  }

  return <Header />;
}