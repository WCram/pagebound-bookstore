import { Outlet } from "react-router-dom";
import NavBar from "./NavBar";

export default function Layout() {
  return (
    <div className="app-shell">
      <NavBar />
      <main className="page-content">
        <Outlet />
      </main>
    </div>
  );
}
