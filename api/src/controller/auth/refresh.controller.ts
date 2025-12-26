import { Request, Response } from "express";
import jwt from "jsonwebtoken";

export const refreshTokenController = async (req: Request, res: Response) => {
  try {
    const { refreshToken } = req.body;

    if (!refreshToken) {
      return res.status(400).json({ message: "Refresh token is required" });
    }

    const decoded = jwt.verify(
      refreshToken,
      process.env.JWT_REFRESH_SECRET!
    ) as { id: string };

    const accessToken = jwt.sign(
      { id: decoded.id },
      process.env.JWT_ACCESS_SECRET!,
      {
        expiresIn: "1m",
      }
    );
    console.log("Generated new access token for user:", decoded.id);
    return res.json({ accessToken });
  } catch (error) {
    return res.status(401).json({ message: "Invalid refresh token" });
  }
};
