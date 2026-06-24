import { Link } from "react-router-dom";
import { useCart } from "../context/CartContext";
import QuantityInput from "../components/QuantityInput";

export default function CartPage() {
  const { items, removeItem, updateQuantity, totalPrice } = useCart();

  if (items.length === 0) {
    return (
      <div>
        <h1>Your Cart</h1>
        <p className="empty-state">
          Your cart is empty. <Link to="/">Browse books</Link>
        </p>
      </div>
    );
  }

  return (
    <div>
      <h1>Your Cart</h1>
      <div className="cart-list">
        {items.map((item) => (
          <div key={item.bookId} className="cart-row">
            <img src={item.coverUrl} alt={`Cover of ${item.title}`} className="cart-row-cover" />
            <div className="cart-row-info">
              <Link to={`/books/${item.bookId}`}>{item.title}</Link>
              <p>${item.price.toFixed(2)} each</p>
            </div>
            <QuantityInput
              value={item.quantity}
              onChange={(qty) => updateQuantity(item.bookId, qty)}
            />
            <p className="cart-row-subtotal">${(item.price * item.quantity).toFixed(2)}</p>
            <button className="remove-button" onClick={() => removeItem(item.bookId)}>
              Remove
            </button>
          </div>
        ))}
      </div>
      <div className="cart-summary">
        <p className="cart-total">Total: ${totalPrice.toFixed(2)}</p>
        <Link to="/checkout" className="primary-button">
          Proceed to Checkout
        </Link>
      </div>
    </div>
  );
}
