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

const corsOptions = {
  origin: ["http://localhost:3000", "https://app.shophub.studio"],
  credentials: true,
  methods: ["GET", "POST", "PUT", "PATCH", "DELETE", "OPTIONS"],
  allowedHeaders: ["Content-Type", "Authorization", "Cookie"],
};
app.use(cors(corsOptions));

app.use((req, res, next) => {
  console.log(`${req.method} ${req.path}`);
  console.log("Origin:", req.headers.origin);
  console.log("Cookies:", req.cookies);
  next();
});

// app.options("*", cors(corsOptions));

app.use("/api/webhook", webhookRouter);
app.use(express.json());
app.use(cookieParser());

app.use("/api/products", productRouter);
app.use("/api/auth", authRouter);

// app.use(authMiddleware);
app.use("/api/checkout", authMiddleware, checkoutRouter);
app.use("/api/orders", authMiddleware, orderRouter);
export default app;
