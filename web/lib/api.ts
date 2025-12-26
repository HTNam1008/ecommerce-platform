import { CartItem } from "@/types/cartItem.interface";
import { Order } from "@/types/order.interface";
import { Product } from "@/types/product.interface";
import { OrderItemRequest } from "@ecommerce-platform/shared";

interface GetProductsParams {
  category?: string;
  search?: string;
  sort?: string;
}

export async function getProducts(
  params: GetProductsParams = {}
): Promise<Product[]> {
  const query = new URLSearchParams();
  const { category, search, sort } = await params;
  if (category) query.set("category", category);
  if (search) query.set("search", search);
  if (sort) query.set("sort", sort);

  const res = await fetch(
    `${process.env.NEXT_PUBLIC_API_URL}/api/products?${query.toString()}`,

    {
      cache: "no-store",
    }
  );

  if (!res.ok) {
    throw new Error("Failed to fetch products");
  }

  return res.json();
}

export async function checkout(items: CartItem[]) {
  const itemsData: OrderItemRequest[] = items.map((item) => ({
    productId: item._id,
    quantity: item.quantity,
  }));

  const res = await fetch(`${process.env.NEXT_PUBLIC_API_URL}/api/checkout`, {
    method: "POST",
    credentials: "include",
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify({
      items: itemsData,
    }),
  });

  console.log("Checkout response:", res);

  const data = await res.json();

  if (!res.ok) {
    console.error("Checkout error:", data);
    alert("Checkout failed. Please try again.");
    return;
  }

  return data.url;
}

export async function googleLogin(token: string) {
  const res = await fetch(
    `${process.env.NEXT_PUBLIC_API_URL}/api/auth/google`,
    {
      method: "POST",
      credentials: "include",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({ token: token }),
    }
  );

  return res;
}

export async function getMyOrders(token: string | null) : Promise<{ orders: Order[] }> {
  const res = await fetch(
    `${process.env.NEXT_PUBLIC_API_URL}/api/orders`,
    {
      headers: {
        "Content-Type": "application/json",
        Authorization: `Bearer ${token}`,
      },
      cache: "no-store",
    }
  );

  if (!res.ok) {
    throw new Error("Failed to fetch orders");
  }

  return res.json();
}