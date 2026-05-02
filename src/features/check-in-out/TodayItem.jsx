import styled from "styled-components";
import { Link } from "react-router-dom";
import { Flag } from "../../ui/Flag";
import Tag from "../../ui/Tag";
import Button from "../../ui/Button";
import CheckoutButton from "./CheckoutButton";

const StyledTodayItem = styled.li`
  display: grid;
  grid-template-columns: 9rem 2rem 1fr 7rem 9rem;
  gap: 1.2rem;
  align-items: center;

  font-size: 1.4rem;
  padding: 0.8rem 0;
  border-bottom: 1px solid var(--color-grey-100);

  &:first-child {
    border-top: 1px solid var(--color-grey-100);
  }
`;

const Guest = styled.div`
  font-weight: 500;
`;
function TodayItem({ activity }) {
  const { id, status, guests, numNights } = activity;

  const statusToAction = {
    unconfirmed: {
      label: "Arriving",
      tag: "green",
      button: (
        <Button
          variation="primary"
          size="small"
          as={Link}
          to={`/checkin/${id}`}
        >
          Check in
        </Button>
      ),
    },
    "checked-in": {
      label: "Departing",
      tag: "blue",
      button: <CheckoutButton bookingId={id} />,
    },
  };

  const countryLabel = guests?.country ?? guests?.nationality ?? "country";

  return (
    <StyledTodayItem>
      <Tag type={statusToAction?.[status]?.tag ?? "blue"}>
        {statusToAction?.[status]?.label ?? status}
      </Tag>

      <Flag src={guests?.countryFlag} alt={`Flag of ${countryLabel}`} />
      <Guest>{guests?.fullName}</Guest>
      <div>{numNights} nights</div>

      {statusToAction?.[status]?.button ?? null}
    </StyledTodayItem>
  );
}

export default TodayItem;
