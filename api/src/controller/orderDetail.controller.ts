import { AuthRequest } from "../middleware/auth";
import { Response } from "express";
import Order from "../models/order.model";

export const orderDetailController = async (
  req: AuthRequest,
  res: Response
) => {
  const userId = req.user?.id;
  const orderId = req.params.orderId;

  const order = await Order.findOne({ _id: orderId, userId });

  if (!order) {
    return res.status(404).json({ message: "Order not found" });
  }
  res.json(order);
};
