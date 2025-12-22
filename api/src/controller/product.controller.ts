import { Product } from "../models/product.model";
import { Request, Response } from "express";

export const getProducts = async (_: Request, res: Response) => {
    try {
        const products = await Product.find();
        res.json(products);
    } catch (error) {
        res.status(500).json({ message: 'Server Error', error });
    }
}