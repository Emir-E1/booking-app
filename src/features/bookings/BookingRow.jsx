import styled from "styled-components";
import { format, isToday } from "date-fns";

import Tag from "../../ui/Tag";
import Table from "../../ui/Table";

import { formatCurrency } from "../../utils/helpers";
import { formatDistanceFromNow } from "../../utils/helpers";
import {
  AiFillCheckSquare,
  AiFillDelete,
  AiFillNotification,
  AiOutlineLogout,
} from "react-icons/ai";
import { useNavigate } from "react-router-dom";
import Menus from "../../ui/Menus";
import { useCheckout } from "../check-in-out/useCheckout";

import { useDeleteBooking } from "./useDeleteBooking";

const Cabin = styled.div`
  font-size: 1.6rem;
  font-weight: 600;
  color: var(--color-grey-600);
  font-family: "Sono";
`;

const Stacked = styled.div`
  display: flex;
  flex-direction: column;
  gap: 0.2rem;

  & span:first-child {
    font-weight: 500;
  }

  & span:last-child {
    color: var(--color-grey-500);
    font-size: 1.2rem;
  }
`;

const Amount = styled.div`
  font-family: "Sono";
  font-weight: 500;
`;

function BookingRow({ booking }) {
  const navigate = useNavigate();
  const { checkout, isCheckingOut } = useCheckout();
  const { deleteBooked, isDeletingBooking } = useDeleteBooking();
  const {
    startDate,
    endDate,
    numNights,
    totalPrice,
    status,
    guests,
    cabins,
    id,
  } = booking;

  const guestName = guests?.fullName ?? guests?.full_name ?? "—";
  const email = guests?.email ?? "";
  const cabinName = cabins?.name ?? "—";

  const statusToTagName = {
    unconfirmed: "blue",
    "checked-in": "green",
    "checked-out": "silver",
  };

  return (
    <Table.Row>
      <Cabin>{cabinName}</Cabin>

      <Stacked>
        <span>{guestName}</span>
        <span>{email}</span>
      </Stacked>

      <Stacked>
        <span>
          {isToday(new Date(startDate))
            ? "Today"
            : formatDistanceFromNow(startDate)}{" "}
          &rarr; {numNights} night stay
        </span>
        <span>
          {format(new Date(startDate), "MMM dd yyyy")} &mdash;{" "}
          {format(new Date(endDate), "MMM dd yyyy")}
        </span>
      </Stacked>

      <Tag type={statusToTagName[status]}>{status.replace("-", " ")}</Tag>

      <Amount>{formatCurrency(totalPrice)}</Amount>

      <Menus.Menu>
        <Menus.Toggle id={id} />
        <Menus.List id={id}>
          <Menus.Button
            icone={<AiFillNotification />}
            onClick={() => navigate(`/bookings/${id}`)}
          >
            See details
          </Menus.Button>

          {status === "unconfirmed" && (
            <Menus.Button
              icone={<AiFillCheckSquare />}
              onClick={() => navigate(`/checkin/${id}`)}
            >
              Check in
            </Menus.Button>
          )}
          {status === "checked-in" && (
            <Menus.Button
              icone={<AiOutlineLogout />}
              onClick={() => checkout(id)}
              disabled={isCheckingOut}
            >
              Check out
            </Menus.Button>
          )}

          <Menus.Button
            icone={<AiFillDelete />}
            onClick={() => deleteBooked(id)}
            disabled={isDeletingBooking}
          >
            Delete
          </Menus.Button>
        </Menus.List>
      </Menus.Menu>
    </Table.Row>
  );
}

export default BookingRow;
