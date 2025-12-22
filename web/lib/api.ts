import { Product } from "@/types/product";

interface GetProductsParams {
    category?: string;
    search?: string;
    sort?: string;
}

export async function getProducts(params: GetProductsParams = {}): Promise<Product[]> {
    const query = new URLSearchParams();
    const { category, search, sort} = await params;
    if (category) query.set("category", category);
    if (search) query.set("search", search);
    if (sort) query.set("sort", sort);

    const res = await fetch(
        `${process.env.NEXT_PUBLIC_API_URL}/api/products?${query.toString()}`,
        {
            cache: 'no-store',
        }
    );
    
    if (!res.ok) {
        throw new Error('Failed to fetch products');
    }

    return res.json();
}