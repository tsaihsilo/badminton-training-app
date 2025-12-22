import { useMutation } from "@tanstack/react-query";
import { queryClient } from "../../../../lib/queryClient";
import { deleteAssignment } from "../../api/assignments/deleteAssignment";

export const useDeleteAssignment = () => {
  return useMutation({
    mutationFn: deleteAssignment,
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ["assignments"]});
    }
  })
}