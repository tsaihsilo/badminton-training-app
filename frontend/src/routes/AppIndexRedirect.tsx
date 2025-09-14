import { Navigate } from "react-router-dom";
import { useAuthSessionQuery } from "../features/auth/hooks/useAuthSessionQuery"

export const AppIndexRedirect = () => {
  const { data, isLoading } = useAuthSessionQuery();

  if (isLoading || typeof data?.isInstructor !== "boolean") return <div>Loading...</div>;

  return <Navigate to={data?.isInstructor ? "/app/instructor" : "/app/student"} replace />;
}