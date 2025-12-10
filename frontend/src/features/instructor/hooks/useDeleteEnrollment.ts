import { useMutation } from "@tanstack/react-query";
import { deleteEnrollment } from "../api/deleteEnrollment";
import { queryClient } from "../../../lib/queryClient";

export const useDeleteEnrollment = () => {
  return useMutation({
    mutationFn: deleteEnrollment,
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ["enrollments"] });
    },
  });
};