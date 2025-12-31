"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.getProducts = void 0;
const product_model_1 = require("../models/product.model");
const getProducts = async (req, res) => {
    try {
        const { category, search, sort } = req.query;
        const filter = {};
        if (category) {
            filter.category = category;
        }
        if (search) {
            filter.name = { $regex: search, $options: 'i' };
        }
        let query = product_model_1.Product.find(filter);
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
    }
    catch (error) {
        res.status(500).json({ message: 'Server Error', error });
    }
};
exports.getProducts = getProducts;
