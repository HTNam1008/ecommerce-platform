import { Request, Response } from "express";
import { OAuth2Client } from "google-auth-library";
import User from "../models/user.model";
import jwt from "jsonwebtoken";

const client = new OAuth2Client(process.env.GOOGLE_CLIENT_ID);

export const authController = async (req: Request, res: Response) => {
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

    let user = await User.findOne({ googleId: sub });

    if (!user) {
      user = await User.create({
        googleId: sub,
        email,
        name,
        avatar: picture,
      });
    }

    const jwtToken = jwt.sign({ id: user._id }, process.env.JWT_SECRET!, {
      expiresIn: "7d",
    });

    return res.json({ token: jwtToken, user });
  } catch (error) {
    console.error("Auth error:", error);
    return res.status(500).json({ message: "Auth error" });
  }
};
