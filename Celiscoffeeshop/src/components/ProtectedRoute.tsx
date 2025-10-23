import { type ReactNode } from 'react';
import { Navigate } from 'react-router-dom';

interface ProtectedRouteProps {
  children: ReactNode;
}

// Simple authentication check (you can enhance this with actual auth logic)
const isAuthenticated = (): boolean => {
  // Check if user is logged in (example: check localStorage)
  const user = localStorage.getItem('user');
  return !!user;
};

const ProtectedRoute = ({ children }: ProtectedRouteProps) => {
  if (!isAuthenticated()) {
    // Redirect to login page if not authenticated
    // Users can register from the login page if they don't have an account
    return <Navigate to="/login" replace />;
  }

  return <>{children}</>;
};

export default ProtectedRoute;

