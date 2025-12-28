export interface Order {
    _id: string;
    items: Item[];
    totalAmount: number;
    currency: string;
    status: "pending" | "paid" | "cancelled";
    createdAt: string;
    updatedAt: string;
    stripeSessionId?: string;
}

export interface Item {
    productId: string;
    name: string;
    price: number;
    quantity: number;
    _id: string;
}