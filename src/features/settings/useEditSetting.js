import { useMutation, useQueryClient } from "@tanstack/react-query";
import { updateSetting } from "../../services/apiSettings";
import toast from "react-hot-toast";

export function useEditSetting() {
  const queryClient = useQueryClient();
  const {
    mutate: editSetting,
    isLoading: isEdit,
    error,
  } = useMutation({
    mutationFn: (newSetting) => updateSetting(newSetting),
    onSuccess: () => {
      toast.success("updated");
      queryClient.invalidateQueries("settings");
    },
    onError: (error) => {
      toast.error("error update");
      console.log(error);
    },
  });

  return { editSetting, isEdit };
}
