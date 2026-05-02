import { useMutation, useQueryClient } from "@tanstack/react-query";
import { updateCurrentUser } from "../../services/apiAuth";
import toast from "react-hot-toast";

function useUpdateUser() {
  const queryClient = useQueryClient();

  const { mutate: updateUser, isLoading: isUpdating } = useMutation({
    mutationFn: ({ fullName, password, avatar }) =>
      updateCurrentUser({ fullName, password, avatar }),
    onSuccess: (user) => {
      queryClient.invalidateQueries({ queryKey: ["user"] });
      toast.success("User updated successfully");
    },
    onError: (err) => {
      toast.error(err.message ?? "Error updating user");
    },
  });

  return { updateUser, isUpdating };
}

export default useUpdateUser;
