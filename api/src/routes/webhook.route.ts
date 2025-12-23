import express from 'express';
import { webhookController } from '../controller/webhook.controller';

const webhookRouter = express.Router();
webhookRouter.post("/",express.raw({ type: "application/json" }), webhookController);

// webhookRouter.post(
//     "/",
//     express.raw({ type: "application/json" }),
//     async (req, res) => {
//         const sig = req.headers["stripe-signature"]!;

//         let event: Stripe.Event;

//         try {
//             event = stripe.webhooks.constructEvent(
//                 req.body,
//                 sig,
//                 process.env.STRIPE_WEBHOOK_SECRET!
//             );
//         } catch (err: any) {
//             return res.status(400).send(`Webhook Error: ${err.message}`);
//         }

//         if (event.type === "checkout.session.completed") {
//             const session = event.data.object as Stripe.Checkout.Session;

//             const existingOrder = await Order.findOne({
//                 paymentIntentId: session.payment_intent,
//             })

//             if (!existingOrder) {
//                 await Order.create({
//                     userId: session.metadata?.userId || null,
//                     items: JSON.parse(session.metadata?.items || "[]"),
//                     totalAmout: session.amount_total! / 100,
//                     paymentIntentId: session.payment_intent as string,
//                     status: "paid",
//                 })
//             }

//         }

//         res.json({ received: true });
//     }
// )

export default webhookRouter;
