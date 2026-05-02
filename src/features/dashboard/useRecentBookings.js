import { useSearchParams } from "react-router-dom";
import { useQuery } from "@tanstack/react-query";
import { getBookingsAfterDate } from "../../services/apiBookings";

export function useRecentBookings() {
  //get the dynamic state from the link
  const [searchParams] = useSearchParams();
  const numberDays = !searchParams.get("last")
    ? 7
    : Number(searchParams.get("last"));

  //compute the (date)
  const date = new Date(Date.now() - numberDays * 24 * 60 * 60 * 1000);
  date.setUTCHours(0, 0, 0, 0);
  const { data: recentBookings, isLoading: isComputingBookings } = useQuery({
    queryKey: ["RecentBookings", numberDays],
    queryFn: () => getBookingsAfterDate(date.toISOString()),
  });

  return { recentBookings, isComputingBookings };
  //call react query on it  with key RecentBookings
  //error handling
}
