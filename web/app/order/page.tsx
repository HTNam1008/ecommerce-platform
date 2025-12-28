"use client"

import { getMyOrders } from "@/lib/api";
import { useAuthStore } from "@/store/authStore";
import { Order } from "@/types/order.interface";
import { useEffect, useState } from "react";

export default function OrderHistoryPage() {
    const [orders, setOrders] = useState<Order[]>([]);

    useEffect(() => {
        getMyOrders().then((data) => {
            setOrders(data.orders);
        });
    }, [])

    return (
        <div>
            <h1 className="text-2xl font-bold mb-4">My Orders</h1>
            {orders.length === 0 ? (
                <p>You have no orders.</p>  
            ) : (
                <ul>
                    {orders.map((order) => (
                        <li key={order._id} className="mb-4 p-4 border rounded">
                            <p className="font-semibold">Order ID: {order._id}</p>
                            <p>Date: {new Date(order.createdAt).toLocaleDateString()}</p>
                            <p>Total: ${order.totalAmount.toFixed(2)}</p>
                            <ul className="mt-2">
                                {order.items.map((item) => (
                                    <li key={item._id} className="flex justify-between">
                                        <span>{item.name} (x{item.quantity})</span>
                                        <span>${(item.price * item.quantity).toFixed(2)}</span>
                                    </li>
                                ))}
                            </ul>
                        </li>
                    ))}
                </ul>
            )}
        </div>
    )

    
}