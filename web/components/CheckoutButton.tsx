"use client";

import { checkout } from "@/lib/api";
import { useAuthStore } from "@/store/authStore";
import { useCurrentCart } from "@/store/cartStore";

export default function CheckoutButton() {
    const items = useCurrentCart();
    const token = useAuthStore(state => state.token);

    const handleCheckout = async () => {
        const url = await checkout(items, token);
        if (!url) {
            console.error("Checkout error:", url);
            alert("Checkout failed. Please try again.");
            return;
        }
        window.location.href = url;
    }

    return (
        <button
            onClick={handleCheckout}
            className="bg-green-600 text-white px-6 py-2 rounded"
        >
            Checkout
        </button>
    );
}