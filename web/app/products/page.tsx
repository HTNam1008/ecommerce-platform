import { getProducts } from "@/lib/api";

export default async function ProductsPage() {
    const products = await getProducts();
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