import AddToCartButton from "@/components/AddToCartButton";
import ProductCard from "@/components/ProductCard";
import { getProducts } from "@/lib/api";

interface ProductPageProps {
    searchParams: {
        category?: string;
        search?: string;
        sort?: string;
    }
}

export default async function ProductsPage({ searchParams }: ProductPageProps) {
    const products = await getProducts(searchParams);

    return (
        <div className="grid grid-cols-3 gap-6">
            {products.map(product => (
                <ProductCard
                    key={product._id}
                    product={product}
                />
            ))}
        </div>
    );
}