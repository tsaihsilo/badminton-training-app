import { Navigate, Outlet } from "react-router-dom";
import { useAuthSessionQuery } from "../features/auth/hooks/useAuthSessionQuery";

export const PublicRoute = () => {
  const { data, isLoading } = useAuthSessionQuery();

  if (isLoading) return <div>Loading...</div>

  const isAuthenticated = data?.isAuthenticated;

  if (isAuthenticated) {
    return <Navigate to="/app" />;
  }
  
  return <Outlet />;
}