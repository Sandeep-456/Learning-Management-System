import { Navigate } from "react-router-dom";
import { useAuth } from "../context/AuthContext";

export default function ProtectedRoute({ children }) {
  const { auth } = useAuth();

  if (auth.loading) return null; // can show loader if needed

  return auth.isLoggedIn ? children : <Navigate to="/login" replace />;
}
