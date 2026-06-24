import { createContext, useContext, useEffect, useReducer } from "react";

const CartContext = createContext(null);
const STORAGE_KEY = "bookstore_cart";

function loadInitialItems() {
  try {
    const raw = localStorage.getItem(STORAGE_KEY);
    return raw ? JSON.parse(raw) : [];
  } catch {
    return [];
  }
}

function reducer(items, action) {
  switch (action.type) {
    case "ADD": {
      const { book, quantity } = action;
      const existing = items.find((i) => i.bookId === book.id);
      if (existing) {
        return items.map((i) =>
          i.bookId === book.id ? { ...i, quantity: i.quantity + quantity } : i
        );
      }
      return [
        ...items,
        { bookId: book.id, title: book.title, price: book.price, coverUrl: book.coverUrl, quantity },
      ];
    }
    case "REMOVE":
      return items.filter((i) => i.bookId !== action.bookId);
    case "UPDATE_QUANTITY":
      return items.map((i) =>
        i.bookId === action.bookId ? { ...i, quantity: Math.max(1, action.quantity) } : i
      );
    case "CLEAR":
      return [];
    default:
      return items;
  }
}

export function CartProvider({ children }) {
  const [items, dispatch] = useReducer(reducer, undefined, loadInitialItems);

  useEffect(() => {
    localStorage.setItem(STORAGE_KEY, JSON.stringify(items));
  }, [items]);

  const addItem = (book, quantity = 1) => dispatch({ type: "ADD", book, quantity });
  const removeItem = (bookId) => dispatch({ type: "REMOVE", bookId });
  const updateQuantity = (bookId, quantity) => dispatch({ type: "UPDATE_QUANTITY", bookId, quantity });
  const clearCart = () => dispatch({ type: "CLEAR" });

  const totalCount = items.reduce((sum, i) => sum + i.quantity, 0);
  const totalPrice = items.reduce((sum, i) => sum + i.price * i.quantity, 0);

  return (
    <CartContext.Provider
      value={{ items, addItem, removeItem, updateQuantity, clearCart, totalCount, totalPrice }}
    >
      {children}
    </CartContext.Provider>
  );
}

export function useCart() {
  const ctx = useContext(CartContext);
  if (!ctx) throw new Error("useCart must be used within a CartProvider");
  return ctx;
}
