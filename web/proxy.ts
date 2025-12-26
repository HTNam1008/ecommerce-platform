import { jwtVerify } from "jose";
import { NextRequest, NextResponse } from "next/server";

export async function proxy(req: NextRequest) {
  console.log("proxy triggered for:", req.nextUrl.pathname);
  const accessToken = req.cookies.get("accessToken")?.value;
  const refreshToken = req.cookies.get("refreshToken")?.value;

  const protectedPaths = ["/order", "/checkout"];
  const isProtected = protectedPaths.some((path) =>
    req.nextUrl.pathname.startsWith(path)
  );

  if (!isProtected) {
    return NextResponse.next();
  }

  if (!accessToken && !refreshToken) {
    return NextResponse.redirect(new URL("/login", req.url));
  }

  if (accessToken) {
    try {
      await jwtVerify(
        accessToken,
        new TextEncoder().encode(process.env.JWT_ACCESS_SECRET)
      );
      return NextResponse.next();
    } catch (error) {
      console.log("Access token verification failed:", error);
    }
  }

  if (refreshToken) {
    try {
      const refreshRes = await fetch(
        `${process.env.NEXT_PUBLIC_API_URL}/api/auth/refresh-token`,
        {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
          },
          body: JSON.stringify({ refreshToken }),
        }
      );

      if (refreshRes.ok) {
        const { accessToken: newAccessToken } = await refreshRes.json();
        console.log("Obtained new access token via refresh token", newAccessToken);
        const response = NextResponse.next();

        response.cookies.set("accessToken", newAccessToken, {
          httpOnly: true,
          secure: process.env.NODE_ENV === "production",
          sameSite: "lax",
        });

        return response;
      }
    } catch (error) {
      console.log("Refresh token verification failed:", error);
    }
  }

  const response = NextResponse.redirect(new URL("/", req.url));
  response.cookies.delete("accessToken");
  response.cookies.delete("refreshToken");
  return response;
}

export const config = {
  matcher: ["/order/:path*", "/checkout/:path*"],
};
