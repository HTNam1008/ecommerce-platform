"use client";

import { checkout } from "@/lib/api";
import { useCurrentCart } from "@/store/cartStore";

export default function CheckoutButton() {
    const items = useCurrentCart();

    const handleCheckout = async () => {
        try {
            const url = await checkout(items);
            if (!url) {
                alert("Checkout failed. Please try again.");
                return;
            }
            window.location.href = url;
        } catch (error) {
            console.error("Checkout failed:", error);
            alert("Checkout failed. Please try again.");
        }
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