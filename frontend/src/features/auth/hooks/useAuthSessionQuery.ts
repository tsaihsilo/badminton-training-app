import { useQuery } from "@tanstack/react-query";
import { getSession } from "../api/session";

export function useAuthSessionQuery() {
  return useQuery({
    queryKey: ["authSession"],
    queryFn: getSession
  })
}