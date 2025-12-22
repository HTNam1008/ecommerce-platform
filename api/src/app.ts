import express from "express";
import cors from "cors";
import router from "./routes/product.route";

const app = express();
app.use(cors());
app.use(express.json());

app.use("/api/products", router);

export default app;