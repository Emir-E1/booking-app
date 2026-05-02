import { useSearchParams } from "react-router-dom";
import { useQuery } from "@tanstack/react-query";
import { getStaysAfterDate } from "../../services/apiBookings";

export function useRecentStays() {
  const [searchParams] = useSearchParams();

  const numDays = !searchParams.get("last")
    ? 7
    : Number(searchParams.get("last"));

  const date = new Date(Date.now() - numDays * 24 * 60 * 60 * 1000);
  date.setUTCHours(0, 0, 0, 0);

  const { data: recentStays, isLoading: isComputingStays } = useQuery({
    queryKey: ["RecentStays", numDays],
    queryFn: () => getStaysAfterDate(date.toISOString()),
  });

  const confirmedStays = recentStays?.filter(
    (stay) => stay.status === "checked-in" || stay.status === "checked-out"
  );

  return { recentStays, confirmedStays, isComputingStays, numDays };
}
