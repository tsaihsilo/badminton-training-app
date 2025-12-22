import { useMutation } from "@tanstack/react-query";
import { updateAssignment } from "../../api/assignments/updateAssignment";
import { queryClient } from "../../../../lib/queryClient";

export const useUpdateAssignment = () => {
  return useMutation({
    mutationFn: updateAssignment,
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ["assignments"] });
    }
  });
};