import CategoryFilter from "@/components/homepage/CategoriesFilter";
import FilterSidebar from "@/components/homepage/SidebarFilter";
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
            {/* Category Filter Bar */}
            <div className="sticky top-16 z-40">
                <CategoryFilter />
            </div>

            <div className="flex min-h-screen px-4">
                <div className="w-1/4 p-4"> 
                    <aside className="w-80 flex-shrink-0">
                        <FilterSidebar />
                    </aside>
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