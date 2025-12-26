"use client"

import { getMyOrders } from "@/lib/api";
import { useAuthStore } from "@/store/authStore";
import { Order } from "@/types/order.interface";
import { useEffect, useState } from "react";

export default function OrderHistoryPage() {
    const [orders, setOrders] = useState<Order[]>([]);

    // useEffect(() => {
    //     getMyOrders(token).then((data) => {
    //         setOrders(data.orders);
    //     });
    // }, [])

    
}