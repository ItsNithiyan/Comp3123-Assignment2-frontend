// src/App.js

import React from 'react';
import { Routes, Route } from 'react-router-dom';
import Login from './components/Auth/Login';
import Signup from './components/Auth/Signup';
import EmployeeList from './components/Employees/EmployeeList';
import AddEmployee from './components/Employees/AddEmployee';
import EditEmployee from './components/Employees/EditEmployee';
import PrivateRoute from './components/Auth/PrivateRoute';

function App() {
  return (
    <Routes>
      <Route path="/" element={<Login />} />
      <Route path="/signup" element={<Signup />} />
      <Route 
        path="/employees/edit/:id" 
        element={
          <PrivateRoute>
            <EditEmployee />
          </PrivateRoute>
        } 
      />
      <Route 
        path="/employees/add" 
        element={
          <PrivateRoute>
            <AddEmployee />
          </PrivateRoute>
        } 
      />
      <Route 
        path="/employees" 
        element={
          <PrivateRoute>
            <EmployeeList />
          </PrivateRoute>
        } 
      />
      {/* Add more routes as needed */}
    </Routes>
  );
}

export default App;
