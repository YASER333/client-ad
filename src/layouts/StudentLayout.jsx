import { NavLink, Outlet } from "react-router-dom";
import useAuth from "../hooks/useAuth";
import { useState } from "react";

const StudentLayout = () => {
  const { user, logout } = useAuth();
  const [open, setOpen] = useState(false);

  return (
    <div className="app-shell">

      {/* SIDEBAR */}
      <aside className={`sidebar ${open ? "active" : ""}`}>
        <div className="brand">
          My Attendance
        </div>

        <nav>
          <NavLink to="/student/dashboard" onClick={() => setOpen(false)}>
            Dashboard
          </NavLink>
        </nav>
      </aside>

      {/* MAIN AREA */}
      <div className="main">

        <header className="app-header">
          <div className="left">
            {/* mobile toggle */}
            <span className="menu-toggle" onClick={() => setOpen(!open)}>
              ☰
            </span>

            <div>
              <h1>Student Portal</h1>
              <p>{user?.name}</p>
            </div>
          </div>

          <button className="btn primary" onClick={logout}>
            Logout
          </button>
        </header>

        <div className="app-content">
          <Outlet />
        </div>
      </div>
    </div>
  );
};

export default StudentLayout;

