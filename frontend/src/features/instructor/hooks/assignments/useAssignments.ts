import { useQuery } from "@tanstack/react-query";
import { getAssignments } from "../../api/assignments/getAssignments";

export const useAssignments = () => {
  return useQuery({
    queryKey: ["assignments"],
    queryFn: getAssignments,
  });
};