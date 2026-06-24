import { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import { useBorrowBag } from "../context/BorrowContext";
import { createLoans } from "../api/client";

const LOAN_DURATION_DAYS = 14;

export default function BorrowCheckoutPage() {
  const { items, clearBag } = useBorrowBag();
  const navigate = useNavigate();
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [error, setError] = useState(null);
  const [submitting, setSubmitting] = useState(false);

  if (items.length === 0) {
    return (
      <div>
        <h1>Borrow Checkout</h1>
        <p className="empty-state">
          Your borrow bag is empty. <Link to="/">Browse books</Link>
        </p>
      </div>
    );
  }

  const dueDate = new Date(Date.now() + LOAN_DURATION_DAYS * 24 * 60 * 60 * 1000);

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (submitting) return;
    setSubmitting(true);
    setError(null);
    try {
      const result = await createLoans(
        items.map((i) => ({ bookId: i.bookId, quantity: i.quantity })),
        { name, email }
      );
      clearBag();
      navigate("/loans/confirmation", { state: { loans: result.loans } });
    } catch (err) {
      setError(err.message);
      setSubmitting(false);
    }
  };

  return (
    <div>
      <h1>Borrow Checkout</h1>
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
          <button type="submit" className="secondary-button" disabled={submitting}>
            {submitting ? "Borrowing..." : "Confirm Borrow"}
          </button>
        </form>
        <div className="order-summary">
          <h2>Borrowing Summary</h2>
          {items.map((item) => (
            <div key={item.bookId} className="order-summary-row">
              <span>
                {item.title} &times; {item.quantity}
              </span>
            </div>
          ))}
          <p className="due-date-note">
            Due back by <strong>{dueDate.toLocaleDateString()}</strong> ({LOAN_DURATION_DAYS} days
            from today)
          </p>
        </div>
      </div>
    </div>
  );
}
