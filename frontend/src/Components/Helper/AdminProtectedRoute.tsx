import { type JSX } from "react";
import { Navigate } from "react-router-dom";

const AdminProtectedRoute = ({ children }: { children: JSX.Element }) => {
  const isAuth = localStorage.getItem("token");

  if (!isAuth) {
    return <Navigate to="/admin/login" replace />;
  }

  return children;
};

export default AdminProtectedRoute;
