import { Navigate } from "react-router-dom";

function AdminProtectedRoute({ children }) {
  const token = localStorage.getItem("token");

  return token
    ? children
    : <Navigate to="/admin-login" />;
}

export default AdminProtectedRoute;