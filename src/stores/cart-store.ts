import { create } from "zustand";

interface CartItem {
  id: string;
  quantity: number;
  name: string;
  price: string;
  // Add additional properties if needed, e.g., size, color
}

interface StoreState {
  items: CartItem[];
  addItem: (itemId: string) => void;
  removeItem: (itemId: string) => void;
  changeQuantity: (itemId: string, quantity: number) => void;
  isInCart: (itemId: string) => boolean;
  increaseQuantity: (itemId: string) => void;
  decreaseQuantity: (itemId: string) => void;
  itemQuantity: (itemId: string) => number;
  getTotalCartPrice: () => number;
  getCartQuantity: () => number;
}

export const useCartStore = create<StoreState>((set, get) => ({
  items: [
    {
      id: "4918c42e-e1b1-4c65-bdf5-4a27509d38b1",
      quantity: 1,
      name: "Coffee",
      price: "3.00",
    },
    {
      id: "a3051817-fe88-4ef7-a782-98ed15fefb6b",
      quantity: 1,
      name: "Tea",
      price: "2.00",
    },
    {
      id: "f7d4d6a5-1b8a-4c0e-8c0b-9e6e7e7f9d3d",
      quantity: 1,
      name: "Scone",
      price: "2.89",
    },
  ],
  addItem: (itemId) =>
    set((state): any => {
      const existingItem = state.items.find((item) => item.id === itemId);
      if (existingItem) {
        // Increment quantity if item already exists in the cart
        return {
          items: state.items.map((item) =>
            item.id === itemId ? { ...item, quantity: item.quantity + 1 } : item
          ),
        };
      } else {
        // Add new item to the cart
        return { items: [...state.items, { id: itemId, quantity: 1 }] };
      }
    }),
  removeItem: (itemId) =>
    set((state) => ({
      // Remove item from the cart
      items: state.items.filter((item) => item.id !== itemId),
    })),
  changeQuantity: (itemId, quantity) =>
    set((state) => ({
      // Update quantity of a specific item, ensuring quantity is not negative
      items: state.items.map((item) =>
        item.id === itemId ? { ...item, quantity: Math.max(0, quantity) } : item
      ),
    })),
  isInCart: (itemId) => {
    // Check if an item is in the cart
    const state = get();
    return !!state.items.find((item) => item.id === itemId);
  },
  increaseQuantity: (itemId) =>
    set((state) => {
      // Increase quantity of a specific item
      return {
        items: state.items.map((item) =>
          item.id === itemId ? { ...item, quantity: item.quantity + 1 } : item
        ),
      };
    }),
  decreaseQuantity: (itemId) => {
    set((state) => {
      // Decrease quantity of a specific item
      return {
        items: state.items.map((item) =>
          item.id === itemId
            ? { ...item, quantity: Math.max(0, item.quantity - 1) }
            : item
        ),
      };
    });
  },
  itemQuantity: (itemId) => {
    // Get quantity of a specific item
    const state = get();
    const item = state.items.find((item) => item.id === itemId);
    return item ? item.quantity : 0;
  },
  getTotalCartPrice: (): number => {
    // Calculate total price of all items in the cart
    const state = get();
    return parseFloat(
      state.items
        .reduce((acc, item) => acc + parseFloat(item.price) * item.quantity, 0)
        .toFixed(2)
    );
  },
  getCartQuantity: () => {
    // Calculate total quantity of all items in the cart
    const state = get();
    return state.items.reduce((acc, item) => acc + item.quantity, 0);
  },
}));
