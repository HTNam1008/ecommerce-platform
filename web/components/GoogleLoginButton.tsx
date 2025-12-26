"use client";

import { googleLogin } from "@/lib/api";
import { useAuthStore } from "@/store/authStore";
import { GoogleLogin } from "@react-oauth/google";

export default function GoogleLoginButton() {
    const login = useAuthStore((state) => state.login);

    const handleSuccess = async (credentialResponse: any) => {
        if (!credentialResponse.credential) {
            console.error("Google login failed: No credential");
            return;
        }
        const res = await googleLogin(credentialResponse.credential);

        const data = await res.json();
        login(data.user);
    };
    
    return <GoogleLogin onSuccess={handleSuccess}></GoogleLogin>
};