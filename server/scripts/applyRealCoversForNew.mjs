import fs from "fs";

const created = JSON.parse(fs.readFileSync("created_books.tmp.json", "utf-8"));
const createdIds = new Set(created.map((b) => b.id));

async function findCoverId(title, author) {
  const url = `https://openlibrary.org/search.json?title=${encodeURIComponent(
    title
  )}&author=${encodeURIComponent(author)}&limit=1`;
  const res = await fetch(url);
  if (!res.ok) return null;
  const data = await res.json();
  return data.docs?.[0]?.cover_i || null;
}

const allBooksRes = await fetch("http://localhost:4000/api/books");
const allBooks = await allBooksRes.json();
const targets = allBooks.filter(
  (b) => createdIds.has(b.id) && b.category !== "Staff Picks" && !b.coverUrl
);

console.log(`${targets.length} books still need covers`);

const misses = [];
for (const book of targets) {
  let coverId;
  try {
    coverId = await findCoverId(book.title, book.author);
  } catch (err) {
    console.error("SEARCH FAILED", book.title, err.message);
    misses.push(book);
    continue;
  }
  if (!coverId) {
    misses.push(book);
    continue;
  }
  const coverUrl = `https://covers.openlibrary.org/b/id/${coverId}-L.jpg`;
  try {
    const res = await fetch(`http://localhost:4000/api/books/${book.id}`, {
      method: "PUT",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ coverUrl }),
    });
    console.log(book.title, "->", coverUrl, res.status);
  } catch (err) {
    console.error("PUT FAILED", book.title, err.message);
    misses.push(book);
  }
}

if (misses.length) {
  console.log("MISSES:", JSON.stringify(misses.map((b) => ({ id: b.id, title: b.title, author: b.author }))));
}
