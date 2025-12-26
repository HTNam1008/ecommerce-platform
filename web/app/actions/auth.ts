"use server";

import { cookies } from "next/headers";

export async function loginWithGoogle(token: string) {
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

    const {accessToken, user} = await res.json();

    (await cookies()).set("accessToken", accessToken, {
        httpOnly: true,
        secure: process.env.NODE_ENV === "production",
        sameSite: "lax",
        path: "/",
    });

    return user;
}

export async function logoutAction() {
    (await cookies()).delete("accessToken");
}