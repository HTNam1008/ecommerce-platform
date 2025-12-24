import express from 'express';
import { checkoutController } from '../controller/checkout.controller';
import { authMiddleware } from '../middleware/auth';

const checkoutRouter= express.Router();

checkoutRouter.post("/", authMiddleware, checkoutController);

export default checkoutRouter;