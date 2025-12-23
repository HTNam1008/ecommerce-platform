import { Router } from "express";
import { getProducts } from "../controller/product.controller";

const productRouter = Router();

productRouter.get("/", getProducts);

export default productRouter;