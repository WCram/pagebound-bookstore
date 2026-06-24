import { Link, useLocation, useParams } from "react-router-dom";

export default function OrderConfirmationPage() {
  const { id } = useParams();
  const { state } = useLocation();
  const order = state?.order;

  return (
    <div className="order-confirmation">
      <h1>Order Placed!</h1>
      <p>Thank you{order ? `, ${order.customer.name}` : ""}. Your order has been confirmed.</p>
      <p className="order-id">Order ID: {id}</p>
      {order && (
        <div className="order-summary">
          {order.items.map((item) => (
            <div key={item.bookId} className="order-summary-row">
              <span>
                {item.title} &times; {item.quantity}
              </span>
              <span>${(item.price * item.quantity).toFixed(2)}</span>
            </div>
          ))}
          <div className="order-summary-total">
            <span>Total</span>
            <span>${order.total.toFixed(2)}</span>
          </div>
        </div>
      )}
      <Link to="/" className="primary-button">
        Continue Shopping
      </Link>
    </div>
  );
}
