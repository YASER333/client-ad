import { createContext, useEffect, useState, useCallback } from 'react';
import { adminLogin, studentLogin, logout as logoutApi } from '../api/auth';

export const AuthContext = createContext(null);

export const AuthProvider = ({ children }) => {
  // Load stored values
  const [user, setUser] = useState(() => {
    const stored = localStorage.getItem('rvs_user');
    return stored ? JSON.parse(stored) : null;
  });

  const [token, setToken] = useState(() => localStorage.getItem('rvs_token'));
  const [loading, setLoading] = useState(false);

  // Persist user
  useEffect(() => {
    if (user) {
      localStorage.setItem('rvs_user', JSON.stringify(user));
    } else {
      localStorage.removeItem('rvs_user');
    }
  }, [user]);

  // Persist token
  useEffect(() => {
    if (token) {
      localStorage.setItem('rvs_token', token);
    } else {
      localStorage.removeItem('rvs_token');
    }
  }, [token]);

  // Admin Login
  const loginAdmin = useCallback(async (credentials) => {
    setLoading(true);
    try {
      const data = await adminLogin(credentials);
      setUser(data.user);
      setToken(data.token);
      return data.user;
    } finally {
      setLoading(false);
    }
  }, []);

  // Student Login
  const loginStudent = useCallback(async (credentials) => {
    setLoading(true);
    try {
      const data = await studentLogin(credentials);
      setUser(data.user);
      setToken(data.token);
      return data.user;
    } finally {
      setLoading(false);
    }
  }, []);

  // Logout
  const logout = useCallback(async () => {
    try {
      await logoutApi();
    } catch (err) {
      console.warn('Logout failed', err);
    } finally {
      setUser(null);
      setToken(null);
    }
  }, []);

  return (
    <AuthContext.Provider
      value={{
        user,
        token,
        loading,
        loginAdmin,
        loginStudent,
        logout,

        // Role based helpers
        isAdmin: user?.role === 'ADMIN',
        isStudent: user?.role === 'STUDENT',
        isAuthenticated: Boolean(token),
      }}
    >
      {children}
    </AuthContext.Provider>
  );
};
