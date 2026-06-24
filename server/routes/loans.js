import { Router } from "express";
import * as loansRepo from "../db/loansRepo.js";

const router = Router();

router.get("/", async (req, res) => {
  res.json(await loansRepo.getAll());
});

router.post("/", async (req, res) => {
  const { items, borrower } = req.body;
  if (!Array.isArray(items) || items.length === 0) {
    return res.status(400).json({ error: "items must be a non-empty array" });
  }
  if (!borrower || typeof borrower.name !== "string" || typeof borrower.email !== "string") {
    return res.status(400).json({ error: "borrower.name and borrower.email are required" });
  }
  for (const item of items) {
    if (!item.bookId || typeof item.quantity !== "number" || item.quantity <= 0) {
      return res.status(400).json({ error: "each item needs a bookId and positive quantity" });
    }
  }

  const result = await loansRepo.createLoans(items, { name: borrower.name, email: borrower.email });
  if (result.error) return res.status(400).json({ error: result.error });

  res.status(201).json({ loans: result.loans });
});

router.put("/:id/return", async (req, res) => {
  const loan = await loansRepo.returnLoan(req.params.id);
  if (!loan) return res.status(404).json({ error: "Loan not found" });
  res.json(loan);
});

export default router;
