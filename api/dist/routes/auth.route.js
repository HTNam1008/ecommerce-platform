"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = require("express");
const google_controller_1 = require("../controller/auth/google.controller");
const refresh_controller_1 = require("../controller/auth/refresh.controller");
const authRouter = (0, express_1.Router)();
authRouter.post("/google", google_controller_1.googleController);
authRouter.post("/refresh-token", refresh_controller_1.refreshTokenController);
exports.default = authRouter;
