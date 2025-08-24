import { useAuthSessionQuery } from "../features/auth/hooks/useAuthSessionQuery";
import { BaseAppLayout } from "./shared/BaseAppLayout";
import { instructorNavItems } from "./shared/navItems";
import { useNavWithSignOut } from "./shared/useNavWithSignOut";

export const InstructorAppLayout = () => {
  const { data } = useAuthSessionQuery();
  const username = data?.user?.username ?? "instructor";
  const navItems = useNavWithSignOut(instructorNavItems);

  return <BaseAppLayout username={username} navItems={navItems} />;
}