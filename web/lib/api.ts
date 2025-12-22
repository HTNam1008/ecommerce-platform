import { Product } from "@/types/product";

export async function getProducts(): Promise<Product[]> {
    const res = await fetch(
        `${process.env.NEXT_PUBLIC_API_URL}/api/products`,
        {
            cache: 'no-store',
        }
    );
    
    if (!res.ok) {
        throw new Error('Failed to fetch products');
    }
    return res.json();
}