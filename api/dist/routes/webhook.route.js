"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = __importDefault(require("express"));
const webhook_stripe_controller_1 = require("../controller/webhook.stripe.controller");
const webhookRouter = express_1.default.Router();
webhookRouter.post("/", express_1.default.raw({ type: "application/json" }), webhook_stripe_controller_1.webhookController);
exports.default = webhookRouter;
