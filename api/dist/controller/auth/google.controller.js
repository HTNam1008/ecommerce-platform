"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.googleController = void 0;
const google_auth_library_1 = require("google-auth-library");
const user_model_1 = __importDefault(require("../../models/user.model"));
const jsonwebtoken_1 = __importDefault(require("jsonwebtoken"));
const client = new google_auth_library_1.OAuth2Client(process.env.GOOGLE_CLIENT_ID);
const googleController = async (req, res) => {
    try {
        const { token } = req.body;
        const ticket = await client.verifyIdToken({
            idToken: token,
            audience: process.env.GOOGLE_CLIENT_ID,
        });
        const payload = ticket.getPayload();
        if (!payload) {
            return res.status(400).json({ message: "Invalid Google token" });
        }
        const { sub, email, name, picture } = payload;
        console.log("Google token payload:", { sub, email, name, picture });
        let user = await user_model_1.default.findOne({ googleId: sub });
        if (!user) {
            user = await user_model_1.default.create({
                googleId: sub,
                email,
                name,
                avatar: picture,
            });
        }
        const accessToken = jsonwebtoken_1.default.sign({ id: user._id }, process.env.JWT_ACCESS_SECRET, {
            expiresIn: "1m",
        });
        const refreshToken = jsonwebtoken_1.default.sign({ id: user._id }, process.env.JWT_REFRESH_SECRET, {
            expiresIn: "2m",
        });
        return res.json({
            accessToken: accessToken,
            refreshToken: refreshToken,
            user: user,
        });
    }
    catch (error) {
        console.error("Auth error:", error);
        return res.status(500).json({ message: "Auth error" });
    }
};
exports.googleController = googleController;
