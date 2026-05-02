//GET THE ID FROM PAGE
//PUT IT IN REACT QUERY
//CALL THE API WITH ID
//
//<BookingDataBox booking={booking} />

import { useQuery } from "@tanstack/react-query";
import { get } from "react-hook-form";
import { useParams } from "react-router-dom";
import { getBooking } from "../../services/apiBookings";

export function useBooking() {
  const { id: bookingID } = useParams();
  const {
    data: booking,
    error,
    isLoading,
  } = useQuery({
    queryKey: ["booking", bookingID],
    queryFn: () => getBooking(bookingID),
  });
  if (error) {
    console.log(error);
  }

  return { booking, error, isLoading };
}
