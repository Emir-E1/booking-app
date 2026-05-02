import { useMutation, useQueryClient } from "@tanstack/react-query";
import { deleteBooking } from "../../services/apiBookings";
import toast from "react-hot-toast";
import { useNavigate } from "react-router-dom";

export function useDeleteBooking() {
  const queryClient = useQueryClient();
  const navigate = useNavigate();
  const { mutate: deleteBooked, isLoading: isDeletingBooking } = useMutation({
    mutationFn: (id) => deleteBooking(id),
    onSuccess: (id) => {
      toast.success(`Booking #${id} Deleted !`);
      queryClient.invalidateQueries({ active: true });
      navigate("/bookings");
    },
    onError: (err) => {
      toast.error("Error Occured !");
      console.log("Error of the Deleting :", err);
    },
  });

  return { deleteBooked, isDeletingBooking };
}
