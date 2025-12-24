import { Response } from "express";
import Stripe from "stripe";
import { AuthRequest } from "../middleware/auth";
import Order from "../models/order.model";
import { Product } from "../models/product.model";
import { OrderItemRequest } from "@ecommerce-platform/shared";

const stripe = new Stripe(process.env.STRIPE_SECRET_KEY!);

export const checkoutController = async (req: AuthRequest, res: Response) => {
  try {
    const { items } = req.body;
    const userId = req.user?.userId;

    if (!items || items.length === 0) {
      return res.status(400).json({ message: "No items to checkout" });
    }

    const productIds = items.map((item: OrderItemRequest) => item.productId);
    const products = await Product.find({ _id: { $in: productIds } });

    let totalAmount = 0;

    const orderItems = items.map((item: OrderItemRequest) => {
      const product = products.find(
        (prod) => prod._id.toString() === item.productId
      );

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

    const order = await Order.create({
      userId,
      items: orderItems,
      totalAmount,
      status: "pending",
    });

    const session = await stripe.checkout.sessions.create({
      payment_method_types: ["card"],
      line_items: orderItems.map(
        (item: {
          productId: string;
          name: string;
          price: number;
          quantity: number;
        }) => ({
          price_data: {
            currency: "usd",
            product_data: {
              name: item.name,
            },
            unit_amount: Math.round(item.price * 100),
          },
          quantity: item.quantity,
        })
      ),
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
  } catch (error: any) {
    res
      .status(500)
      .json({ message: error.toString() });
  }
};
