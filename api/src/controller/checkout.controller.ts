import { Request, Response } from "express";
import Stripe from "stripe";

const stripe = new Stripe(process.env.STRIPE_SECRET_KEY!);

export const checkoutController = async (req: Request, res: Response) => {
    try {
        const {items, userId} = req.body;

        // const totalAmount = items.reduce(
        //     (sum: number, item: any) => sum + item.price * item.quantity,
        // );

        const lineItems = items.map((item: any) => ({
            price_data: {
                currency: "usd",
                product_data: {
                    name: item.name,
                    images: [item.image],
                },
                unit_amount: item.price * 100,
            },
            quantity: item.quantity,
        }));

        const session = await stripe.checkout.sessions.create({
            payment_method_types: ["card"],
            line_items: lineItems,
            mode: "payment",
            success_url: `${process.env.CLIENT_URL}/checkout/success`,
            cancel_url: `${process.env.CLIENT_URL}/cart`,
             metadata: {
                userId: userId ?? "",
                items: JSON.stringify(items),
            },
        });

        res.json({ url: session.url });
    } catch (error) {
        res.status(500).json({ message: "Stripe checkout session creation failed" });
    }
}