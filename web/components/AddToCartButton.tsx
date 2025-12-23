"use client"

import { useCartStore } from "@/store/cartStore";
import { Product } from "@/types/product";

export default function AddToCartButton({product} : {product : Product}) {
    const addItem = useCartStore(state => state.addItem);

    const handleAdd = () => {
        addItem({
            _id: product._id,
            name: product.name,
            price: product.price,
            image: product.images[0],
            quantity: 1,
        });
    };

    return (
        <button 
            onClick={handleAdd}
            className="bg-white text-black px-4 py-2 rounded">
            Add to Cart
        </button>
    );
}