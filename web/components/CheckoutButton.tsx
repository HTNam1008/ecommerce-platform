"use client";

import { checkout } from "@/lib/api";
import { useCurrentCart } from "@/store/cartStore";

export default function CheckoutButton() {
    const items = useCurrentCart();

    const handleCheckout = async () => {
        const url = await checkout(items);
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