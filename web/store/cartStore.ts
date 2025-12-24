import { CartItem } from "@/types/cartItem.interface";
import { create } from "zustand";
import { persist } from "zustand/middleware";
import { useAuthStore } from "./authStore";

interface CartState {
  carts: Record<string | 'guest', CartItem[]>;
  setCart: (userId: string, items: CartItem[]) => void;
  addItem: (userId: string, item: CartItem) => void;
  removeItem: (userId: string, id: string) => void;
  updateQuantity: (userId: string, id: string, quantity: number) => void;
  clearCart: (userId: string) => void;
}

export const useCartStore = create<CartState>()(
  persist(
    (set, get) => ({
      carts: {},

      setCart: (userId, items) =>
        set((state) => ({
          carts: { ...state.carts, [userId]: items },
        })),

      addItem: (userId, item) => {
        const cart = get().carts[userId] || [];
        const existingItem = cart.find((i) => i._id === item._id);

        let newCart;
        if (existingItem) {
          // ...i = copy all existing properties of the item, then update quantity
          newCart = cart.map((i) =>
            i._id === item._id
              ? { ...i, quantity: i.quantity + item.quantity }
              : i
          );
        } else {
          newCart = [...cart, item];
        }

        set((state) => ({
          carts: { ...state.carts, [userId]: newCart },
        }));
      },

      removeItem: (userId, id) => {
        const cart = get().carts[userId] || [];
        let newCart;

        newCart = cart.filter((i) => i._id !== id);

        set((state) => ({
          carts: { ...state.carts, [userId]: newCart },
        }));
      },
      updateQuantity: (userId, id, quantity) => {
        const cart = get().carts[userId] || [];
        let newCart;

        newCart = cart.map((i) => (i._id === id ? { ...i, quantity } : i));

        set((state) => ({
          carts: { ...state.carts, [userId]: newCart },
        }));
      },
      clearCart: (userId) => set((state) => ({
        carts: { ...state.carts, [userId]: [] },
      })),
    }),
    {
      name: "cart-storage",
    }
  )
);

export const useCartTotal = () => {
  const userId = useAuthStore(state => state.user?._id) || 'guest';
  const carts = useCartStore(state => state.carts);

  const currentCart = carts[userId] || [];
  return currentCart.reduce((total, item) => total + item.price * item.quantity, 0);
};

export const useCurrentCart = () => {
  const userId = useAuthStore(state => state.user?._id) || 'guest';
  const carts = useCartStore(state => state.carts);

  return carts[userId] || [];
};

