"use client"; // the cart lives in the browser, so this is a client component

import {
  createContext,
  useContext,
  useEffect,
  useState,
  ReactNode,
} from "react";

// One line in the cart. We store just what we need to show and to order.
export type CartItem = {
  id: number;          // product id
  slug: string;        // to link back to the product
  name: string;
  price: number;       // the effective price (sale price if on sale)
  imageUrl: string | null;
  attributes: string;  // e.g. "Stainless Steel · Size 7" — shown under the name
  quantity: number;
};

// What the shared "box" gives to any page that opens it.
type CartContextType = {
  items: CartItem[];
  addItem: (item: Omit<CartItem, "quantity">, quantity: number) => void;
  removeItem: (id: number) => void;
  updateQuantity: (id: number, quantity: number) => void;
  clearCart: () => void;
  totalItems: number;   // total count (for the navbar badge)
  totalPrice: number;   // sum of price * quantity
};

// Create the context (the shared box). Starts undefined until provided.
const CartContext = createContext<CartContextType | undefined>(undefined);

const STORAGE_KEY = "lumiere-cart";

// The Provider wraps the whole site and holds the actual cart state.
export function CartProvider({ children }: { children: ReactNode }) {
  // Read the saved cart once, when the state is first created (lazy init).
  // This avoids a setState call inside an effect on first render.
  const [items, setItems] = useState<CartItem[]>(() => {
    if (typeof window === "undefined") return []; // no localStorage on the server
    try {
      const saved = localStorage.getItem(STORAGE_KEY);
      return saved ? JSON.parse(saved) : [];
    } catch {
      return [];
    }
  });

  // Whenever the cart changes, save it back to the browser.
  useEffect(() => {
    localStorage.setItem(STORAGE_KEY, JSON.stringify(items));
  }, [items]);

  // Add an item. If it's already in the cart, just increase its quantity.
  function addItem(item: Omit<CartItem, "quantity">, quantity: number) {
    setItems((current) => {
      const existing = current.find((i) => i.id === item.id);
      if (existing) {
        return current.map((i) =>
          i.id === item.id ? { ...i, quantity: i.quantity + quantity } : i
        );
      }
      return [...current, { ...item, quantity }];
    });
  }

  function removeItem(id: number) {
    setItems((current) => current.filter((i) => i.id !== id));
  }

  function updateQuantity(id: number, quantity: number) {
    if (quantity < 1) return; // never below 1
    setItems((current) =>
      current.map((i) => (i.id === id ? { ...i, quantity } : i))
    );
  }

  function clearCart() {
    setItems([]);
  }

  // Handy totals computed from the items.
  const totalItems = items.reduce((sum, i) => sum + i.quantity, 0);
  const totalPrice = items.reduce((sum, i) => sum + i.price * i.quantity, 0);

  return (
    <CartContext.Provider
      value={{
        items,
        addItem,
        removeItem,
        updateQuantity,
        clearCart,
        totalItems,
        totalPrice,
      }}
    >
      {children}
    </CartContext.Provider>
  );
}

// A small helper so any component can use the cart with one line:
//   const { items, addItem } = useCart();
export function useCart() {
  const ctx = useContext(CartContext);
  if (!ctx) throw new Error("useCart must be used inside CartProvider");
  return ctx;
}