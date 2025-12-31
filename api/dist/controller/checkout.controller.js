"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.checkoutController = void 0;
const stripe_1 = __importDefault(require("stripe"));
const order_model_1 = __importDefault(require("../models/order.model"));
const product_model_1 = require("../models/product.model");
const stripe = new stripe_1.default(process.env.STRIPE_SECRET_KEY);
const checkoutController = async (req, res) => {
    try {
        const { items } = req.body;
        const userId = req.user?.id;
        console.log("User ID:", userId);
        if (!items || items.length === 0) {
            return res.status(400).json({ message: "No items to checkout" });
        }
        const productIds = items.map((item) => item.productId);
        const products = await product_model_1.Product.find({ _id: { $in: productIds } });
        let totalAmount = 0;
        const orderItems = items.map((item) => {
            const product = products.find((prod) => prod._id.toString() === item.productId);
            if (!product) {
                throw new Error(`Product with ID ${item.productId} not found`);
            }
            totalAmount += product.price * item.quantity;
            return {
                productId: product._id,
                name: product.name,
                price: product.price,
                quantity: item.quantity,
            };
        });
        const order = await order_model_1.default.create({
            userId,
            items: orderItems,
            totalAmount,
            status: "pending",
        });
        const session = await stripe.checkout.sessions.create({
            payment_method_types: ["card"],
            line_items: orderItems.map((item) => ({
                price_data: {
                    currency: "usd",
                    product_data: {
                        name: item.name,
                    },
                    unit_amount: Math.round(item.price * 100),
                },
                quantity: item.quantity,
            })),
            mode: "payment",
            success_url: `${process.env.CLIENT_URL}/checkout/success`,
            cancel_url: `${process.env.CLIENT_URL}/cart`,
            metadata: {
                orderId: order._id.toString(),
            },
        });
        order.stripeSessionId = session.id;
        await order.save();
        res.json({ url: session.url });
    }
    catch (error) {
        res
            .status(500)
            .json({ message: error.toString() });
    }
};
exports.checkoutController = checkoutController;
