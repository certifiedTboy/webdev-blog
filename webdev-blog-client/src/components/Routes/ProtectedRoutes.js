import React from "react";
import { useNavigate, Navigate } from "react-router-dom";

export const ProtectedRoutes = ({ user, children }) => {
  if (!user) {
    return <Navigate to="/login" replace />;
  }
  return children;
};

export const AdminProtectedRoutes = ({ user, children }) => {
  const navigate = useNavigate();
  if (!user) {
    return <Navigate to="/login" replace />;
  }

  if (user.userType !== "Admin") {
    return navigate(-1);
  }

  return children;
};
