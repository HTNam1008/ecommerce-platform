"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = __importDefault(require("express"));
const checkout_controller_1 = require("../controller/checkout.controller");
const auth_1 = require("../middleware/auth");
const checkoutRouter = express_1.default.Router();
checkoutRouter.post("/", auth_1.authMiddleware, checkout_controller_1.checkoutController);
exports.default = checkoutRouter;
