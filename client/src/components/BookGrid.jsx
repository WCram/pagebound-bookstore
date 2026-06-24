import BookCard from "./BookCard";

export default function BookGrid({ books }) {
  if (books.length === 0) {
    return <p className="empty-state">No books found.</p>;
  }

  return (
    <div className="book-grid">
      {books.map((book) => (
        <BookCard key={book.id} book={book} />
      ))}
    </div>
  );
}
