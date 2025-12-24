import { Request, Response } from "express";
import Stripe from "stripe";
import Order from "../models/order.model";

const stripe = new Stripe(process.env.STRIPE_SECRET_KEY!);

export const webhookController = async (req: Request, res: Response) => {
    const sig = req.headers["stripe-signature"]!;

        let event: Stripe.Event;

        try {
            event = stripe.webhooks.constructEvent(
                req.body,
                sig,
                process.env.STRIPE_WEBHOOK_SECRET!
            );
        } catch (err: any) {
            return res.status(400).send(`Webhook Error: ${err.message}`);
        }

        if (event.type === "checkout.session.completed") {
            const session = event.data.object as Stripe.Checkout.Session;
            
            await Order.findOneAndUpdate(
                { stripeSessionId: session.id },
                { status: "paid" }
            )
        }

        if (event.type === "checkout.session.expired" || event.type === "checkout.session.async_payment_failed") {
            const session = event.data.object as Stripe.Checkout.Session;
            await Order.findOneAndUpdate(
                { stripeSessionId: session.id },
                { status: "failed" }
            )
        }

        res.json({ received: true });
}