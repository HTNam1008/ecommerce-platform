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
        <div className="bg-gray-200">
            <div className="flex min-h-screen p-8">
                <div className="w-1/4"> 
                    sidebar
                </div>
                <div className="w-3/4 grid grid-cols-3 gap-6 bg-transparent p-4">
                    {products.map(product => (
                        <ProductCard
                            key={product._id}
                            product={product}
                        />
                    ))}
                </div>
            </div>

        </div>
    );
}