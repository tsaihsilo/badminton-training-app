import { useQuery } from "@tanstack/react-query";
import { getEnrollment } from "../../api/enrollments/getEnrollment";

export const useEnrollment = () => {
  return useQuery({
    queryKey: ["my_enrollment"],
    queryFn: getEnrollment,
  });
};