import styled from "styled-components";
import BookingDataBox from "../../features/bookings/BookingDataBox";

import Row from "../../ui/Row";
import Heading from "../../ui/Heading";
import ButtonGroup from "../../ui/ButtonGroup";
import Button from "../../ui/Button";
import ButtonText from "../../ui/ButtonText";

import { useMoveBack } from "../../hooks/useMoveBack";
import { useBooking } from "../bookings/useBooking";
import Spinner from "../../ui/Spinner";
import Checkbox from "../../ui/Checkbox";
import { useState } from "react";
import { useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { useCheckin } from "./useCheckin";
import { useSettings } from "../settings/useSetting";
import { formatCurrency } from "../../utils/helpers";

const Box = styled.div`
  /* Box */
  background-color: var(--color-grey-0);
  border: 1px solid var(--color-grey-100);
  border-radius: var(--border-radius-md);
  padding: 2.4rem 4rem;
`;

function CheckinBooking() {
  const { booking, isLoading } = useBooking();
  const navigate = useNavigate();
  const [confirmCheckin, setConfirmCheckin] = useState(false);
  //custom hook to validate the check-in
  const { checkin, isCheckinIn } = useCheckin();
  //custom hook to change the breakfast prices
  const { settings, isLoading: isLoadingSettings } = useSettings();
  //controled checkbox
  const [addBreakfast, setAddBreakfast] = useState(false);

  useEffect(() => {
    setConfirmCheckin(booking?.isPaid || false);
  }, [booking?.isPaid]);

  const moveBack = useMoveBack();
  if (isLoading || isLoadingSettings) return <Spinner />;
  if (!booking) return null;

  const {
    id: bookingId,
    status,
    guests,
    totalPrice,
    numGuests,
    hasBreakfast,
    numNights,
  } = booking;

  if (status !== "unconfirmed") {
    const message =
      status === "checked-out"
        ? "This booking has been checked out and cannot be checked in again."
        : "This booking is already checked in.";

    return (
      <>
        <Row type="horizontal">
          <Heading as="h1">Check in booking #{bookingId}</Heading>
          <ButtonText onClick={moveBack}>&larr; Back</ButtonText>
        </Row>
        <BookingDataBox booking={booking} />
        <Box>
          <p>{message}</p>
        </Box>
        <ButtonGroup>
          <Button variation="secondary" onClick={moveBack}>
            Back
          </Button>
        </ButtonGroup>
      </>
    );
  }

  const optionalBreakfastPrice =
    settings.breakfastPrice * numNights * numGuests;
  const shouldAddBreakfast = addBreakfast && !hasBreakfast;
  const totalAmount = shouldAddBreakfast
    ? totalPrice + optionalBreakfastPrice
    : totalPrice;

  function handleCheckin() {
    if (!confirmCheckin) return;

    const obj = {
      status: "checked-in",
      isPaid: true,
      ...(shouldAddBreakfast && {
        hasBreakfast: true,
        extrasPrice: optionalBreakfastPrice,
        totalPrice: totalPrice + optionalBreakfastPrice,
      }),
    };

    checkin(
      { bookingId, Obj: obj },
      {
        onSuccess: () => navigate(`/bookings/${bookingId}`),
      }
    );
  }

  return (
    <>
      <Row type="horizontal">
        <Heading as="h1">Check in booking #{bookingId}</Heading>
        <ButtonText onClick={moveBack}>&larr; Back</ButtonText>
      </Row>

      <BookingDataBox booking={booking} />
      {!hasBreakfast && (
        <Box>
          <Checkbox
            id="breakfast"
            checked={addBreakfast}
            onChange={() => {
              setAddBreakfast((add) => !add);
              setConfirmCheckin(false);
            }}
            disabled={isCheckinIn}
          >
            Want to add breakfast for {formatCurrency(optionalBreakfastPrice)}?
          </Checkbox>
        </Box>
      )}
      <Box>
        <Checkbox
          id="confirm"
          checked={confirmCheckin}
          onChange={() => setConfirmCheckin(!confirmCheckin)}
          disabled={confirmCheckin || isCheckinIn}
        >
          I confirm that {guests.fullName} has paid the total amount of{" "}
          {formatCurrency(totalAmount)}
          {shouldAddBreakfast &&
            ` (${formatCurrency(totalPrice)} + ${formatCurrency(
              optionalBreakfastPrice
            )})`}
        </Checkbox>
      </Box>
      <ButtonGroup>
        <Button
          onClick={handleCheckin}
          disabled={!confirmCheckin || isCheckinIn}
        >
          Check in booking #{bookingId}
        </Button>
        <Button variation="secondary" onClick={moveBack}>
          Back
        </Button>
      </ButtonGroup>
    </>
  );
}

export default CheckinBooking;
