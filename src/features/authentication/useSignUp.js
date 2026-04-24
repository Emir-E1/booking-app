import { useMutation } from "@tanstack/react-query";
import { signup } from "../../services/apiAuth";

import toast from "react-hot-toast";
function useSignUp() {
  const { mutate: signUp, isLoading: isSigningUp } = useMutation({
    mutationFn: ({ email, password, fullName, avatar }) =>
      signup({ email, password, fullName, avatar }),
    onSuccess: () => {
      toast.success("User Verified !");
    },
    onError: (err) => {
      toast.error(err.message ?? "Error in Log In");
    },
  });

  return { signUp, isSigningUp };
}

export default useSignUp;
