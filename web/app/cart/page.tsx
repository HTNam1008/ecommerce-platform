"use client"

import { useCartStore, useCartTotal } from "@/store/cartStore";

export default function CartPage() {
    const { items, removeItem, updateQuantity, clearCart } = useCartStore();
    const total = useCartTotal();

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
                        onChange={e => updateQuantity(item._id, Number(e.target.value))}
                    />

                    <button onClick={() => removeItem(item._id)}>
                        Remove
                    </button>

                    <button onClick={() => clearCart()}>
                        Clear Cart
                    </button>
                </div>
            ))}
            <h2>Total: ${total}</h2>

        </div>
    )
}