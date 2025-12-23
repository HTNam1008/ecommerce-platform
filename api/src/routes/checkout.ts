import express from 'express';
import Stripe from 'stripe';

const checkoutRouter= express.Router();

const stripe = new Stripe(process.env.STRIPE_SECRET_KEY!);

checkoutRouter.post("/", async (req, res) => {
    try {
        const {items} = req.body;
        console.log(items);
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
        });
        res.json({ url: session.url });
    } catch (error) {
        res.status(500).json({ message: "Stripe checkout session creation failed" });
    }
});

export default checkoutRouter;