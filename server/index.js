import express from "express";
import cors from "cors";
import path from "path";
import { fileURLToPath } from "url";
import booksRouter from "./routes/books.js";
import ordersRouter from "./routes/orders.js";
import loansRouter from "./routes/loans.js";

const __dirname = path.dirname(fileURLToPath(import.meta.url));
const PORT = process.env.PORT || 4000;

const app = express();
app.use(cors());
app.use(express.json());
app.use("/covers", express.static(path.join(__dirname, "public", "covers")));

app.use("/api/books", booksRouter);
app.use("/api/orders", ordersRouter);
app.use("/api/loans", loansRouter);

app.listen(PORT, () => {
  console.log(`Server listening on http://localhost:${PORT}`);
});
