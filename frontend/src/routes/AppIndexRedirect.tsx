import { Navigate } from "react-router-dom";
import { useCurrentUser } from "../features/user/hooks/useCurrentUser";

export const AppIndexRedirect = () => {
  const { data, isLoading } = useCurrentUser();

  if (isLoading) return <div>Loading...</div>;

  return <Navigate to={data?.is_instructor ? "/app/instructor" : "/app/student"} replace />;
}