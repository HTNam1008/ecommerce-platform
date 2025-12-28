import { AuthRequest } from "../middleware/auth";
import { Response } from "express";
import Order from "../models/order.model";

export const myOrderController = async (req: AuthRequest, res: Response) => {
  const userId = req.user?.id;

  const orders = await Order.find({ userId }).sort({ createdAt: -1 });
  if (!orders) {
    return res.status(404).json({ message: "No orders found for this user" });
  }

  console.log(`Fetched ${orders.length} orders for user ID: ${userId}`);

  res.json({ orders });
};
