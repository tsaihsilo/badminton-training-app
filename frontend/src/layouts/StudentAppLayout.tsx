import { Navigate, Outlet } from "react-router-dom";
import { useCurrentUser } from "../features/user/hooks/useCurrentUser";
import { BaseAppLayout } from "./BaseAppLayout";
import { studentNavItems } from "../shared/navItems";

export const StudentAppLayout = () => {
  const { data, isLoading } = useCurrentUser();

  if (isLoading) return <div>Loading...</div>;

  if (data.is_instructor){
    return <Navigate to="/app/instructor" replace />;
  }

  return (
    <BaseAppLayout username={data.username} navItems={studentNavItems}>
      <Outlet />
    </BaseAppLayout>
  );
};