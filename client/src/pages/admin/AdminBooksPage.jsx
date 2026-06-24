import { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import { deleteBook, getBooks } from "../../api/client";
import AdminTabs from "../../components/AdminTabs";

export default function AdminBooksPage() {
  const [books, setBooks] = useState([]);
  const [error, setError] = useState(null);

  const load = () => {
    getBooks().then(setBooks).catch((err) => setError(err.message));
  };

  useEffect(load, []);

  const handleDelete = async (id) => {
    if (!window.confirm("Delete this book?")) return;
    try {
      await deleteBook(id);
      load();
    } catch (err) {
      setError(err.message);
    }
  };

  return (
    <div>
      <AdminTabs />
      <div className="admin-header">
        <h1>Manage Books</h1>
        <Link to="/admin/new" className="primary-button">
          Add Book
        </Link>
      </div>
      {error && <p className="error-text">{error}</p>}
      <table className="admin-table">
        <thead>
          <tr>
            <th>Title</th>
            <th>Author</th>
            <th>Price</th>
            <th>Stock</th>
            <th>Library Copies</th>
            <th></th>
          </tr>
        </thead>
        <tbody>
          {books.map((book) => (
            <tr key={book.id}>
              <td>{book.title}</td>
              <td>{book.author}</td>
              <td>${book.price.toFixed(2)}</td>
              <td>{book.stock}</td>
              <td>
                {book.availableCopies} / {book.libraryCopies || 0}
              </td>
              <td className="admin-row-actions">
                <Link to={`/admin/${book.id}/edit`}>Edit</Link>
                <button onClick={() => handleDelete(book.id)}>Delete</button>
              </td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
}
