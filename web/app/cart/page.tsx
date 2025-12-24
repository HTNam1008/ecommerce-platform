"use client"

import CheckoutButton from "@/components/CheckoutButton";
import { useAuthStore } from "@/store/authStore";
import { useCartStore, useCartTotal, useCurrentCart } from "@/store/cartStore";

export default function CartPage() {
    const { removeItem, updateQuantity, clearCart } = useCartStore();
    const items = useCurrentCart();
    const total = useCartTotal();
    let userId = useAuthStore(state => state.user?._id);

    if (!userId) {
        userId = 'guest';
    }

    return (
        <div>
            {items.map(item => (
                <div key={item._id}>
                    <h3>{item.name}</h3>
                    <p>{item.price} x {item.quantity}</p>

                    <input
                        type="number"
                        value={item.quantity}
                        min={1}
                        onChange={e => updateQuantity(userId, item._id, Number(e.target.value))}
                    />

                    <button onClick={() => removeItem(userId, item._id)}>
                        Remove
                    </button>

                    <button onClick={() => clearCart(userId)}>
                        Clear Cart
                    </button>
                </div>
            ))}
            <h2>Total: ${total}</h2>
            <CheckoutButton />
        </div>
    )
}