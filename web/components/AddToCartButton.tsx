"use client"

import { useAuthStore } from "@/store/authStore";
import { useCartStore } from "@/store/cartStore";
import { Product } from "@/types/product.interface";
import { ShoppingBag } from "lucide-react";

export default function AddToCartButton({ product }: { product: Product }) {
    const addItem = useCartStore(state => state.addItem);
    const userId = useAuthStore(state => state.user?._id);

    const handleAdd = () => {
        addItem(
            userId ?? 'guest', {
            _id: product._id,
            name: product.name,
            price: product.price,
            image: product.images[0],
            quantity: 1,
        });
    };

    return (
        <button onClick={handleAdd} className="w-full bg-gradient-to-r from-purple-600 to-blue-600 py-3 text-sm font-semibold text-white transition-all hover:from-purple-700 hover:to-blue-700">
            <span className="flex items-center justify-center">
                <ShoppingBag className="mr-2 h-4 w-4" />
                Add to Cart
            </span>
        </button>
    );
}