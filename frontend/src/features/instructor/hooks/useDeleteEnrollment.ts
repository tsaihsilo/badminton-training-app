import { useMutation } from "@tanstack/react-query";
import { queryClient } from "../../../lib/queryClient";
import { deleteEnrollment } from "../api/deleteEnrollment";

export const useDeleteEnrollment = () => {
  return useMutation({
    mutationFn: deleteEnrollment,
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ["enrollments"] });
    },
  });
};