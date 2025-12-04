import { Outlet } from "react-router-dom";

const AuthLayout = () => {
  return (
    <div className="auth-shell">
      <div className="auth-panel">
        <Outlet />
      </div>
    </div>
  );
};

export default AuthLayout;

