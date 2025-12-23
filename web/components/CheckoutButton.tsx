"use client";

import { useCartStore } from "@/store/cartStore";

export default function CheckoutButton() {
    const items = useCartStore(state => state.items);

    const handleCheckout = async () => {
        const res = await fetch(
            `${process.env.NEXT_PUBLIC_API_URL}/api/checkout`,
            {
                method: "POST",
                headers: {
                    "Content-Type": "application/json",
                },
                body: JSON.stringify({ items }),
            }
        );

        const data = await res.json();
        window.location.href = data.url;
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