"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.orderDetailController = void 0;
const order_model_1 = __importDefault(require("../models/order.model"));
const orderDetailController = async (req, res) => {
    const userId = req.user?.id;
    const orderId = req.params.orderId;
    const order = await order_model_1.default.findOne({ _id: orderId, userId });
    if (!order) {
        return res.status(404).json({ message: "Order not found" });
    }
    res.json(order);
};
exports.orderDetailController = orderDetailController;
