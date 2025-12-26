import { Product } from "./product.interface";

export interface Order {
    _id: string;
    items: Product[];
    totalAmount: number;
    currency: string;
    status: "pending" | "paid" | "cancelled";
    createdAt: string;
    updatedAt: string;
    stripeSessionId?: string;
}