import { Router } from "express";
import { authController } from "../controller/auth.controller";

const authRouter =  Router();

authRouter.post("/google", authController);

export default authRouter;
