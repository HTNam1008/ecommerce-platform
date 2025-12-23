"use client";

import { GoogleLogin } from "@react-oauth/google";

export default async function GoogleLoginButton() {
    const handleSuccess = async (credentialResponse: any) => {
        const res = await fetch(`${process.env.NEXT_PUBLIC_API_URL}/api/auth/google`,
            {
                method: "POST",
                headers: {
                    "Content-Type": "application/json",
                },
                body: JSON.stringify({ token: credentialResponse.credential }),
            }
        );

        const data = await res.json();

        localStorage.setItem("token", data.token);
        console.log("User info:", data.user);
    };
    return <GoogleLogin onSuccess={handleSuccess}></GoogleLogin>
};