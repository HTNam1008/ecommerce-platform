import express from "express";
import { authMiddleware } from "../middleware/auth";
import { myOrderController } from "../controller/myOrder.controller";
import { orderDetailController } from "../controller/orderDetail.controller";

const orderRouter = express.Router();

orderRouter.get("/", authMiddleware, myOrderController);
orderRouter.get("/:id", authMiddleware, orderDetailController);

export default orderRouter;