import { useUser } from "../features/authentication/useUser";
import Spinner from "../ui/Spinner";
import { Navigate } from "react-router-dom";
function ProtectedRoute({ children }) {
  const { isAuthenticated, isLoading } = useUser();

  if (isLoading) return <Spinner />;
  if (!isAuthenticated) return <Navigate to="/login" replace />;
  return children;
}

export default ProtectedRoute;
