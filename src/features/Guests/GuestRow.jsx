import styled from "styled-components";
import { format, isToday } from "date-fns";

import Tag from "../../ui/Tag";
import Table from "../../ui/Table";

import { formatCurrency } from "../../utils/helpers";
import { formatDistanceFromNow } from "../../utils/helpers";



import { useShowHideSidebar } from "../../context/showHideSideBarContex";

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

function GuestRow({
  guest: {
    id: guestId,
    fullName,
    email,
    nationalID,
    nationality
    
  },
}) {
 
  const {mode} = useShowHideSidebar();

  
  

  return (
    <Table.Row>
      {mode==="mobile"&&<div><strong>Full Name</strong></div>}
      <Cabin>{fullName}</Cabin>

      {mode==="mobile"&&<div><strong>Email</strong></div>}
      <Cabin>{email}</Cabin>
      {mode==="mobile"&&<div><strong>National ID</strong></div>}
      <Cabin>{nationalID}</Cabin>
      {mode==="mobile"&&<div><strong>Nationality</strong></div>}
      <Cabin>{nationality}</Cabin>
      {mode==="mobile"&&<div></div>}
 



 {/* Modal window for future updates */}
      {/* <Modal>
        <Menus.Menu>
          <Menus.Toggle id={bookingId} />
          <Menus.List id={bookingId}>
            <Menus.Button
              icon={<HiEye />}
              onClick={() => navigate(`/booking/${bookingId}`)}
            >
              See details
            </Menus.Button>
            {status === "unconfirmed" && (
              <Menus.Button
                icon={<HiArrowDownOnSquare />}
                onClick={() => navigate(`/checkin/${bookingId}`)}
              >
                Check-in
              </Menus.Button>
            )}

            {status === "checked-in" && (
              <Menus.Button
                icon={<HiArrowUpOnSquare />}
                onClick={() => checkout(bookingId)}
                disable={isChekingOut}
              >
                Check-out
              </Menus.Button>
            )}
            <Modal.Open opens="edit">
              <Menus.Button icon={<HiPencil />}>Edit</Menus.Button>
            </Modal.Open>
            <Modal.Open opens="delete">
              <Menus.Button icon={<HiTrash />}>Delete</Menus.Button>
            </Modal.Open>
          </Menus.List>

          <Modal.Window name="delete">
            <ConfirmDelete
              resourceName={`Booking which belongs to \n${guestName}`}
              onConfirm={() => deleteBooking(bookingId)}
              disabled={isDeleting}
            />
          </Modal.Window>
        </Menus.Menu>
      </Modal> */}
    </Table.Row>
  );
}

export default GuestRow;
