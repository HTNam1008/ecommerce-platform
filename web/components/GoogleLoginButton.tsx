"use client";

import { googleLogin } from "@/lib/api";
import { useAuthStore } from "@/store/authStore";
import { GoogleLogin } from "@react-oauth/google";

export default function GoogleLoginButton() {
    const login = useAuthStore((state) => state.login);

    const handleSuccess = async (credentialResponse: any) => {
        const res = await googleLogin(credentialResponse.credential);

        const data = await res.json();
        login(data.user, data.token);
    };
    
    return <GoogleLogin onSuccess={handleSuccess}></GoogleLogin>
};