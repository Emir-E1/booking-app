import { useMutation, useQueryClient } from "@tanstack/react-query";
import { updateBooking } from "../../services/apiBookings";
import toast from "react-hot-toast";

export function useCheckout() {
  const queryClient = useQueryClient();

  const { mutate: checkout, isLoading: isCheckinOut } = useMutation({
    mutationFn: (bookingId) =>
      updateBooking(bookingId, {
        status: "checked-out",
      }),
    onSuccess: () => {
      toast.success("Checked Out ! ");
      queryClient.invalidateQueries({ active: true });
    },
    onError: (err) => {
      toast.error(err);
    },
  });

  return { checkout, isCheckingOut: isCheckinOut };
}
