// "use client"

// import { getMyOrders } from "@/lib/api";
// import { useAuthStore } from "@/store/authStore";
// import { Order } from "@/types/order.interface";
// import { useEffect, useState } from "react";

// export default function OrderHistoryPage() {
//     const [orders, setOrders] = useState<Order[]>([]);

//     useEffect(() => {
//         getMyOrders().then((data) => {
//             setOrders(data.orders);
//         });
//     }, [])

//     return (
//         <div>
//             <h1 className="text-2xl font-bold mb-4">My Orders</h1>
//             {orders.length === 0 ? (
//                 <p>You have no orders.</p>  
//             ) : (
//                 <ul>
//                     {orders.map((order) => (
//                         <li key={order._id} className="mb-4 p-4 border rounded">
//                             <p className="font-semibold">Order ID: {order._id}</p>
//                             <p>Date: {new Date(order.createdAt).toLocaleDateString()}</p>
//                             <p>Total: ${order.totalAmount.toFixed(2)}</p>
//                             <ul className="mt-2">
//                                 {order.items.map((item) => (
//                                     <li key={item._id} className="flex justify-between">
//                                         <span>{item.name} (x{item.quantity})</span>
//                                         <span>${(item.price * item.quantity).toFixed(2)}</span>
//                                     </li>
//                                 ))}
//                             </ul>
//                         </li>
//                     ))}
//                 </ul>
//             )}
//         </div>
//     )

    
// }

"use client"

import { getMyOrders } from "@/lib/api";
import { Order } from "@/types/order.interface";
import { useEffect, useState } from "react";
import { Package, Calendar, CreditCard, Truck, CheckCircle, XCircle, Clock, ChevronRight } from "lucide-react";
import Image from "next/image";

export default function OrderHistoryPage() {
    const [orders, setOrders] = useState<Order[]>([]);
    const [loading, setLoading] = useState(true);
    const [filter, setFilter] = useState<"all" | "pending" | "paid" | "cancelled">("all");

    useEffect(() => {
        setLoading(true);
        getMyOrders().then((data) => {
            setOrders(data.orders);
            setLoading(false);
        });
    }, []);

    const getStatusConfig = (status: string) => {
        switch (status) {
            case "paid":
                return {
                    icon: <CheckCircle className="h-5 w-5" />,
                    color: "bg-green-100 text-green-700 border-green-200",
                    label: "Paid"
                };
            case "pending":
                return {
                    icon: <Clock className="h-5 w-5" />,
                    color: "bg-yellow-100 text-yellow-700 border-yellow-200",
                    label: "Pending"
                };
            case "cancelled":
                return {
                    icon: <XCircle className="h-5 w-5" />,
                    color: "bg-red-100 text-red-700 border-red-200",
                    label: "Cancelled"
                };
            default:
                return {
                    icon: <Clock className="h-5 w-5" />,
                    color: "bg-gray-100 text-gray-700 border-gray-200",
                    label: status
                };
        }
    };

    const filteredOrders = filter === "all" 
        ? orders 
        : orders.filter(order => order.status === filter);

    if (loading) {
        return (
            <div className="min-h-screen bg-gray-50 flex items-center justify-center">
                <div className="text-center">
                    <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-purple-600 mx-auto"></div>
                    <p className="mt-4 text-gray-600">Loading orders...</p>
                </div>
            </div>
        );
    }

    return (
        <div className="min-h-screen bg-gray-50 py-8">
            <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
                {/* Header */}
                <div className="mb-8">
                    <h1 className="text-3xl font-bold text-gray-900">Order History</h1>
                    <p className="mt-2 text-gray-600">Check the status of recent orders</p>
                </div>

                {/* Filter Tabs */}
                <div className="mb-6 flex gap-3 overflow-x-auto">
                    {["all", "pending", "paid", "cancelled"].map((status) => (
                        <button
                            key={status}
                            onClick={() => setFilter(status as any)}
                            className={`whitespace-nowrap rounded-full px-6 py-2.5 text-sm font-medium transition-all ${
                                filter === status
                                    ? "bg-purple-600 text-white shadow-lg"
                                    : "bg-white text-gray-700 hover:bg-gray-100"
                            }`}
                        >
                            {status.charAt(0).toUpperCase() + status.slice(1)}
                        </button>
                    ))}
                </div>

                {/* Orders List */}
                {filteredOrders.length === 0 ? (
                    <div className="rounded-2xl bg-white p-12 text-center shadow-sm">
                        <Package className="mx-auto h-16 w-16 text-gray-400" />
                        <h3 className="mt-4 text-lg font-semibold text-gray-900">No orders found</h3>
                        <p className="mt-2 text-gray-600">
                            {filter === "all" 
                                ? "You haven't placed any orders yet."
                                : `No ${filter} orders found.`}
                        </p>
                        <button className="mt-6 rounded-full bg-purple-600 px-6 py-3 font-semibold text-white transition-all hover:bg-purple-700">
                            Start Shopping
                        </button>
                    </div>
                ) : (
                    <div className="space-y-6">
                        {filteredOrders.map((order) => {
                            const statusConfig = getStatusConfig(order.status);
                            
                            return (
                                <div
                                    key={order._id}
                                    className="overflow-hidden rounded-2xl bg-white shadow-sm transition-all hover:shadow-md"
                                >
                                    {/* Order Header */}
                                    <div className="border-b border-gray-100 bg-gradient-to-r from-purple-50 to-blue-50 p-6">
                                        <div className="flex flex-wrap items-center justify-between gap-4">
                                            <div className="flex items-center gap-4">
                                                <div className="rounded-full bg-white p-3 shadow-sm">
                                                    <Package className="h-6 w-6 text-purple-600" />
                                                </div>
                                                <div>
                                                    <p className="text-sm text-gray-600">Order ID</p>
                                                    <p className="font-mono text-sm font-semibold text-gray-900">
                                                        #{order._id.slice(-8).toUpperCase()}
                                                    </p>
                                                </div>
                                            </div>

                                            <div className="flex items-center gap-6">
                                                <div className="flex items-center gap-2 text-gray-600">
                                                    <Calendar className="h-4 w-4" />
                                                    <span className="text-sm">
                                                        {new Date(order.createdAt).toLocaleDateString('en-US', {
                                                            month: 'short',
                                                            day: 'numeric',
                                                            year: 'numeric'
                                                        })}
                                                    </span>
                                                </div>

                                                <div className={`flex items-center gap-2 rounded-full border px-4 py-2 font-semibold ${statusConfig.color}`}>
                                                    {statusConfig.icon}
                                                    <span className="text-sm">{statusConfig.label}</span>
                                                </div>
                                            </div>
                                        </div>
                                    </div>

                                    {/* Order Items */}
                                    <div className="p-6">
                                        <div className="space-y-4">
                                            {order.items.map((item) => (
                                                <div
                                                    key={item._id}
                                                    className="flex items-center justify-between rounded-lg bg-gray-50 p-4 transition-colors hover:bg-gray-100"
                                                >
                                                    <div className="flex items-center gap-4">
                                                        <div className="h-16 w-16 overflow-hidden rounded-lg bg-gray-200">
                                                            {/* Placeholder for product image */}
                                                            <div className="flex h-full w-full items-center justify-center">
                                                                <Package className="h-8 w-8 text-gray-400" />
                                                            </div>
                                                        </div>
                                                        <div>
                                                            <p className="font-semibold text-gray-900">{item.name}</p>
                                                            <p className="text-sm text-gray-600">
                                                                Quantity: {item.quantity}
                                                            </p>
                                                        </div>
                                                    </div>
                                                    <div className="text-right">
                                                        <p className="font-semibold text-purple-600">
                                                            ${(item.price * item.quantity).toFixed(2)}
                                                        </p>
                                                        <p className="text-sm text-gray-600">
                                                            ${item.price.toFixed(2)} each
                                                        </p>
                                                    </div>
                                                </div>
                                            ))}
                                        </div>

                                        {/* Order Summary */}
                                        <div className="mt-6 rounded-lg border-2 border-purple-100 bg-purple-50 p-4">
                                            <div className="flex items-center justify-between">
                                                <div className="flex items-center gap-2">
                                                    <CreditCard className="h-5 w-5 text-purple-600" />
                                                    <span className="font-semibold text-gray-900">Total Amount</span>
                                                </div>
                                                <div className="text-right">
                                                    <p className="text-2xl font-bold text-purple-600">
                                                        ${order.totalAmount.toFixed(2)}
                                                    </p>
                                                    <p className="text-sm text-gray-600 uppercase">
                                                        {order.currency}
                                                    </p>
                                                </div>
                                            </div>
                                        </div>

                                        {/* Action Buttons */}
                                        <div className="mt-6 flex gap-3">
                                            <button className="flex flex-1 items-center justify-center gap-2 rounded-full border-2 border-purple-600 bg-white px-6 py-3 font-semibold text-purple-600 transition-all hover:bg-purple-50">
                                                <Truck className="h-5 w-5" />
                                                Track Order
                                            </button>
                                            <button className="flex flex-1 items-center justify-center gap-2 rounded-full bg-gradient-to-r from-purple-600 to-blue-600 px-6 py-3 font-semibold text-white transition-all hover:from-purple-700 hover:to-blue-700">
                                                View Details
                                                <ChevronRight className="h-5 w-5" />
                                            </button>
                                        </div>
                                    </div>
                                </div>
                            );
                        })}
                    </div>
                )}
            </div>
        </div>
    );
}