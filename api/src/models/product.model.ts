import { model, Schema } from "mongoose";

const ProductSchema = new Schema(
    {
        name: { type: String, required: true },
        price: { type: Number, required: true },
        description: { type: String},
        images : [String],
        category: String,
        stock: { type: Number, default: 0}
    },
    { timestamps: true }
)

export const Product = model("Product", ProductSchema);