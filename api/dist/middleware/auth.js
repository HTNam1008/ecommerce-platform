"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.authMiddleware = void 0;
const jsonwebtoken_1 = __importDefault(require("jsonwebtoken"));
const authMiddleware = (req, res, next) => {
    let token;
    if (req.cookies?.accessToken) {
        token = req.cookies.accessToken;
    }
    console.log("Token from cookie:", token);
    if (!token && req.headers.authorization) {
        token = req.headers.authorization.split(" ")[1];
    }
    console.log("Token from header:", token);
    if (!token) {
        return res.status(401).json({ message: "No token provided" });
    }
    try {
        const decoded = jsonwebtoken_1.default.verify(token, process.env.JWT_ACCESS_SECRET);
        if (!decoded) {
            return res.status(401).json({ message: "Invalid token" });
        }
        console.log("Decoded token:", decoded);
        req.user = { id: decoded.id };
        next();
    }
    catch (error) {
        if (error instanceof jsonwebtoken_1.default.TokenExpiredError) {
            return res.status(401).json({ message: "Token expired" });
        }
        return res.status(401).json({ message: "Invalid token" });
    }
};
exports.authMiddleware = authMiddleware;
