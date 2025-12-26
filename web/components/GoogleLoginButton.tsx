"use client";

import { loginWithGoogle } from "@/app/actions/auth";
import { useAuthStore } from "@/store/authStore";
import { GoogleLogin } from "@react-oauth/google";
import { useRouter } from "next/navigation";

export default function GoogleLoginButton() {
    const login = useAuthStore((state) => state.login);
    const router = useRouter();
    
    const handleSuccess = async (credentialResponse: any) => {
        if (!credentialResponse.credential) {
            console.error("Google login failed: No credential");
            return;
        }

        try {
            const { user } = await loginWithGoogle(credentialResponse.credential);
            login(user);
            router.push("/");
        } catch (error) {
            console.error("Google login failed:", error);
            alert("Google login failed. Please try again.");
        }   
    };

    return <GoogleLogin onSuccess={handleSuccess}></GoogleLogin>
};