import { useNavigate } from "react-router-dom";
import { useMutation, useQueryClient } from "@tanstack/react-query";
import { logoutMutation } from "../../features/auth/api/logoutMutation";
import { NavItem } from "./navItems";

export function useNavWithSignOut(baseItems: NavItem[]): NavItem[] {
  const navigate = useNavigate();
  const queryClient = useQueryClient();

  const { mutateAsync } = useMutation({ mutationFn: logoutMutation });

  const onSignOut = async () => {
    try { 
      await mutateAsync();
      await queryClient.invalidateQueries({ queryKey: ["authSession"] });
    }
    catch (err) {
      console.error("Logout failed:", err);
      navigate("/auth/login", { replace: true });
    }
  };

  return [...baseItems, { title: "Sign Out", action: onSignOut }];
}