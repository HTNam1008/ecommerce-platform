import express from "express";
import cors from "cors";
import productRouter from "./routes/product.route";
import checkoutRouter from "./routes/checkout.route";
import webhookRouter from "./routes/webhook.route";

const app = express();
app.use(cors());

app.use("/api/webhook", webhookRouter);
app.use(express.json());

app.use("/api/products", productRouter);
app.use("/api/checkout", checkoutRouter);
export default app;