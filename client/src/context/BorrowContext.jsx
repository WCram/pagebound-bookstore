import { createContext, useContext, useEffect, useReducer } from "react";

const BorrowContext = createContext(null);
const STORAGE_KEY = "bookstore_borrow_bag";

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
        { bookId: book.id, title: book.title, author: book.author, coverUrl: book.coverUrl, quantity },
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

export function BorrowProvider({ children }) {
  const [items, dispatch] = useReducer(reducer, undefined, loadInitialItems);

  useEffect(() => {
    localStorage.setItem(STORAGE_KEY, JSON.stringify(items));
  }, [items]);

  const addItem = (book, quantity = 1) => dispatch({ type: "ADD", book, quantity });
  const removeItem = (bookId) => dispatch({ type: "REMOVE", bookId });
  const updateQuantity = (bookId, quantity) => dispatch({ type: "UPDATE_QUANTITY", bookId, quantity });
  const clearBag = () => dispatch({ type: "CLEAR" });

  const totalCount = items.reduce((sum, i) => sum + i.quantity, 0);

  return (
    <BorrowContext.Provider
      value={{ items, addItem, removeItem, updateQuantity, clearBag, totalCount }}
    >
      {children}
    </BorrowContext.Provider>
  );
}

export function useBorrowBag() {
  const ctx = useContext(BorrowContext);
  if (!ctx) throw new Error("useBorrowBag must be used within a BorrowProvider");
  return ctx;
}
