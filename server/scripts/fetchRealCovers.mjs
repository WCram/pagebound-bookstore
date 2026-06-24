import fs from "fs";
import path from "path";
import { fileURLToPath } from "url";

const __dirname = path.dirname(fileURLToPath(import.meta.url));
const booksPath = path.join(__dirname, "..", "data", "books.json");
const books = JSON.parse(fs.readFileSync(booksPath, "utf-8"));

async function findCoverId(title, author) {
  const url = `https://openlibrary.org/search.json?title=${encodeURIComponent(
    title
  )}&author=${encodeURIComponent(author)}&limit=1`;
  const res = await fetch(url);
  if (!res.ok) return null;
  const data = await res.json();
  const doc = data.docs?.[0];
  return doc?.cover_i || null;
}

const results = [];
for (const book of books) {
  const coverId = await findCoverId(book.title, book.author);
  if (coverId) {
    const coverUrl = `https://covers.openlibrary.org/b/id/${coverId}-L.jpg`;
    results.push({ id: book.id, title: book.title, coverUrl });
  } else {
    results.push({ id: book.id, title: book.title, coverUrl: null });
  }
}

console.log(JSON.stringify(results));
