// run 'npx ts-node src/seed/product.seed.ts'


import mongoose from "mongoose";
import dotenv from "dotenv";
import { Product } from "../models/product.model";

dotenv.config();

const products = [
  // ===== FASHION =====
  {
    name: "Basic T-Shirt",
    description: "Soft cotton T-shirt for everyday wear",
    price: 25,
    images: ["https://via.placeholder.com/300"],
    category: "fashion",
    stock: 120,
  },
  {
    name: "Oversized Hoodie",
    description: "Warm hoodie with modern oversized fit",
    price: 55,
    images: ["https://via.placeholder.com/300"],
    category: "fashion",
    stock: 60,
  },
  {
    name: "Denim Jacket",
    description: "Classic blue denim jacket",
    price: 75,
    images: ["https://via.placeholder.com/300"],
    category: "fashion",
    stock: 40,
  },

  // ===== SHOES =====
  {
    name: "Running Sneakers",
    description: "Comfortable sneakers designed for running",
    price: 80,
    images: ["https://via.placeholder.com/300"],
    category: "shoes",
    stock: 50,
  },
  {
    name: "Casual White Sneakers",
    description: "Minimal white sneakers for daily outfits",
    price: 70,
    images: ["https://via.placeholder.com/300"],
    category: "shoes",
    stock: 65,
  },
  {
    name: "Leather Boots",
    description: "Premium leather boots for formal occasions",
    price: 120,
    images: ["https://via.placeholder.com/300"],
    category: "shoes",
    stock: 25,
  },

  // ===== ACCESSORIES =====
  {
    name: "Waterproof Backpack",
    description: "Durable backpack for travel and work",
    price: 45,
    images: ["https://via.placeholder.com/300"],
    category: "accessories",
    stock: 30,
  },
  {
    name: "Leather Wallet",
    description: "Slim leather wallet with multiple compartments",
    price: 35,
    images: ["https://via.placeholder.com/300"],
    category: "accessories",
    stock: 80,
  },
  {
    name: "Baseball Cap",
    description: "Adjustable cap with breathable fabric",
    price: 20,
    images: ["https://via.placeholder.com/300"],
    category: "accessories",
    stock: 100,
  },

  // ===== ELECTRONICS =====
  {
    name: "Wireless Headphones",
    description: "Noise-cancelling over-ear headphones",
    price: 150,
    images: ["https://via.placeholder.com/300"],
    category: "electronics",
    stock: 40,
  },
  {
    name: "Bluetooth Speaker",
    description: "Portable speaker with deep bass",
    price: 60,
    images: ["https://via.placeholder.com/300"],
    category: "electronics",
    stock: 70,
  },
  {
    name: "Mechanical Keyboard",
    description: "RGB mechanical keyboard for gaming and coding",
    price: 110,
    images: ["https://via.placeholder.com/300"],
    category: "electronics",
    stock: 35,
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
