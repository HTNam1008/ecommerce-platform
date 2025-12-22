// run 'npx ts-node src/seed/product.seed.ts'


import mongoose from "mongoose";
import dotenv from "dotenv";
import { Product } from "../models/product.model";

dotenv.config();

const products = [
  {
    name: "Basic T-Shirt",
    description: "Cotton T-shirt",
    price: 25,
    images: ["https://via.placeholder.com/300"],
    category: "fashion",
    stock: 100,
  },
  {
    name: "Running Sneakers",
    description: "Comfortable sneakers for running",
    price: 80,
    images: ["https://via.placeholder.com/300"],
    category: "shoes",
    stock: 50,
  },
  {
    name: "Backpack",
    description: "Waterproof backpack",
    price: 45,
    images: ["https://via.placeholder.com/300"],
    category: "accessories",
    stock: 30,
  },
];

async function seed() {
  try {
    await mongoose.connect(process.env.MONGODB_URI as string);

    await Product.deleteMany();
    await Product.insertMany(products);

    console.log("✅ Product seed success");
    process.exit();
  } catch (error) {
    console.error("❌ Seed failed", error);
    process.exit(1);
  }
}

seed();
