import { Link, useLocation } from "react-router-dom";

export default function LoanConfirmationPage() {
  const { state } = useLocation();
  const loans = state?.loans || [];

  return (
    <div className="order-confirmation">
      <h1>Books Borrowed!</h1>
      <p>Your loan has been confirmed. Please return these by the due date below.</p>
      {loans.length > 0 && (
        <div className="order-summary">
          {loans.map((loan) => (
            <div key={loan.id} className="order-summary-row">
              <span>{loan.title}</span>
              <span>Due {new Date(loan.dueAt).toLocaleDateString()}</span>
            </div>
          ))}
        </div>
      )}
      <Link to="/" className="primary-button">
        Continue Browsing
      </Link>
    </div>
  );
}
