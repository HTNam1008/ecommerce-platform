import express from "express";
import cors from "cors";
import router from "./routes/product.route";
import checkoutRouter from "./routes/checkout";

const app = express();
app.use(cors());
app.use(express.json());

app.use("/api/products", router);
app.use("/api/checkout", checkoutRouter);

export default app;