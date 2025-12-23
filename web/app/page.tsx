import GoogleLoginButton from "@/components/GoogleLoginButton";
import Link from "next/link";

export default function Home() {
  return (
    <main>
      <h1>E-commerce Platform</h1>
      <Link href="/products">
        Go to Products
      </Link>

      <GoogleLoginButton />
    </main>
  )
}