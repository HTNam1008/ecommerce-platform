"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.refreshTokenController = void 0;
const jsonwebtoken_1 = __importDefault(require("jsonwebtoken"));
const refreshTokenController = async (req, res) => {
    try {
        const { refreshToken } = req.body;
        if (!refreshToken) {
            return res.status(400).json({ message: "Refresh token is required" });
        }
        const decoded = jsonwebtoken_1.default.verify(refreshToken, process.env.JWT_REFRESH_SECRET);
        const accessToken = jsonwebtoken_1.default.sign({ id: decoded.id }, process.env.JWT_ACCESS_SECRET, {
            expiresIn: "1m",
        });
        console.log("Generated new access token for user:", decoded.id);
        return res.json({ accessToken });
    }
    catch (error) {
        return res.status(401).json({ message: "Invalid refresh token" });
    }
};
exports.refreshTokenController = refreshTokenController;
