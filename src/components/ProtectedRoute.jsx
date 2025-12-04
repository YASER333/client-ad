import { Navigate, Outlet } from 'react-router-dom';
import useAuth from '../hooks/useAuth';
import LoadingSpinner from './feedback/LoadingSpinner';

const ProtectedRoute = ({ role, redirectTo = '/login/admin' }) => {
  const { user, loading } = useAuth();

  if (loading) {
    return (
      <div className="center-wrapper">
        <LoadingSpinner message="Checking session..." />
      </div>
    );
  }

  if (!user) {
    return <Navigate to={redirectTo} replace />;
  }

  if (role && user.role !== role) {
    return <Navigate to="/" replace />;
  }

  return <Outlet />;
};

export default ProtectedRoute;


