import jwt from "jsonwebtoken";
import { Request, Response, NextFunction } from "express";
export interface AuthRequest extends Request {
  user?: { id: string };
}

export const authMiddleware = (
  req: AuthRequest,
  res: Response,
  next: NextFunction
) => {
  let token: string | undefined;
  // cookie priority over header
  if (req.cookies?.accessToken) {
    token = req.cookies.accessToken;
  }

  console.log("Token from cookie:", token);

  // fallback to header
  if (!token && req.headers.authorization) {
    token = req.headers.authorization.split(" ")[1];
  }

  console.log("Token from header:", token);

  if (!token) {
    return res.status(401).json({ message: "No token provided" });
  }

  try {
    const decoded = jwt.verify(token, process.env.JWT_SECRET!) as {
      id: string;
    };
    console.log("Decoded token:", decoded);
    req.user = decoded;
    next();
  } catch (error) {
    return res.status(401).json({ message: "Invalid token" });
  }
};
