"use client";

import {
  createContext,
  useContext,
  useMemo,
  useState,
  type ReactNode,
} from "react";

export type CartItem = {
  id: number;
  name: string;
  category: string;
  image: string;
  price: number;
  size: number;
  quantity: number;
};

type CartContextValue = {
  items: CartItem[];
  addItem: (item: Omit<CartItem, "quantity">) => void;
  removeItem: (id: number, size: number) => void;
  updateQuantity: (id: number, size: number, quantity: number) => void;
  clearCart: () => void;
  subtotal: number;
  itemCount: number;
};

const CartContext = createContext<CartContextValue | null>(null);

const INITIAL_ITEMS: CartItem[] = [
  {
    id: 1,
    name: "Nike Air Max 270",
    category: "Running",
    image: "/shoes/air-max-270.jpg",
    price: 189,
    size: 42,
    quantity: 1,
  },
  {
    id: 3,
    name: "Converse Chuck 70",
    category: "Lifestyle",
    image: "/shoes/chuck-70.jpg",
    price: 75,
    size: 41,
    quantity: 2,
  },
];

export function CartProvider({ children }: { children: ReactNode }) {
  const [items, setItems] = useState<CartItem[]>(INITIAL_ITEMS);

  const addItem = (item: Omit<CartItem, "quantity">) => {
    setItems((current) => {
      const existing = current.find(
        (entry) => entry.id === item.id && entry.size === item.size
      );
      if (existing) {
        return current.map((entry) =>
          entry.id === item.id && entry.size === item.size
            ? { ...entry, quantity: entry.quantity + 1 }
            : entry
        );
      }
      return [...current, { ...item, quantity: 1 }];
    });
  };

  const removeItem = (id: number, size: number) => {
    setItems((current) =>
      current.filter((entry) => !(entry.id === id && entry.size === size))
    );
  };

  const updateQuantity = (id: number, size: number, quantity: number) => {
    if (quantity < 1) return;
    setItems((current) =>
      current.map((entry) =>
        entry.id === id && entry.size === size
          ? { ...entry, quantity }
          : entry
      )
    );
  };

  const clearCart = () => setItems([]);

  const { subtotal, itemCount } = useMemo(() => {
    return items.reduce(
      (acc, item) => ({
        subtotal: acc.subtotal + item.price * item.quantity,
        itemCount: acc.itemCount + item.quantity,
      }),
      { subtotal: 0, itemCount: 0 }
    );
  }, [items]);

  return (
    <CartContext.Provider
      value={{
        items,
        addItem,
        removeItem,
        updateQuantity,
        clearCart,
        subtotal,
        itemCount,
      }}
    >
      {children}
    </CartContext.Provider>
  );
}

export function useCart() {
  const context = useContext(CartContext);
  if (!context) {
    throw new Error("useCart must be used within a CartProvider");
  }
  return context;
}