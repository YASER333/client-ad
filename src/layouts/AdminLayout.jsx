import { NavLink, Outlet } from "react-router-dom";
import useAuth from "../hooks/useAuth";
import { useState } from "react";

const adminNav = [
  { to: "/admin/dashboard", label: "Dashboard" },
  { to: "/admin/students", label: "Students" },
  { to: "/admin/attendance", label: "Attendance" },
  { to: "/admin/reports", label: "Reports" },
  { to: "/admin/events", label: "Events" }
];

const AdminLayout = () => {
  const { user, logout } = useAuth();
  const [open, setOpen] = useState(false);

  return (
    <div className="app-shell">

      {/* SIDEBAR */}
      <aside className={`sidebar ${open ? "active" : ""}`}>
        <div className="brand">
          RVS College
        </div>

        <nav>
          {adminNav.map((item) => (
            <NavLink
              key={item.to}
              to={item.to}
              onClick={() => setOpen(false)}
            >
              {item.label}
            </NavLink>
          ))}
        </nav>
      </aside>

      {/* MAIN AREA */}
      <div className="main">

        {/* HEADER */}
        <header className="app-header">
          <div className="left">
            {/* Mobile Toggle */}
            <span className="menu-toggle" onClick={() => setOpen(!open)}>
              ☰
            </span>

            <div>
              <h1>Admin Panel</h1>
              <p>Welcome back, {user?.name}</p>
            </div>
          </div>

          <button className="btn primary" onClick={logout}>
            Logout
          </button>
        </header>

        {/* PAGE CONTENT */}
        <div className="app-content">
          <Outlet />
        </div>
      </div>
    </div>
  );
};

export default AdminLayout;

