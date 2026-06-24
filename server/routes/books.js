import { Router } from "express";
import * as booksRepo from "../db/booksRepo.js";
import * as loansRepo from "../db/loansRepo.js";

const router = Router();

async function withAvailableCopies(books) {
  const activeCounts = await loansRepo.getActiveCountsByBook();
  const list = Array.isArray(books) ? books : [books];
  const result = list.map((b) => ({
    ...b,
    availableCopies: Math.max(0, (b.libraryCopies || 0) - (activeCounts[b.id] || 0)),
  }));
  return Array.isArray(books) ? result : result[0];
}

router.get("/", async (req, res) => {
  const { q, category } = req.query;
  let books = await booksRepo.getAll();
  if (q) {
    const term = q.toLowerCase();
    books = books.filter(
      (b) =>
        b.title.toLowerCase().includes(term) ||
        b.author.toLowerCase().includes(term) ||
        (b.category || "").toLowerCase().includes(term)
    );
  }
  if (category) {
    books = books.filter((b) => (b.category || "").toLowerCase() === category.toLowerCase());
  }
  res.json(await withAvailableCopies(books));
});

router.get("/:id", async (req, res) => {
  const book = await booksRepo.getById(req.params.id);
  if (!book) return res.status(404).json({ error: "Book not found" });
  res.json(await withAvailableCopies(book));
});

function validateBook(body, { partial = false } = {}) {
  const errors = [];
  if (!partial || body.title !== undefined) {
    if (typeof body.title !== "string" || !body.title.trim()) errors.push("title is required");
  }
  if (!partial || body.author !== undefined) {
    if (typeof body.author !== "string" || !body.author.trim()) errors.push("author is required");
  }
  if (!partial || body.price !== undefined) {
    if (typeof body.price !== "number" || body.price < 0) errors.push("price must be a non-negative number");
  }
  if (!partial || body.stock !== undefined) {
    if (typeof body.stock !== "number" || body.stock < 0 || !Number.isInteger(body.stock))
      errors.push("stock must be a non-negative integer");
  }
  if (!partial || body.libraryCopies !== undefined) {
    if (
      typeof body.libraryCopies !== "number" ||
      body.libraryCopies < 0 ||
      !Number.isInteger(body.libraryCopies)
    )
      errors.push("libraryCopies must be a non-negative integer");
  }
  return errors;
}

router.post("/", async (req, res) => {
  const errors = validateBook(req.body);
  if (errors.length) return res.status(400).json({ error: errors.join(", ") });
  const { title, author, price, coverUrl, description, category, stock, libraryCopies } = req.body;
  const book = await booksRepo.create({
    title,
    author,
    price,
    coverUrl: coverUrl || "",
    description: description || "",
    category: category || "",
    stock,
    libraryCopies: libraryCopies || 0,
  });
  res.status(201).json(await withAvailableCopies(book));
});

router.put("/:id", async (req, res) => {
  const errors = validateBook(req.body, { partial: true });
  if (errors.length) return res.status(400).json({ error: errors.join(", ") });
  const updated = await booksRepo.update(req.params.id, req.body);
  if (!updated) return res.status(404).json({ error: "Book not found" });
  res.json(await withAvailableCopies(updated));
});

router.delete("/:id", async (req, res) => {
  const removed = await booksRepo.remove(req.params.id);
  if (!removed) return res.status(404).json({ error: "Book not found" });
  res.status(204).end();
});

export default router;
