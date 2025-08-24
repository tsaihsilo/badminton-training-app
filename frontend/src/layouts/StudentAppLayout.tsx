import { useAuthSessionQuery } from "../features/auth/hooks/useAuthSessionQuery";
import { BaseAppLayout } from "./shared/BaseAppLayout";
import { studentNavItems } from "./shared/navItems";
import { useNavWithSignOut } from "./shared/useNavWithSignOut";

export const StudentAppLayout = () => {
  const { data } = useAuthSessionQuery();
  const username = data?.user?.username ?? "student";
  const navItems = useNavWithSignOut(studentNavItems);

  return <BaseAppLayout username={username} navItems={navItems}/>;
}