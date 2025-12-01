import { Navigate, Outlet } from "react-router-dom";
import { useCurrentUser } from "../features/user/hooks/useCurrentUser"

export const PublicRoute = () => {
  const { data, isLoading, error } = useCurrentUser();
  const token = localStorage.getItem("token");

  if (isLoading) return <div>Loading...</div>;

  if (token && !error && data?.username) {
    return <Navigate to="/app" replace />;
  }

  return <Outlet />;
}