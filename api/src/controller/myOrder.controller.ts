import { AuthRequest } from "../middleware/auth";
import { Response } from "express";
import Order from "../models/order.model";

export const myOrderController = async (req: AuthRequest, res: Response) => {
  const userId = req.user?.id;

  const orders = await Order.find({ userId }).sort({ createdAt: -1 });

  res.json(orders);
};
