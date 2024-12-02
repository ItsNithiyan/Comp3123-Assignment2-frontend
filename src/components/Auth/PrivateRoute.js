// src/components/Auth/PrivateRoute.js

import React, { useContext } from 'react';
import { Navigate } from 'react-router-dom';
import { AuthContext } from '../../contexts/AuthContext';

const PrivateRoute = ({ children }) => {
  const { auth } = useContext(AuthContext);

  if (auth.loading) {
    // Optionally, return a loading indicator
    return null;
  }

  return auth.isAuthenticated ? children : <Navigate to="/" />;
};

export default PrivateRoute;
