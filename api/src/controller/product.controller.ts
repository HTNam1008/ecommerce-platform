import { Product } from "../models/product.model";
import { Request, Response } from "express";

export const getProducts = async (req: Request, res: Response) => {
    try {
        const { category, search, sort } = req.query;
        
        const filter: any = {};

        if (category) {
            filter.category = category;
        }

        if (search) {
            filter.name = { $regex: search, $options: 'i' };
        }

        let query = Product.find(filter);

        if (sort == "price_asc") {
            query = query.sort({ price: 1 });
        }

        if (sort == "price_desc") {
            query = query.sort({ price: -1 });
        }

        if (sort == "newest") {
            query = query.sort({ createdAt: -1 });
        }

        const products = await query.exec();
        res.json(products);
    } catch (error) {
        res.status(500).json({ message: 'Server Error', error });
    }
}