import { useEffect, useMemo, useState } from "react";
import { getBooks } from "../api/client";
import BookGrid from "../components/BookGrid";

export default function CatalogPage() {
  const [books, setBooks] = useState([]);
  const [query, setQuery] = useState("");
  const [category, setCategory] = useState("");
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    getBooks()
      .then(setBooks)
      .catch((err) => setError(err.message))
      .finally(() => setLoading(false));
  }, []);

  const categories = useMemo(
    () => [...new Set(books.map((b) => b.category).filter(Boolean))].sort(),
    [books]
  );

  const filteredBooks = useMemo(() => {
    const term = query.toLowerCase();
    return books.filter((b) => {
      const matchesQuery =
        !term ||
        b.title.toLowerCase().includes(term) ||
        b.author.toLowerCase().includes(term) ||
        (b.category || "").toLowerCase().includes(term);
      const matchesCategory = !category || b.category === category;
      return matchesQuery && matchesCategory;
    });
  }, [books, query, category]);

  return (
    <div>
      <div className="catalog-header">
        <h1>Browse Books</h1>
        <div className="catalog-filters">
          <input
            type="search"
            placeholder="Search by title, author, or category..."
            value={query}
            onChange={(e) => setQuery(e.target.value)}
            className="search-input"
          />
          <select
            value={category}
            onChange={(e) => setCategory(e.target.value)}
            className="category-select"
          >
            <option value="">All categories</option>
            {categories.map((c) => (
              <option key={c} value={c}>
                {c}
              </option>
            ))}
          </select>
        </div>
      </div>
      {error && <p className="error-text">{error}</p>}
      {loading ? <p>Loading...</p> : <BookGrid books={filteredBooks} />}
    </div>
  );
}
