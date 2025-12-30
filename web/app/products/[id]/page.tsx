"use client";

import Image from "next/image";
import { useState } from "react";
import { Heart, Minus, Plus, ShoppingCart, Star, Truck, Shield, RefreshCw } from "lucide-react";
import Link from "next/link";

interface ProductDetailPageProps {
  params: {
    id: string;
  };
}

// Mock data - thay thế bằng API call thực tế
async function getProductById(id: string) {
  // TODO: Replace with actual API call
  return {
    _id: id,
    name: "Premium Cotton T-Shirt",
    description: "High-quality cotton t-shirt with a comfortable fit. Perfect for everyday wear. Made from 100% organic cotton with excellent breathability.",
    price: 29.99,
    originalPrice: 49.99,
    discount: 40,
    images: [
      "https://res.cloudinary.com/dxiol22ch/image/upload/v1767075132/basic_t_shirt_vhjpla.jpg",
      "https://res.cloudinary.com/dxiol22ch/image/upload/v1767075132/basic_t_shirt_vhjpla.jpg",
      "https://res.cloudinary.com/dxiol22ch/image/upload/v1767075132/basic_t_shirt_vhjpla.jpg",
    ],
    category: "T-Shirts",
    rating: 4.5,
    reviewCount: 128,
    stock: 45,
    sizes: ["S", "M", "L", "XL", "XXL"],
    colors: [
      { name: "Black", hex: "#000000" },
      { name: "White", hex: "#FFFFFF" },
      { name: "Navy", hex: "#000080" },
      { name: "Gray", hex: "#808080" },
    ],
  };
}

export default async function ProductDetailPage({ params }: ProductDetailPageProps) {
  const product = await getProductById(params.id);

  return (
    <ProductDetailClient product={product} />
  );
}

function ProductDetailClient({ product }: { product: any }) {
  const [selectedImage, setSelectedImage] = useState(0);
  const [quantity, setQuantity] = useState(1);
  const [selectedSize, setSelectedSize] = useState("");
  const [selectedColor, setSelectedColor] = useState("");
  const [isFavourite, setIsFavourite] = useState(false);

  const handleQuantityChange = (type: "increase" | "decrease") => {
    if (type === "increase") {
      setQuantity((prev) => Math.min(prev + 1, product.stock));
    } else {
      setQuantity((prev) => Math.max(prev - 1, 1));
    }
  };

  return (
    <div className="min-h-screen bg-gray-50 py-8">
      <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
        {/* Breadcrumb */}
        <nav className="mb-8 flex items-center space-x-2 text-sm text-gray-500">
          <Link href="/" className="hover:text-gray-700">Home</Link>
          <span>/</span>
          <Link href="/products" className="hover:text-gray-700">Products</Link>
          <span>/</span>
          <span className="text-gray-900">{product.name}</span>
        </nav>

        <div className="grid grid-cols-1 gap-8 lg:grid-cols-2">
          {/* Image Gallery */}
          <div className="space-y-4">
            {/* Main Image */}
            <div className="relative aspect-square overflow-hidden rounded-2xl bg-gray-100">
              <Image
                src={product.images[selectedImage]}
                alt={product.name}
                fill
                className="object-cover"
                priority
              />
              
              {/* Discount Badge */}
              {product.discount && (
                <div className="absolute left-4 top-4 rounded-full bg-red-500 px-4 py-2 text-sm font-bold text-white shadow-lg">
                  -{product.discount}% OFF
                </div>
              )}

              {/* Favourite Button */}
              <button
                onClick={() => setIsFavourite(!isFavourite)}
                className="absolute right-4 top-4 rounded-full bg-white/90 p-3 shadow-lg backdrop-blur-sm transition-all hover:scale-110 hover:bg-white"
              >
                <Heart
                  className={`h-6 w-6 transition-all ${
                    isFavourite
                      ? "fill-red-500 text-red-500"
                      : "text-gray-400 hover:text-red-400"
                  }`}
                />
              </button>
            </div>

            {/* Thumbnail Images */}
            <div className="grid grid-cols-4 gap-4">
              {product.images.map((image: string, index: number) => (
                <button
                  key={index}
                  onClick={() => setSelectedImage(index)}
                  className={`relative aspect-square overflow-hidden rounded-lg border-2 transition-all ${
                    selectedImage === index
                      ? "border-purple-600 shadow-lg"
                      : "border-transparent hover:border-gray-300"
                  }`}
                >
                  <Image
                    src={image}
                    alt={`${product.name} ${index + 1}`}
                    fill
                    className="object-cover"
                  />
                </button>
              ))}
            </div>
          </div>

          {/* Product Info */}
          <div className="space-y-6">
            {/* Category */}
            <div>
              <span className="inline-block rounded-full bg-purple-100 px-4 py-1 text-sm font-medium text-purple-700">
                {product.category}
              </span>
            </div>

            {/* Product Name */}
            <h1 className="text-3xl font-bold text-gray-900 lg:text-4xl">
              {product.name}
            </h1>

            {/* Rating */}
            <div className="flex items-center gap-4">
              <div className="flex items-center gap-1">
                {[...Array(5)].map((_, i) => (
                  <Star
                    key={i}
                    className={`h-5 w-5 ${
                      i < Math.floor(product.rating)
                        ? "fill-yellow-400 text-yellow-400"
                        : "fill-gray-200 text-gray-200"
                    }`}
                  />
                ))}
              </div>
              <span className="text-sm text-gray-600">
                {product.rating} ({product.reviewCount} reviews)
              </span>
            </div>

            {/* Price */}
            <div className="flex items-baseline gap-4">
              <span className="text-4xl font-bold text-purple-600">
                ${product.price}
              </span>
              {product.originalPrice && (
                <span className="text-xl text-gray-400 line-through">
                  ${product.originalPrice}
                </span>
              )}
            </div>

            {/* Description */}
            <p className="text-gray-600 leading-relaxed">
              {product.description}
            </p>

            {/* Size Selection */}
            {product.sizes && (
              <div className="space-y-3">
                <label className="text-sm font-semibold text-gray-900">
                  Select Size
                </label>
                <div className="flex flex-wrap gap-2">
                  {product.sizes.map((size: string) => (
                    <button
                      key={size}
                      onClick={() => setSelectedSize(size)}
                      className={`rounded-lg border-2 px-6 py-2 font-medium transition-all ${
                        selectedSize === size
                          ? "border-purple-600 bg-purple-600 text-white"
                          : "border-gray-300 text-gray-700 hover:border-purple-400"
                      }`}
                    >
                      {size}
                    </button>
                  ))}
                </div>
              </div>
            )}

            {/* Color Selection */}
            {product.colors && (
              <div className="space-y-3">
                <label className="text-sm font-semibold text-gray-900">
                  Select Color
                </label>
                <div className="flex flex-wrap gap-3">
                  {product.colors.map((color: any) => (
                    <button
                      key={color.name}
                      onClick={() => setSelectedColor(color.name)}
                      className={`group relative h-12 w-12 rounded-full border-2 transition-all ${
                        selectedColor === color.name
                          ? "border-purple-600 shadow-lg"
                          : "border-gray-300 hover:border-gray-400"
                      }`}
                      title={color.name}
                    >
                      <span
                        className="absolute inset-1 rounded-full"
                        style={{ backgroundColor: color.hex }}
                      />
                    </button>
                  ))}
                </div>
              </div>
            )}

            {/* Quantity */}
            <div className="space-y-3">
              <label className="text-sm font-semibold text-gray-900">
                Quantity
              </label>
              <div className="flex items-center gap-4">
                <div className="flex items-center rounded-lg border-2 border-gray-300">
                  <button
                    onClick={() => handleQuantityChange("decrease")}
                    className="p-3 text-gray-600 transition-colors hover:bg-gray-100"
                  >
                    <Minus className="h-4 w-4" />
                  </button>
                  <span className="px-6 font-semibold text-gray-900">
                    {quantity}
                  </span>
                  <button
                    onClick={() => handleQuantityChange("increase")}
                    className="p-3 text-gray-600 transition-colors hover:bg-gray-100"
                  >
                    <Plus className="h-4 w-4" />
                  </button>
                </div>
                <span className="text-sm text-gray-600">
                  {product.stock} items available
                </span>
              </div>
            </div>

            {/* Action Buttons */}
            <div className="flex gap-4">
              <button className="flex-1 rounded-xl bg-gradient-to-r from-purple-600 to-blue-600 py-4 font-semibold text-white shadow-lg transition-all hover:from-purple-700 hover:to-blue-700 hover:shadow-xl">
                <span className="flex items-center justify-center">
                  <ShoppingCart className="mr-2 h-5 w-5" />
                  Add to Cart
                </span>
              </button>
              <button className="rounded-xl border-2 border-purple-600 px-6 py-4 font-semibold text-purple-600 transition-all hover:bg-purple-50">
                Buy Now
              </button>
            </div>

            {/* Features */}
            <div className="grid grid-cols-3 gap-4 rounded-xl border border-gray-200 bg-white p-6">
              <div className="flex flex-col items-center text-center">
                <Truck className="mb-2 h-8 w-8 text-purple-600" />
                <span className="text-xs font-medium text-gray-900">Free Shipping</span>
                <span className="text-xs text-gray-500">On orders over $50</span>
              </div>
              <div className="flex flex-col items-center text-center">
                <Shield className="mb-2 h-8 w-8 text-purple-600" />
                <span className="text-xs font-medium text-gray-900">Secure Payment</span>
                <span className="text-xs text-gray-500">100% protected</span>
              </div>
              <div className="flex flex-col items-center text-center">
                <RefreshCw className="mb-2 h-8 w-8 text-purple-600" />
                <span className="text-xs font-medium text-gray-900">Easy Returns</span>
                <span className="text-xs text-gray-500">30-day policy</span>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}