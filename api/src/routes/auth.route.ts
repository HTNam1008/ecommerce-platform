import { Router } from "express";
import { googleController } from "../controller/auth/google.controller";
import { refreshTokenController } from "../controller/auth/refresh.controller";

const authRouter =  Router();

authRouter.post("/google", googleController);
authRouter.post("/refresh-token", refreshTokenController);

export default authRouter;
