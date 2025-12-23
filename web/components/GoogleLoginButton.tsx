"use client";

import { useAuthStore } from "@/store/authStore";
import { GoogleLogin } from "@react-oauth/google";

export default function GoogleLoginButton() {
    const login = useAuthStore((state) => state.login);

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
        login(data.user, data.token);
    };
    return <GoogleLogin onSuccess={handleSuccess}></GoogleLogin>
};