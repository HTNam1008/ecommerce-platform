import { CartItem } from "@/types/cartItem.interface";
import { create } from "zustand";
import { persist } from "zustand/middleware";

interface CartState {
    items: CartItem[];
    addItem: (item: CartItem) => void;
    removeItem: (id: string) => void;
    updateQuantity: (id: string, quantity: number) => void;
    clearCart: () => void;
}

export const useCartStore = create<CartState>() (
    persist(
        (set, get) => ({
            items: [],

            addItem: (item) =>{
                const existingItem = get().items.find(i => i._id === item._id);

                if (existingItem) {
                    set({
                        // ...i = copy all existing properties of the item, then update quantity
                        items: get().items.map(
                            i => i._id === item._id ? { ...i, quantity: i.quantity + item.quantity } : i
                        )
                    });
                } else {
                    set({ items: [...get().items, item]});
                }
            },

            removeItem: (id) => 
                set({ items: get().items.filter(i => i._id !== id)}),
            
            updateQuantity: (id, quantity) =>
                set({
                    items: get().items.map(
                        i => i._id === id ? { ...i, quantity } : i
                    ),
                }),
            
            clearCart: () => set({ items: [] }),
        }),
        {
            name: "cart-storage"
        }
    )
)

export const useCartTotal = () => {
    return useCartStore(state =>
        state.items.reduce((total, item) => total + item.price * item.quantity, 0)
    )
}