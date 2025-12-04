import { useQuery } from "@tanstack/react-query";
import { getEnrollments } from "../api/getEnrollments";

export const useEnrollments = () => {
  return useQuery({
    queryKey: ["enrollments"],
    queryFn: getEnrollments,
  });
};