import { NavLink } from "react-router-dom";

export default function AdminTabs() {
  return (
    <div className="admin-tabs">
      <NavLink to="/admin" end className={({ isActive }) => (isActive ? "active" : "")}>
        Books
      </NavLink>
      <NavLink to="/admin/loans" className={({ isActive }) => (isActive ? "active" : "")}>
        Loans
      </NavLink>
    </div>
  );
}
