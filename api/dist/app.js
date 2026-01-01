"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = __importDefault(require("express"));
const cors_1 = __importDefault(require("cors"));
const product_route_1 = __importDefault(require("./routes/product.route"));
const checkout_route_1 = __importDefault(require("./routes/checkout.route"));
const webhook_route_1 = __importDefault(require("./routes/webhook.route"));
const auth_route_1 = __importDefault(require("./routes/auth.route"));
const order_route_1 = __importDefault(require("./routes/order.route"));
const cookie_parser_1 = __importDefault(require("cookie-parser"));
const app = (0, express_1.default)();
const corsOptions = {
    origin: ["http://localhost:3000", "https://app.shophub.studio"],
    credentials: true,
    methods: ["GET", "POST", "PUT", "PATCH", "DELETE", "OPTIONS"],
    allowedHeaders: ["Content-Type", "Authorization", "Cookie"],
};
app.use((0, cors_1.default)(corsOptions));
app.use((req, res, next) => {
    console.log(`${req.method} ${req.path}`);
    console.log("Origin:", req.headers.origin);
    console.log("Cookies:", req.cookies);
    next();
});
app.options("*", (0, cors_1.default)(corsOptions));
app.use("/api/webhook", webhook_route_1.default);
app.use(express_1.default.json());
app.use((0, cookie_parser_1.default)());
app.use("/api/products", product_route_1.default);
app.use("/api/auth", auth_route_1.default);
app.use("/api/checkout", checkout_route_1.default);
app.use("/api/orders", order_route_1.default);
exports.default = app;
