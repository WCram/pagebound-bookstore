import { Link } from "react-router-dom";
import { useCart } from "../context/CartContext";
import { useBorrowBag } from "../context/BorrowContext";

export default function NavBar() {
  const { totalCount } = useCart();
  const { totalCount: borrowCount } = useBorrowBag();

  return (
    <header className="navbar">
      <Link to="/" className="navbar-brand">
        Pagebound Books
      </Link>
      <nav className="navbar-links">
        <Link to="/">Catalog</Link>
        <Link to="/library-3d">3D Library</Link>
        <Link to="/admin">Admin</Link>
        <Link to="/borrow-bag" className="cart-link">
          Borrow Bag
          {borrowCount > 0 && <span className="cart-badge">{borrowCount}</span>}
        </Link>
        <Link to="/cart" className="cart-link">
          Cart
          {totalCount > 0 && <span className="cart-badge">{totalCount}</span>}
        </Link>
      </nav>
    </header>
  );
}
