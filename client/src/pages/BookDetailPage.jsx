import { useEffect, useState } from "react";
import { useNavigate, useParams } from "react-router-dom";
import { getBook } from "../api/client";
import { useCart } from "../context/CartContext";
import { useBorrowBag } from "../context/BorrowContext";
import QuantityInput from "../components/QuantityInput";

export default function BookDetailPage() {
  const { id } = useParams();
  const navigate = useNavigate();
  const { addItem: addToCart } = useCart();
  const { addItem: addToBorrowBag } = useBorrowBag();
  const [book, setBook] = useState(null);
  const [quantity, setQuantity] = useState(1);
  const [borrowQuantity, setBorrowQuantity] = useState(1);
  const [error, setError] = useState(null);
  const [added, setAdded] = useState(false);
  const [addedToBorrowBag, setAddedToBorrowBag] = useState(false);

  useEffect(() => {
    setError(null);
    setBook(null);
    getBook(id).catch((err) => setError(err.message)).then((data) => data && setBook(data));
  }, [id]);

  if (error) return <p className="error-text">{error}</p>;
  if (!book) return <p>Loading...</p>;

  const handleAddToCart = () => {
    addToCart(book, quantity);
    setAdded(true);
  };

  const handleAddToBorrowBag = () => {
    addToBorrowBag(book, borrowQuantity);
    setAddedToBorrowBag(true);
  };

  return (
    <div className="book-detail">
      <button className="back-link" onClick={() => navigate(-1)}>
        &larr; Back
      </button>
      <div className="book-detail-content">
        <img src={book.coverUrl} alt={`Cover of ${book.title}`} className="book-detail-cover" />
        <div className="book-detail-info">
          <h1>{book.title}</h1>
          <p className="book-detail-author">by {book.author}</p>
          <p className="book-detail-category">{book.category}</p>
          <p className="book-detail-price">${book.price.toFixed(2)}</p>
          <p className="book-detail-description">{book.description}</p>

          <div className="detail-action-section">
            <h3>Buy a Copy</h3>
            <p className="book-detail-stock">
              {book.stock > 0 ? `${book.stock} in stock` : "Out of stock"}
            </p>
            {book.stock > 0 && (
              <div className="add-to-cart-row">
                <QuantityInput value={quantity} onChange={setQuantity} max={book.stock} />
                <button className="primary-button" onClick={handleAddToCart}>
                  Add to Cart
                </button>
              </div>
            )}
            {added && <p className="success-text">Added to cart!</p>}
          </div>

          <div className="detail-action-section">
            <h3>Borrow from the Library</h3>
            <p className="book-detail-stock">
              {book.availableCopies > 0
                ? `${book.availableCopies} of ${book.libraryCopies} copies available`
                : "No copies currently available"}
            </p>
            {book.availableCopies > 0 && (
              <div className="add-to-cart-row">
                <QuantityInput
                  value={borrowQuantity}
                  onChange={setBorrowQuantity}
                  max={book.availableCopies}
                />
                <button className="secondary-button" onClick={handleAddToBorrowBag}>
                  Add to Borrow Bag
                </button>
              </div>
            )}
            {addedToBorrowBag && <p className="success-text">Added to borrow bag!</p>}
          </div>
        </div>
      </div>
    </div>
  );
}
