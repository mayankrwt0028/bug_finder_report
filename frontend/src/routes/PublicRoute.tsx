import { Navigate, Outlet } from "react-router-dom";
import { useAuth } from "../context/AuthContext";

const PublicRoute = () => {
  const { token, user } = useAuth();

  if (!token) return <Outlet />;

  switch (user?.role) {
    case "ADMIN":
      return <Navigate to="/admin/dashboard" replace />;

    case "MANAGER":
      return <Navigate to="/manager/dashboard" replace />;

    case "DEVELOPER":
      return <Navigate to="/developer/dashboard" replace />;

    default:
      return <Navigate to="/qa/dashboard" replace />;
  }
};

export default PublicRoute;
