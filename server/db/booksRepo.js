import { readData, updateData } from "./jsonStore.js";

const FILE = "books.json";

export async function getAll() {
  return readData(FILE);
}

export async function getById(id) {
  const books = await readData(FILE);
  return books.find((b) => b.id === id) || null;
}

export function create(book) {
  return updateData(FILE, (books) => {
    const now = new Date().toISOString();
    const newBook = { ...book, id: crypto.randomUUID(), createdAt: now, updatedAt: now };
    books.push(newBook);
    return newBook;
  });
}

export function update(id, updates) {
  return updateData(FILE, (books) => {
    const index = books.findIndex((b) => b.id === id);
    if (index === -1) return null;
    const updated = { ...books[index], ...updates, id, updatedAt: new Date().toISOString() };
    books[index] = updated;
    return updated;
  });
}

export function remove(id) {
  return updateData(FILE, (books) => {
    const index = books.findIndex((b) => b.id === id);
    if (index === -1) return false;
    books.splice(index, 1);
    return true;
  });
}

export function decrementStock(id, quantity) {
  return updateData(FILE, (books) => {
    const book = books.find((b) => b.id === id);
    if (!book) return null;
    book.stock -= quantity;
    book.updatedAt = new Date().toISOString();
    return book;
  });
}

export function decrementStockForItems(items) {
  return updateData(FILE, (books) => {
    const snapshots = [];
    for (const { bookId, quantity } of items) {
      const book = books.find((b) => b.id === bookId);
      if (!book) return { error: `Book ${bookId} not found` };
      if (book.stock < quantity) return { error: `Not enough stock for "${book.title}"` };
      snapshots.push({ bookId, title: book.title, price: book.price, quantity });
    }
    for (const { bookId, quantity } of items) {
      const book = books.find((b) => b.id === bookId);
      book.stock -= quantity;
      book.updatedAt = new Date().toISOString();
    }
    return { snapshots };
  });
}
