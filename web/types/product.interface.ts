export interface Product {
    _id: string;
    name: string;
    description?: string;
    price: number;
    originalPrice: 100
    images: string[];
    category?: string;
    stock: number;
    discount: 10;
    rating: 5;
    reviewCount: 100;
}