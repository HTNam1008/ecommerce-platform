"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = __importDefault(require("express"));
const auth_1 = require("../middleware/auth");
const myOrder_controller_1 = require("../controller/myOrder.controller");
const orderDetail_controller_1 = require("../controller/orderDetail.controller");
const orderRouter = express_1.default.Router();
orderRouter.get("/", auth_1.authMiddleware, myOrder_controller_1.myOrderController);
orderRouter.get("/:id", auth_1.authMiddleware, orderDetail_controller_1.orderDetailController);
exports.default = orderRouter;
