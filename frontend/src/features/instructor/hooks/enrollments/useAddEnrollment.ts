import { useMutation } from "@tanstack/react-query";
import { addEnrollment } from "../../api/enrollments/addEnrollment";
import { queryClient } from "../../../../lib/queryClient";

export const useAddEnrollment = () => {
  return useMutation({
    mutationFn: addEnrollment,
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ["enrollments"] });
    },
  });
};