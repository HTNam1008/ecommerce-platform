import express from "express";
import cors from "cors";
import productRouter from "./routes/product.route";
import checkoutRouter from "./routes/checkout.route";
import webhookRouter from "./routes/webhook.route";
import authRouter from "./routes/auth.route";

const app = express();
app.use(cors());

app.use("/api/webhook", webhookRouter);
app.use(express.json());

app.use("/api/products", productRouter);
app.use("/api/checkout", checkoutRouter);
app.use("/api/auth", authRouter);

export default app;