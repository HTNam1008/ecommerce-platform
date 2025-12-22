import { getProducts } from "@/lib/api";

interface ProductPageProps {
    searchParams: {
        category?: string;
        search?: string;
        sort?: string;
    }
}

export default async function ProductsPage({searchParams}: ProductPageProps) {
    const products = await getProducts(searchParams);

    return(
        <main>
            <h1>Products Page</h1>

            <ul>
                {products.map((product) =>(
                    <li key={product._id}>
                        <h3>{product.name}</h3>
                        <p>${product.price}</p>
                    </li>
                ))}
            </ul>
        </main>
    )
}