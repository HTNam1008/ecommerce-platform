// "use client";

// import Image from "next/image";
// import type { Product } from "@/types/product.interface";
// import { Heart, ShoppingBag } from "lucide-react";
// import React from "react";

// export default function ProductCard({ product }: { product: Product }) {
//   const [favourite, setFavourite] = React.useState(false);

//   return (
//     <div>
//       <div className="product-image relative rounded-2xl bg-gray-300 shadow-sm hover:shadow-md transition">
//         <button className="absolute right-4 top-4 z-10 cursor-pointer rounded-full bg-white p-2 shadow"
//           onClick={() => setFavourite(!favourite)}>
//           <Heart className={`h-5 w-5 transition ${favourite ? "fill-red-500 text-red-500" : "text-gray-400"
//             }`} />
//         </button>
//         <div className="relative aspect-square mx-auto w-full">
//           <Image
//             src={product.images[0]}
//             alt={product.name}
//             fill
//             className="object-cover rounded-2xl" />
//         </div>
//       </div>
//       <div className="product-detail cursor-pointer relative rounded-2xl bg-white shadow-sm hover:shadow-md transition">
//         <h3 className="text-lg font-semibold text-black text-center line-clamp-1 pt-4 py-2">
//           {product.name}
//         </h3>

//         <div className="flex justify-center pb-2">
//           <span className="border p-2 inline-flex text-purple-600 font-semibold rounded-full items-center">
//             <ShoppingBag className="mr-2" />
//             ${product.price}
//           </span>
//         </div>
//       </div>

//     </div>
//   );
// }
"use client";

import Image from "next/image";
import type { Product } from "@/types/product.interface";
import { Heart, ShoppingBag, Star } from "lucide-react";
import React from "react";
import Link from "next/link";

export default function ProductCard({ product }: { product: Product }) {
  const [favourite, setFavourite] = React.useState(false);
  const [isHovered, setIsHovered] = React.useState(false);

  return (
    <div 
      className="group relative"
      onMouseEnter={() => setIsHovered(true)}
      onMouseLeave={() => setIsHovered(false)}
    >
      {/* Card Container */}
      <div className="relative overflow-hidden rounded-2xl bg-white shadow-md transition-all duration-300 hover:shadow-2xl hover:-translate-y-2">
        
        {/* Image Section */}
        <div className="relative aspect-square overflow-hidden bg-gray-100">
          {/* Favorite Button */}
          <button 
            className="absolute right-3 top-3 z-20 rounded-full bg-white/90 backdrop-blur-sm p-2.5 shadow-lg transition-all duration-300 hover:scale-110 hover:bg-white"
            onClick={(e) => {
              e.preventDefault();
              setFavourite(!favourite);
            }}
          >
            <Heart 
              className={`h-5 w-5 transition-all duration-300 ${
                favourite 
                  ? "fill-red-500 text-red-500 scale-110" 
                  : "text-gray-400 hover:text-red-400"
              }`} 
            />
          </button>

          {/* Discount Badge (if applicable) */}
          {product.discount && (
            <div className="absolute left-3 top-3 z-20 rounded-full bg-red-500 px-3 py-1 text-xs font-bold text-white shadow-lg">
              -{product.discount}%
            </div>
          )}

          {/* Product Image */}
          <Link href={`/products/${product._id}`}>
            <div className="relative h-full w-full cursor-pointer">
              <Image
                src={product.images[0]}
                alt={product.name}
                fill
                className={`object-cover transition-transform duration-500 ${
                  isHovered ? "scale-110" : "scale-100"
                }`}
              />
              
              {/* Overlay on Hover */}
              <div className={`absolute inset-0 bg-black/0 transition-all duration-300 ${
                isHovered ? "bg-black/10" : ""
              }`} />
            </div>
          </Link>

          {/* Quick Add to Cart Button (appears on hover) */}
          <div className={`absolute bottom-0 left-0 right-0 transition-all duration-300 ${
            isHovered ? "translate-y-0 opacity-100" : "translate-y-full opacity-0"
          }`}>
            <button className="w-full bg-gradient-to-r from-purple-600 to-blue-600 py-3 text-sm font-semibold text-white transition-all hover:from-purple-700 hover:to-blue-700">
              <span className="flex items-center justify-center">
                <ShoppingBag className="mr-2 h-4 w-4" />
                Add to Cart
              </span>
            </button>
          </div>
        </div>

        {/* Product Details */}
        <Link href={`/products/${product._id}`}>
          <div className="cursor-pointer p-4">
            {/* Product Name */}
            <h3 className="mb-2 line-clamp-2 text-base font-semibold text-gray-800 transition-colors group-hover:text-purple-600">
              {product.name}
            </h3>

            {/* Rating (if available) */}
            {product.rating && (
              <div className="mb-2 flex items-center gap-1">
                <div className="flex">
                  {[...Array(5)].map((_, i) => (
                    <Star
                      key={i}
                      className={`h-4 w-4 ${
                        i < Math.floor(product.rating || 0)
                          ? "fill-yellow-400 text-yellow-400"
                          : "fill-gray-200 text-gray-200"
                      }`}
                    />
                  ))}
                </div>
                <span className="text-xs text-gray-500">
                  ({product.reviewCount || 0})
                </span>
              </div>
            )}

            {/* Price Section */}
            <div className="flex items-center justify-between">
              <div className="flex items-baseline gap-2">
                <span className="text-xl font-bold text-purple-600">
                  ${product.price}
                </span>
                {product.originalPrice && (
                  <span className="text-sm text-gray-400 line-through">
                    ${product.originalPrice}
                  </span>
                )}
              </div>
              
              {/* Stock Status */}
              {product.stock !== undefined && (
                <span className={`text-xs font-medium ${
                  product.stock > 0 ? "text-green-600" : "text-red-600"
                }`}>
                  {product.stock > 0 ? "In Stock" : "Out of Stock"}
                </span>
              )}
            </div>

            {/* Category Badge */}
            {product.category && (
              <div className="mt-3">
                <span className="inline-block rounded-full bg-gray-100 px-3 py-1 text-xs font-medium text-gray-600">
                  {product.category}
                </span>
              </div>
            )}
          </div>
        </Link>
      </div>
    </div>
  );
}