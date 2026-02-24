import { useMutation, useQueryClient } from "@tanstack/react-query";
import { postEditCabin } from "../../services/apiCabins";
import toast from "react-hot-toast";

export function usePostEditCabin(options = {}) {
  const { onSuccess: onSuccessCallback, onError: onErrorCallback } = options;
  const queryClient = useQueryClient();

  const { mutate, isPending: isEditing } = useMutation({
    mutationFn: ({ newCabinData, id }) => postEditCabin(newCabinData, id),
    onSuccess: (...args) => {
      queryClient.invalidateQueries({
        queryKey: ["cabins"],
      });
      onSuccessCallback?.(...args);
      toast.success(" Add Sucess !");
    },
    onError: (err) => {
      toast.error("Error editing!");
      onErrorCallback?.(err);
    },
  });

  return { mutate, isEditing };
}
