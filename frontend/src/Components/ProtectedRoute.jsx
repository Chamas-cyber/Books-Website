import React from "react";
import { Navigate } from "react-router-dom";

const ProtectedRoute = ({ children }) => {
  try {
    const token = localStorage.getItem("token");
    if (!token) {
      return <Navigate to="/" replace />;
    }
    return children;
  } catch (err) {
    return <Navigate to="/login" replace />;
  }
};

export default ProtectedRoute;
