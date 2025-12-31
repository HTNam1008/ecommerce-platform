"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.webhookController = void 0;
const stripe_1 = __importDefault(require("stripe"));
const order_model_1 = __importDefault(require("../models/order.model"));
const stripe = new stripe_1.default(process.env.STRIPE_SECRET_KEY);
const webhookController = async (req, res) => {
    const sig = req.headers["stripe-signature"];
    let event;
    try {
        event = stripe.webhooks.constructEvent(req.body, sig, process.env.STRIPE_WEBHOOK_SECRET);
    }
    catch (err) {
        return res.status(400).send(`Webhook Error: ${err.message}`);
    }
    if (event.type === "checkout.session.completed") {
        const session = event.data.object;
        await order_model_1.default.findOneAndUpdate({ stripeSessionId: session.id }, { status: "paid" });
    }
    if (event.type === "checkout.session.expired" || event.type === "checkout.session.async_payment_failed") {
        const session = event.data.object;
        await order_model_1.default.findOneAndUpdate({ stripeSessionId: session.id }, { status: "failed" });
    }
    res.json({ received: true });
};
exports.webhookController = webhookController;
