import { Navigate, Outlet } from "react-router-dom";
import { useAuthSessionQuery } from "../features/auth/hooks/useAuthSessionQuery";

export const PrivateRoute = () => {
  const { data, isLoading } = useAuthSessionQuery();

  if (isLoading) return <div>Loading...</div>;

  if (!data?.isAuthenticated) {
    return <Navigate to="/auth/login" replace />;
  } 

  return <Outlet />;

};
