"use server";

import { cookies } from "next/headers";

export async function loginWithGoogle(token: string) {
  console.log("Logging in with Google token:", token);

  const res = await fetch(
    `${process.env.NEXT_PUBLIC_API_URL}/api/auth/google`,
    {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({ token: token }),
    }
  );

  if (!res.ok) {
    throw new Error("Google login failed");
  }

  const { accessToken, refreshToken, user } = await res.json();
  const cookieStore = await cookies();

  cookieStore.set("accessToken", accessToken, {
    httpOnly: true,
    secure: process.env.NODE_ENV === "production",
    sameSite: "lax",
    path: "/",
  });

  cookieStore.set("refreshToken", refreshToken, {
    httpOnly: true,
    secure: process.env.NODE_ENV === "production",
    sameSite: "lax",
    path: "/",
  });

  return {user: user};
}

export async function refreshTokenAction() {
    console.log("Refreshing token...");
  const cookieStore = await cookies();
  const refreshToken = cookieStore.get("refreshToken")?.value;

  if (!refreshToken) {
    throw new Error("No refresh token found");
  }

  const res = await fetch(
    `${process.env.NEXT_PUBLIC_API_URL}/api/auth/refresh-token`,
    {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({ refreshToken }),
    }
  );

  if (!res.ok) {
    cookieStore.delete("accessToken");
    cookieStore.delete("refreshToken");
    throw new Error("Token refresh failed");
  }

  const { accessToken } = await res.json();

  cookieStore.set("accessToken", accessToken, {
    httpOnly: true,
    secure: process.env.NODE_ENV === "production",
    sameSite: "lax",
    path: "/",
  });
  console.log("Token refreshed successfully");
  return true;
}

export async function logoutAction() {
  const cookieStore = await cookies();
  cookieStore.delete("accessToken");
  cookieStore.delete("refreshToken");
}
