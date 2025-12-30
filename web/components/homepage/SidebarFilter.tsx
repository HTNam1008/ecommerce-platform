"use client";

import { useState } from "react";
import { Star } from "lucide-react";

const brands = [
  { name: "Adidas", icon: "🏃" },
  { name: "Columbia", icon: "⛰️" },
  { name: "Damix", icon: "🏔️" },
  { name: "New Balance", icon: "👟" },
  { name: "Nike", icon: "✓" },
  { name: "Xiaomi", icon: "📱" },
  { name: "Asics", icon: "👟" },
];

export default function FilterSidebar() {
  const [priceRange, setPriceRange] = useState([20, 1130]);
  const [selectedBrands, setSelectedBrands] = useState<string[]>([]);
  const [selectedRating, setSelectedRating] = useState(4);
  const [deliveryOption, setDeliveryOption] = useState("standard");

  const handleBrandToggle = (brand: string) => {
    setSelectedBrands((prev) =>
      prev.includes(brand)
        ? prev.filter((b) => b !== brand)
        : [...prev, brand]
    );
  };

  const handleReset = () => {
    setPriceRange([20, 30, 500, 1130]);
    setSelectedBrands([]);
    setSelectedRating(4);
  };

  return (
    <div className="sticky top-32 h-fit rounded-2xl bg-white p-6 shadow-lg">
      {/* Price Range */}
      <div className="mb-6">
        <div className="mb-4 flex items-center justify-between">
          <h3 className="text-lg font-bold text-gray-900">Price Range</h3>
          <button
            onClick={handleReset}
            className="text-sm text-gray-400 hover:text-purple-600"
          >
            Reset
          </button>
        </div>
        <p className="mb-4 text-sm text-gray-500">
          The average price is ${Math.round((priceRange[0] + priceRange[1]) / 2)}
        </p>

        {/* Price Display */}
        <div className="mb-4 flex items-center justify-between">
          <span className="rounded-full bg-gray-900 px-4 py-2 text-sm font-semibold text-white">
            ${priceRange[0]}
          </span>
          <span className="rounded-full bg-gray-900 px-4 py-2 text-sm font-semibold text-white">
            ${priceRange[1]}
          </span>
        </div>

        {/* Range Slider Visualization */}
        <div className="relative h-16 rounded-lg bg-gradient-to-r from-purple-200 via-purple-300 to-purple-200 p-4">
          <div className="absolute inset-x-0 bottom-0 h-1 bg-purple-600 rounded-full">
            <div className="absolute -right-2 -top-2 h-5 w-5 rounded-full bg-purple-600 shadow-lg"></div>
          </div>
        </div>

        {/* Hidden Range Input */}
        <input
          type="range"
          min="0"
          max="2000"
          value={priceRange[1]}
          onChange={(e) => setPriceRange([priceRange[0], parseInt(e.target.value)])}
          className="mt-4 w-full"
        />
      </div>

      <hr className="my-6 border-gray-200" />

      {/* Star Rating */}
      <div className="mb-6">
        <h3 className="mb-4 text-lg font-bold text-gray-900">Star Rating</h3>
        <div className="flex items-center justify-between">
          <div className="flex gap-1">
            {[1, 2, 3, 4].map((star) => (
              <Star
                key={star}
                className={`h-6 w-6 cursor-pointer transition-all ${
                  star <= selectedRating
                    ? "fill-yellow-400 text-yellow-400"
                    : "fill-gray-200 text-gray-200"
                }`}
                onClick={() => setSelectedRating(star)}
              />
            ))}
          </div>
          <span className="text-sm text-gray-600">
            {selectedRating} Stars & up
          </span>
        </div>
      </div>

      <hr className="my-6 border-gray-200" />

      {/* Brand Filter */}
      <div className="mb-6">
        <div className="mb-4 flex items-center justify-between">
          <h3 className="text-lg font-bold text-gray-900">Brand</h3>
          <button
            onClick={() => setSelectedBrands([])}
            className="text-sm text-gray-400 hover:text-purple-600"
          >
            Reset
          </button>
        </div>

        <div className="space-y-3">
          {brands.map((brand) => (
            <label
              key={brand.name}
              className="flex cursor-pointer items-center justify-between rounded-lg p-2 transition-colors hover:bg-gray-50"
            >
              <div className="flex items-center gap-3">
                <span className="text-xl">{brand.icon}</span>
                <span className="font-medium text-gray-700">{brand.name}</span>
              </div>
              <input
                type="checkbox"
                checked={selectedBrands.includes(brand.name)}
                onChange={() => handleBrandToggle(brand.name)}
                className="h-5 w-5 rounded border-2 border-gray-300 text-purple-600 focus:ring-2 focus:ring-purple-500"
              />
            </label>
          ))}
        </div>

        <button className="mt-4 text-sm font-medium text-purple-600 hover:text-purple-700">
          More Brand
        </button>
      </div>

      <hr className="my-6 border-gray-200" />

      {/* Delivery Options */}
      <div>
        <h3 className="mb-4 text-lg font-bold text-gray-900">Delivery Options</h3>
        <div className="flex gap-3">
          <button
            onClick={() => setDeliveryOption("standard")}
            className={`flex-1 rounded-full px-4 py-3 font-semibold transition-all ${
              deliveryOption === "standard"
                ? "bg-purple-600 text-white shadow-lg"
                : "bg-gray-100 text-gray-700 hover:bg-gray-200"
            }`}
          >
            Standard
          </button>
          <button
            onClick={() => setDeliveryOption("pickup")}
            className={`flex-1 rounded-full px-4 py-3 font-semibold transition-all ${
              deliveryOption === "pickup"
                ? "bg-purple-600 text-white shadow-lg"
                : "bg-gray-100 text-gray-700 hover:bg-gray-200"
            }`}
          >
            Pick Up
          </button>
        </div>
      </div>
    </div>
  );
}