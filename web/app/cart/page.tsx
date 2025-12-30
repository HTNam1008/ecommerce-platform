// "use client"

// import CheckoutButton from "@/components/CheckoutButton";
// import { useAuthStore } from "@/store/authStore";
// import { useCartStore, useCartTotal, useCurrentCart } from "@/store/cartStore";

// export default function CartPage() {
//     const { removeItem, updateQuantity, clearCart } = useCartStore();
//     const items = useCurrentCart();
//     const total = useCartTotal();
//     let userId = useAuthStore(state => state.user?._id);

//     if (!userId) {
//         userId = 'guest';
//     }

//     return (
//         <div>
//             {items.map(item => (
//                 <div key={item._id}>
//                     <h3>{item.name}</h3>
//                     <p>{item.price} x {item.quantity}</p>

//                     <input
//                         type="number"
//                         value={item.quantity}
//                         min={1}
//                         onChange={e => updateQuantity(userId, item._id, Number(e.target.value))}
//                     />

//                     <button onClick={() => removeItem(userId, item._id)}>
//                         Remove
//                     </button>

//                     <button onClick={() => clearCart(userId)}>
//                         Clear Cart
//                     </button>
//                 </div>
//             ))}
//             <h2>Total: ${total}</h2>
//             <CheckoutButton />
//         </div>
//     )
// }

"use client"

import CheckoutButton from "@/components/CheckoutButton";
import { useAuthStore } from "@/store/authStore";
import { useCartStore, useCartTotal, useCurrentCart } from "@/store/cartStore";
import { ShoppingCart, Trash2, Plus, Minus, ArrowLeft, Tag, Package } from "lucide-react";
import Image from "next/image";
import Link from "next/link";

export default function CartPage() {
    const { removeItem, updateQuantity, clearCart } = useCartStore();
    const items = useCurrentCart();
    const total = useCartTotal();
    let userId = useAuthStore(state => state.user?._id);

    if (!userId) {
        userId = 'guest';
    }

    const handleQuantityChange = (itemId: string, newQuantity: number) => {
        if (newQuantity >= 1) {
            updateQuantity(userId, itemId, newQuantity);
        }
    };

    // Calculate savings
    const subtotal = total;
    const shipping = subtotal > 50 ? 0 : 5.99;
    const discount = 0; // Can be calculated based on promo codes
    const finalTotal = subtotal + shipping - discount;

    if (items.length === 0) {
        return (
            <div className="min-h-screen bg-gray-50 py-12">
                <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
                    <div className="rounded-2xl bg-white p-12 text-center shadow-sm">
                        <ShoppingCart className="mx-auto h-24 w-24 text-gray-400" />
                        <h2 className="mt-6 text-2xl font-bold text-gray-900">Your cart is empty</h2>
                        <p className="mt-2 text-gray-600">
                            Looks like you haven't added anything to your cart yet.
                        </p>
                        <Link href="/">
                            <button className="mt-8 inline-flex items-center gap-2 rounded-full bg-gradient-to-r from-purple-600 to-blue-600 px-8 py-4 font-semibold text-white transition-all hover:from-purple-700 hover:to-blue-700 hover:shadow-lg">
                                <ArrowLeft className="h-5 w-5" />
                                Continue Shopping
                            </button>
                        </Link>
                    </div>
                </div>
            </div>
        );
    }

    return (
        <div className="min-h-screen bg-gray-50 py-8">
            <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
                {/* Header */}
                <div className="mb-8">
                    <Link href="/" className="inline-flex items-center gap-2 text-gray-600 hover:text-purple-600 transition-colors mb-4">
                        <ArrowLeft className="h-4 w-4" />
                        Continue Shopping
                    </Link>
                    <div className="flex items-center justify-between">
                        <div>
                            <h1 className="text-3xl font-bold text-gray-900">Shopping Cart</h1>
                            <p className="mt-2 text-gray-600">{items.length} {items.length === 1 ? 'item' : 'items'} in your cart</p>
                        </div>
                        {items.length > 0 && (
                            <button
                                onClick={() => clearCart(userId)}
                                className="flex items-center gap-2 rounded-full border-2 border-red-200 bg-red-50 px-4 py-2 text-sm font-semibold text-red-600 transition-all hover:border-red-300 hover:bg-red-100"
                            >
                                <Trash2 className="h-4 w-4" />
                                Clear Cart
                            </button>
                        )}
                    </div>
                </div>

                <div className="grid grid-cols-1 gap-8 lg:grid-cols-3">
                    {/* Cart Items */}
                    <div className="lg:col-span-2 space-y-4">
                        {items.map(item => (
                            <div
                                key={item._id}
                                className="group overflow-hidden rounded-2xl bg-white shadow-sm transition-all hover:shadow-md"
                            >
                                <div className="flex gap-6 p-6">
                                    {/* Product Image */}
                                    <div className="relative h-32 w-32 flex-shrink-0 overflow-hidden rounded-xl bg-gray-100">
                                        {item.image ? (
                                            <Image
                                                src={item.image}
                                                alt={item.name}
                                                fill
                                                className="object-cover"
                                            />
                                        ) : (
                                            <div className="flex h-full w-full items-center justify-center">
                                                <Package className="h-12 w-12 text-gray-400" />
                                            </div>
                                        )}
                                    </div>

                                    {/* Product Details */}
                                    <div className="flex flex-1 flex-col justify-between">
                                        <div>
                                            <div className="flex items-start justify-between">
                                                <div>
                                                    <h3 className="text-lg font-semibold text-gray-900 group-hover:text-purple-600 transition-colors">
                                                        {item.name}
                                                    </h3>
                                                    {/* {item.category && (
                                                        <span className="mt-1 inline-block rounded-full bg-gray-100 px-3 py-1 text-xs font-medium text-gray-600">
                                                            {item.category}
                                                        </span>
                                                    )} */}
                                                </div>
                                                <button
                                                    onClick={() => removeItem(userId, item._id)}
                                                    className="rounded-full p-2 text-gray-400 transition-all hover:bg-red-50 hover:text-red-600"
                                                    title="Remove item"
                                                >
                                                    <Trash2 className="h-5 w-5" />
                                                </button>
                                            </div>
                                            
                                            <div className="mt-2 flex items-center gap-2">
                                                <span className="text-2xl font-bold text-purple-600">
                                                    ${item.price.toFixed(2)}
                                                </span>
                                                <span className="text-sm text-gray-500">per item</span>
                                            </div>
                                        </div>

                                        {/* Quantity Controls */}
                                        <div className="mt-4 flex items-center justify-between">
                                            <div className="flex items-center gap-3">
                                                <span className="text-sm font-medium text-gray-700">Quantity:</span>
                                                <div className="flex items-center rounded-lg border-2 border-gray-300">
                                                    <button
                                                        onClick={() => handleQuantityChange(item._id, item.quantity - 1)}
                                                        disabled={item.quantity <= 1}
                                                        className="p-2 text-gray-600 transition-colors hover:bg-gray-100 disabled:cursor-not-allowed disabled:opacity-50"
                                                    >
                                                        <Minus className="h-4 w-4" />
                                                    </button>
                                                    <input
                                                        type="number"
                                                        value={item.quantity}
                                                        onChange={(e) => handleQuantityChange(item._id, Number(e.target.value))}
                                                        min={1}
                                                        className="w-16 border-x-2 border-gray-300 bg-transparent px-4 py-2 text-center font-semibold text-gray-900 outline-none"
                                                    />
                                                    <button
                                                        onClick={() => handleQuantityChange(item._id, item.quantity + 1)}
                                                        className="p-2 text-gray-600 transition-colors hover:bg-gray-100"
                                                    >
                                                        <Plus className="h-4 w-4" />
                                                    </button>
                                                </div>
                                            </div>

                                            {/* Item Subtotal */}
                                            <div className="text-right">
                                                <p className="text-sm text-gray-600">Subtotal</p>
                                                <p className="text-xl font-bold text-gray-900">
                                                    ${(item.price * item.quantity).toFixed(2)}
                                                </p>
                                            </div>
                                        </div>
                                    </div>
                                </div>
                            </div>
                        ))}
                    </div>

                    {/* Order Summary */}
                    <div className="lg:col-span-1">
                        <div className="sticky top-24 space-y-4">
                            {/* Summary Card */}
                            <div className="rounded-2xl bg-white p-6 shadow-sm">
                                <h2 className="text-xl font-bold text-gray-900">Order Summary</h2>
                                
                                <div className="mt-6 space-y-4">
                                    <div className="flex items-center justify-between text-gray-600">
                                        <span>Subtotal ({items.length} items)</span>
                                        <span className="font-semibold text-gray-900">${subtotal.toFixed(2)}</span>
                                    </div>
                                    
                                    <div className="flex items-center justify-between text-gray-600">
                                        <span>Shipping</span>
                                        <span className={`font-semibold ${shipping === 0 ? 'text-green-600' : 'text-gray-900'}`}>
                                            {shipping === 0 ? 'FREE' : `$${shipping.toFixed(2)}`}
                                        </span>
                                    </div>

                                    {discount > 0 && (
                                        <div className="flex items-center justify-between text-green-600">
                                            <span>Discount</span>
                                            <span className="font-semibold">-${discount.toFixed(2)}</span>
                                        </div>
                                    )}

                                    {shipping > 0 && (
                                        <div className="rounded-lg bg-purple-50 p-3">
                                            <p className="text-sm text-purple-700">
                                                🎉 Add <span className="font-bold">${(50 - subtotal).toFixed(2)}</span> more to get FREE shipping!
                                            </p>
                                        </div>
                                    )}

                                    <div className="border-t-2 border-gray-200 pt-4">
                                        <div className="flex items-center justify-between">
                                            <span className="text-lg font-bold text-gray-900">Total</span>
                                            <span className="text-2xl font-bold text-purple-600">${finalTotal.toFixed(2)}</span>
                                        </div>
                                    </div>
                                </div>

                                <div className="mt-6">
                                    <CheckoutButton />
                                </div>

                                <p className="mt-4 text-center text-xs text-gray-500">
                                    Tax included and shipping calculated at checkout
                                </p>
                            </div>

                            {/* Promo Code */}
                            <div className="rounded-2xl bg-white p-6 shadow-sm">
                                <div className="flex items-center gap-2 mb-4">
                                    <Tag className="h-5 w-5 text-purple-600" />
                                    <h3 className="font-semibold text-gray-900">Have a promo code?</h3>
                                </div>
                                <div className="flex gap-2">
                                    <input
                                        type="text"
                                        placeholder="Enter code"
                                        className="flex-1 rounded-lg border-2 border-gray-300 px-4 py-2 outline-none focus:border-purple-600"
                                    />
                                    <button className="rounded-lg bg-gray-900 px-6 py-2 font-semibold text-white transition-all hover:bg-gray-800">
                                        Apply
                                    </button>
                                </div>
                            </div>

                            {/* Trust Badges */}
                            <div className="rounded-2xl bg-gradient-to-br from-purple-50 to-blue-50 p-6">
                                <div className="space-y-3 text-sm">
                                    <div className="flex items-center gap-2 text-gray-700">
                                        <div className="h-2 w-2 rounded-full bg-green-500"></div>
                                        <span>Secure checkout</span>
                                    </div>
                                    <div className="flex items-center gap-2 text-gray-700">
                                        <div className="h-2 w-2 rounded-full bg-green-500"></div>
                                        <span>Free returns within 30 days</span>
                                    </div>
                                    <div className="flex items-center gap-2 text-gray-700">
                                        <div className="h-2 w-2 rounded-full bg-green-500"></div>
                                        <span>Customer support 24/7</span>
                                    </div>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    );
}