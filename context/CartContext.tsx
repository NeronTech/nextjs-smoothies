// context/CartContext.tsx
"use client";
import { createContext, useContext, useState, ReactNode } from "react";

export interface CartItem {
  name: string;
  price: number;
  quantity: number;
}

interface CartContextType {
  cart: CartItem[];
  addToCart: (item: Omit<CartItem, "quantity">) => void;
  increaseQuantity: (name: string) => void;
  decreaseQuantity: (name: string) => void;
  cartCount: number;
  totalPrice: number;
  isOrderModalOpen: boolean;
  openOrderModal: () => void;
  closeOrderModal: () => void;
}

const CartContext = createContext<CartContextType | undefined>(undefined);

export const useCart = () => {
  const context = useContext(CartContext);
  if (!context) throw new Error("useCart must be used within CartProvider");
  return context;
};

export const CartProvider = ({ children }: { children: ReactNode }) => {
  const [cart, setCart] = useState<CartItem[]>([]);
  const [isOrderModalOpen, setOrderModalOpen] = useState(false);

  const addToCart = (item: Omit<CartItem, "quantity">) => {
    setCart((prev) => {
      const existing = prev.find((i) => i.name === item.name);
      if (existing) {
        return prev.map((i) =>
          i.name === item.name ? { ...i, quantity: i.quantity + 1 } : i
        );
      }
      return [...prev, { ...item, quantity: 1 }];
    });
  };

  const increaseQuantity = (name: string) => {
    setCart((prev) =>
      prev.map((i) =>
        i.name === name ? { ...i, quantity: i.quantity + 1 } : i
      )
    );
  };

  const decreaseQuantity = (name: string) => {
    setCart((prev) =>
      prev
        .map((i) => (i.name === name ? { ...i, quantity: i.quantity - 1 } : i))
        .filter((i) => i.quantity > 0)
    );
  };

  const cartCount = cart.reduce((acc, i) => acc + i.quantity, 0);
  const totalPrice = cart.reduce((acc, i) => acc + i.price * i.quantity, 0);

  const openOrderModal = () => setOrderModalOpen(true);
  const closeOrderModal = () => setOrderModalOpen(false);

  return (
    <CartContext.Provider
      value={{
        cart,
        addToCart,
        increaseQuantity,
        decreaseQuantity,
        cartCount,
        totalPrice,
        isOrderModalOpen,
        openOrderModal,
        closeOrderModal,
      }}
    >
      {children}
    </CartContext.Provider>
  );
};
