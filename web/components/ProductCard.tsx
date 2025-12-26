import AddToCartButton from "./AddToCartButton";
import type { Product } from "@/types/product.interface";

export default function ProductCard({ product }: { product: Product }) {
  return (
    <div className="border p-4 rounded">
      <img src={product.images[0]} alt={product.name} />

      <h3 className="text-lg font-semibold">
        {product.name}
      </h3>

      <p>${product.price}</p>

      <AddToCartButton product={product} />
    </div>
  );
}
