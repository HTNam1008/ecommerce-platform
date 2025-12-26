import express from "express";
import cors from "cors";
import productRouter from "./routes/product.route";
import checkoutRouter from "./routes/checkout.route";
import webhookRouter from "./routes/webhook.route";
import authRouter from "./routes/auth.route";
import { authMiddleware } from "./middleware/auth";
import orderRouter from "./routes/order.route";
import cookieParser from "cookie-parser";

const app = express();
app.use(cors({ origin: "http://localhost:3000", credentials: true }));
app.use("/api/webhook", webhookRouter);
app.use(express.json());
app.use(cookieParser());

app.use("/api/products", productRouter);
app.use("/api/auth", authRouter);

app.use(authMiddleware);
app.use("/api/checkout", checkoutRouter);
app.use("/api/orders", orderRouter);
export default app;
