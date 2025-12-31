"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.myOrderController = void 0;
const order_model_1 = __importDefault(require("../models/order.model"));
const myOrderController = async (req, res) => {
    const userId = req.user?.id;
    const orders = await order_model_1.default.find({ userId }).sort({ createdAt: -1 });
    if (!orders) {
        return res.status(404).json({ message: "No orders found for this user" });
    }
    console.log(`Fetched ${orders.length} orders for user ID: ${userId}`);
    res.json({ orders });
};
exports.myOrderController = myOrderController;
