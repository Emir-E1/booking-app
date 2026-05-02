import {
  FiBarChart,
  FiBriefcase,
  FiCalendar,
  FiDollarSign,
} from "react-icons/fi";
import Stat from "../dashboard/Stat";
import { formatCurrency } from "../../utils/helpers";
function Stats({
  recentBookings = [],
  confirmedStays = [],
  numDays,
  cabinsCount,
}) {
  const numBookings = recentBookings.length;
  const numStays = confirmedStays.length;
  const sales = recentBookings.reduce(
    (acc, curr) => acc + (curr.totalPrice ?? 0),
    0
  );
  const occupation =
    confirmedStays.reduce((acc, curr) => acc + (curr.numNights ?? 0), 0) /
    (numBookings * cabinsCount);

  return (
    <>
      <Stat
        icon={<FiBriefcase />}
        value={numBookings}
        color={"blue"}
        title={"Bookings"}
      />

      <Stat
        icon={<FiDollarSign />}
        value={formatCurrency(sales)}
        color={"green"}
        title={"Sales"}
      />

      <Stat
        icon={<FiCalendar />}
        value={numStays}
        color={"indigo"}
        title={"Check ins"}
      />

      <Stat
        icon={<FiBarChart />}
        value={Math.round(occupation * 100) + "%"}
        color={"yellow"}
        title={"Occupation Rates"}
      />
    </>
  );
}

export default Stats;
