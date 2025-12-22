import { useMutation } from "@tanstack/react-query";
import { addAssignment } from "../../api/assignments/addAssignment";
import { queryClient } from "../../../../lib/queryClient";

export const useAddAssignment = () => {
  return useMutation({
    mutationFn: addAssignment,
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ["assignments"] });
    },
  })
}