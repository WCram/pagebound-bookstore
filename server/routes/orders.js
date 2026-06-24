import { Router } from "express";
import * as ordersRepo from "../db/ordersRepo.js";
import * as booksRepo from "../db/booksRepo.js";

const router = Router();

router.get("/", async (req, res) => {
  res.json(await ordersRepo.getAll());
});

router.post("/", async (req, res) => {
  const { items, customer } = req.body;
  if (!Array.isArray(items) || items.length === 0) {
    return res.status(400).json({ error: "items must be a non-empty array" });
  }
  if (!customer || typeof customer.name !== "string" || typeof customer.email !== "string") {
    return res.status(400).json({ error: "customer.name and customer.email are required" });
  }
  for (const item of items) {
    if (!item.bookId || typeof item.quantity !== "number" || item.quantity <= 0) {
      return res.status(400).json({ error: "each item needs a bookId and positive quantity" });
    }
  }

  const result = await booksRepo.decrementStockForItems(items);
  if (result.error) return res.status(400).json({ error: result.error });

  const total = result.snapshots.reduce((sum, item) => sum + item.price * item.quantity, 0);
  const order = await ordersRepo.create({
    items: result.snapshots,
    total: Math.round(total * 100) / 100,
    customer: { name: customer.name, email: customer.email },
  });

  res.status(201).json(order);
});

export default router;
