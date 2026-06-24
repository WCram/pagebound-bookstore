import { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import { useCart } from "../context/CartContext";
import { createOrder } from "../api/client";

export default function CheckoutPage() {
  const { items, totalPrice, clearCart } = useCart();
  const navigate = useNavigate();
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [error, setError] = useState(null);
  const [submitting, setSubmitting] = useState(false);

  if (items.length === 0) {
    return (
      <div>
        <h1>Checkout</h1>
        <p className="empty-state">
          Your cart is empty. <Link to="/">Browse books</Link>
        </p>
      </div>
    );
  }

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (submitting) return;
    setSubmitting(true);
    setError(null);
    try {
      const order = await createOrder({
        items: items.map((i) => ({ bookId: i.bookId, quantity: i.quantity })),
        customer: { name, email },
      });
      clearCart();
      navigate(`/order/${order.id}`, { state: { order } });
    } catch (err) {
      setError(err.message);
      setSubmitting(false);
    }
  };

  return (
    <div>
      <h1>Checkout</h1>
      <div className="checkout-layout">
        <form onSubmit={handleSubmit} className="checkout-form">
          <label>
            Name
            <input type="text" required value={name} onChange={(e) => setName(e.target.value)} />
          </label>
          <label>
            Email
            <input
              type="email"
              required
              value={email}
              onChange={(e) => setEmail(e.target.value)}
            />
          </label>
          {error && <p className="error-text">{error}</p>}
          <button type="submit" className="primary-button" disabled={submitting}>
            {submitting ? "Placing Order..." : "Place Order"}
          </button>
        </form>
        <div className="order-summary">
          <h2>Order Summary</h2>
          {items.map((item) => (
            <div key={item.bookId} className="order-summary-row">
              <span>
                {item.title} &times; {item.quantity}
              </span>
              <span>${(item.price * item.quantity).toFixed(2)}</span>
            </div>
          ))}
          <div className="order-summary-total">
            <span>Total</span>
            <span>${totalPrice.toFixed(2)}</span>
          </div>
        </div>
      </div>
    </div>
  );
}
