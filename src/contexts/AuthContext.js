// src/contexts/AuthContext.js

import React, { createContext, useState, useEffect } from 'react';
import api from '../services/api';

export const AuthContext = createContext();

export const AuthProvider = ({ children }) => {
  const [auth, setAuth] = useState({
    token: localStorage.getItem('token') || null,
    isAuthenticated: false,
    loading: true,
    user: null,
  });

  useEffect(() => {
    const loadUser = async () => {
      if (auth.token) {
        try {
          // Optionally, fetch user data here
          // Example:
          // const res = await api.get('/users/me');
          // setAuth({ ...auth, isAuthenticated: true, user: res.data, loading: false });

          setAuth(prevAuth => ({ ...prevAuth, isAuthenticated: true, loading: false }));
        } catch (err) {
          console.error(err);
          setAuth(prevAuth => ({ ...prevAuth, token: null, isAuthenticated: false, loading: false }));
        }
      } else {
        setAuth(prevAuth => ({ ...prevAuth, loading: false }));
      }
    };

    loadUser();
    // eslint-disable-next-line
  }, []);

  const login = (token) => {
    localStorage.setItem('token', token);
    setAuth(prevAuth => ({ ...prevAuth, token, isAuthenticated: true, loading: false }));
  };

  const logout = () => {
    localStorage.removeItem('token');
    setAuth(prevAuth => ({ ...prevAuth, token: null, isAuthenticated: false, loading: false }));
  };

  return (
    <AuthContext.Provider value={{ auth, login, logout }}>
      {children}
    </AuthContext.Provider>
  );
};
