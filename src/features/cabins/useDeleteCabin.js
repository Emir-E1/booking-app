import { useMutation, useQueryClient } from "@tanstack/react-query";
import { deleteCabin } from "../../services/apiCabins";
import toast from "react-hot-toast";

export function useDeleteCabin() {
  const queryClient = useQueryClient();

  const { mutate, isPending: isDeleting } = useMutation({
    mutationFn: deleteCabin,
    onSuccess: () => {
      toast.success("Deletion success");
      queryClient.invalidateQueries({
        queryKey: ["cabins"],
      });
    },
    onError: () => {
      toast.error("Error deletion");
    },
  });

  return { mutate, isDeleting };
}
