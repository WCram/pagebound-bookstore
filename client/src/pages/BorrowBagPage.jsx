import { Link } from "react-router-dom";
import { useBorrowBag } from "../context/BorrowContext";
import QuantityInput from "../components/QuantityInput";

export default function BorrowBagPage() {
  const { items, removeItem, updateQuantity } = useBorrowBag();

  if (items.length === 0) {
    return (
      <div>
        <h1>Borrow Bag</h1>
        <p className="empty-state">
          Your borrow bag is empty. <Link to="/">Browse books</Link>
        </p>
      </div>
    );
  }

  return (
    <div>
      <h1>Borrow Bag</h1>
      <div className="cart-list">
        {items.map((item) => (
          <div key={item.bookId} className="cart-row">
            <img src={item.coverUrl} alt={`Cover of ${item.title}`} className="cart-row-cover" />
            <div className="cart-row-info">
              <Link to={`/books/${item.bookId}`}>{item.title}</Link>
              <p>{item.author}</p>
            </div>
            <QuantityInput
              value={item.quantity}
              onChange={(qty) => updateQuantity(item.bookId, qty)}
            />
            <button className="remove-button" onClick={() => removeItem(item.bookId)}>
              Remove
            </button>
          </div>
        ))}
      </div>
      <div className="cart-summary">
        <p className="cart-total">{items.length} title(s) in your borrow bag</p>
        <Link to="/borrow-checkout" className="secondary-button">
          Proceed to Borrow
        </Link>
      </div>
    </div>
  );
}
