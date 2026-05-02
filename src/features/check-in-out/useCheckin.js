import { useMutation, useQueryClient } from "@tanstack/react-query";
import { updateBooking } from "../../services/apiBookings";
import toast from "react-hot-toast";

export function useCheckin() {
  const queryClient = useQueryClient();

  const { mutate: checkin, isLoading: isCheckinIn } = useMutation({
    mutationFn: ({ bookingId, Obj }) => updateBooking(bookingId, Obj),
    onSuccess: () => {
      toast.success("Checked in ! ");
      queryClient.invalidateQueries({ active: true });
    },
    onError: (err) => {
      toast.error(err);
    },
  });

  return { checkin, isCheckinIn };
}
