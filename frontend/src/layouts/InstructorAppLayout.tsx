import { Navigate, Outlet } from "react-router-dom";
import { useCurrentUser } from "../features/user/hooks/useCurrentUser";
import { BaseAppLayout } from "./BaseAppLayout";
import { instructorNavItems } from "../shared/navItems";

export const InstructorAppLayout = () => {
  const { data, isLoading } = useCurrentUser();

  if (isLoading) return <div>Loading...</div>;

  if (!data.is_instructor) {
    return <Navigate to="/app/student" replace />;
  }

  return (
    <BaseAppLayout username={data.username} navItems={instructorNavItems}>
      <Outlet/>
    </BaseAppLayout>
  );
};