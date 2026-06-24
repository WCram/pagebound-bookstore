import { Link } from "react-router-dom";

export default function BookCard({ book }) {
  return (
    <Link to={`/books/${book.id}`} className="book-card">
      <img src={book.coverUrl} alt={`Cover of ${book.title}`} className="book-card-cover" />
      <div className="book-card-info">
        <h3>{book.title}</h3>
        <p className="book-card-author">{book.author}</p>
        <p className="book-card-price">${book.price.toFixed(2)}</p>
      </div>
    </Link>
  );
}
