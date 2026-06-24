import { readData, updateData } from "./jsonStore.js";

const FILE = "loans.json";
const LOAN_DURATION_DAYS = 14;

export async function getAll() {
  const loans = await readData(FILE);
  return [...loans].sort((a, b) => new Date(b.borrowedAt) - new Date(a.borrowedAt));
}

export async function getActiveCountsByBook() {
  const loans = await readData(FILE);
  const counts = {};
  for (const loan of loans) {
    if (!loan.returnedAt) {
      counts[loan.bookId] = (counts[loan.bookId] || 0) + 1;
    }
  }
  return counts;
}

export function createLoans(items, borrower) {
  return updateData(FILE, async (loans) => {
    const books = await readData("books.json");
    const now = new Date();
    const dueAt = new Date(now.getTime() + LOAN_DURATION_DAYS * 24 * 60 * 60 * 1000).toISOString();
    const newLoans = [];

    for (const { bookId, quantity } of items) {
      const book = books.find((b) => b.id === bookId);
      if (!book) return { error: `Book ${bookId} not found` };
      const activeCount = loans.filter((l) => l.bookId === bookId && !l.returnedAt).length;
      const available = (book.libraryCopies || 0) - activeCount;
      if (quantity > available) {
        return { error: `Not enough copies available to borrow for "${book.title}"` };
      }
      for (let i = 0; i < quantity; i++) {
        newLoans.push({
          id: crypto.randomUUID(),
          bookId: book.id,
          title: book.title,
          author: book.author,
          coverUrl: book.coverUrl,
          borrower,
          borrowedAt: now.toISOString(),
          dueAt,
          returnedAt: null,
        });
      }
    }

    loans.push(...newLoans);
    return { loans: newLoans };
  });
}

export function returnLoan(id) {
  return updateData(FILE, (loans) => {
    const loan = loans.find((l) => l.id === id);
    if (!loan) return null;
    if (loan.returnedAt) return loan;
    loan.returnedAt = new Date().toISOString();
    return loan;
  });
}
