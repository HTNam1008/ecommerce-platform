"use client";

import { useRouter, useSearchParams } from "next/navigation";

const categories = [
  { name: "All Categories", value: "" },
  { name: "Deals", value: "deals" },
  { name: "Crypto", value: "crypto" },
  { name: "Fashion", value: "fashion" },
  { name: "Health & Wellness", value: "health" },
  { name: "Art", value: "art" },
  { name: "Home", value: "home" },
  { name: "Sport", value: "sport" },
  { name: "Music", value: "music" },
  { name: "Gaming", value: "gaming" },
];

export default function CategoryFilter() {
  const router = useRouter();
  const searchParams = useSearchParams();
  const currentCategory = searchParams.get("category") || "";

  const handleCategoryChange = (categoryValue: string) => {
    const params = new URLSearchParams(searchParams.toString());
    
    if (categoryValue) {
      params.set("category", categoryValue);
    } else {
      params.delete("category");
    }
    
    router.push(`/?${params.toString()}`);
  };

  return (
    <div className="overflow-x-auto bg-transparent">
      <div className="flex gap-3 px-8 py-4">
        {categories.map((category) => (
          <button
            key={category.value}
            onClick={() => handleCategoryChange(category.value)}
            className={`whitespace-nowrap rounded-full px-6 py-2.5 text-sm font-medium font-semibold transition-all ${
              currentCategory === category.value
                ? "bg-purple-600 text-white shadow-lg"
                : "bg-white text-gray-700 hover:bg-gray-100 hover:shadow-md"
            }`}
          >
            {category.name}
          </button>
        ))}
      </div>
    </div>
  );
}