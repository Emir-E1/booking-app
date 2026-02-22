import styled from "styled-components";
import { formatCurrency } from "../../utils/helpers";
import { useState } from "react";
import CreateCabinForm from "./CreateCabinForm";
import { useDeleteCabin } from "./useDeleteCabin";
import { usePostEditCabin } from "./usePostEditCabin";
import { AiFillDelete, AiFillEdit, AiTwotoneCopy } from "react-icons/ai";
import Modal from "../../ui/Modal";
import ConfirmDelete from "./../../ui/ConfirmDelete";
import Button from "../../ui/Button";
const TableRow = styled.div`
  display: grid;
  grid-template-columns: 0.6fr 1.8fr 2.2fr 1fr 1fr 1fr;
  column-gap: 2.4rem;
  align-items: center;
  padding: 1.4rem 2.4rem;

  &:not(:last-child) {
    border-bottom: 1px solid var(--color-grey-100);
  }
`;

const Img = styled.img`
  display: block;
  width: 6.4rem;
  aspect-ratio: 3 / 2;
  object-fit: cover;
  object-position: center;
  transform: scale(1.5) translateX(-7px);
`;

const Cabin = styled.div`
  font-size: 1.6rem;
  font-weight: 600;
  color: var(--color-grey-600);
  font-family: "Sono";
`;

const Price = styled.div`
  font-family: "Sono";
  font-weight: 600;
`;

const Discount = styled.div`
  font-family: "Sono";
  font-weight: 500;
  color: var(--color-green-700);
`;

function CabinRow({ cabin }) {
  const { mutate: deleteCabin, isDeleting } = useDeleteCabin();
  const { mutate: dupeCabin } = usePostEditCabin();
  const {
    name,
    image,
    regularPrice,
    discount,
    maxCapacity,
    description,
    id: cabinID,
  } = cabin;

  function handleDupe() {
    const { id, ...cabinData } = cabin;
    dupeCabin({
      newCabinData: {
        ...cabinData,
        name: `Copy of ${name}`,
      },
      id: undefined, // Pas d'id pour créer une nouvelle entrée
    });
  }

  return (
    <TableRow role="row">
      <Img src={image} />

      <Cabin>{name}</Cabin>
      <div>Fits up tp {maxCapacity} guests</div>
      <Price>{formatCurrency(regularPrice)}</Price>
      <Discount>{formatCurrency(discount)}</Discount>
      <div>
        <Modal>
          <Modal.Open opens={"edit-open"}>
            <button>
              {" "}
              <AiFillEdit />
            </button>
          </Modal.Open>
          <Modal.Window name={"edit-open"}>
            <CreateCabinForm cabinToEdit={cabin} />
          </Modal.Window>

          <Modal.Open opens={"delete-open"}>
            <button>
              {" "}
              <AiFillDelete />
            </button>
          </Modal.Open>
          <Modal.Window name={"delete-open"}>
            <ConfirmDelete
              onConfirm={() => deleteCabin(cabinID)}
              disabled={isDeleting}
            />
          </Modal.Window>
        </Modal>
        <button onClick={handleDupe}>
          <AiTwotoneCopy />
        </button>
      </div>
    </TableRow>
  );
}

export default CabinRow;
