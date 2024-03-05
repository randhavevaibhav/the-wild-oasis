import styled, { css } from "styled-components";

import BookingDataBox from "./BookingDataBox";
import Row from "../../ui/Row";
import Heading from "../../ui/Heading";
import Tag from "../../ui/Tag";
import ButtonGroup from "../../ui/ButtonGroup";
import Button from "../../ui/Button";
import ButtonText from "../../ui/ButtonText";

import { useMoveBack } from "../../hooks/useMoveBack";
import { useBooking } from "./useBooking";
import Spinner from "../../ui/Spinner";
import { useNavigate } from "react-router-dom";
import { HiArrowUpOnSquare } from "react-icons/hi2";
import { useCheckout } from "../check-in-out/useCheckout";
import Modal from "../../ui/Modal";
import ConfirmDelete from "../../ui/ConfirmDelete";
import { useDeleteBooking } from "./useDeleteBooking";
import Empty from "../../ui/Empty";
import { useShowHideSidebar } from "../../context/showHideSideBarContex";
const displayOptions = {
  mobile:css`justify-content:space-between;`,
  desktop:css`justify-content:flex-start;`
}
const HeadingGroup = styled.div`
  display: flex;
  gap: 2.4rem;
  align-items: center;
  ${props=>displayOptions[props.mode]};
`;
HeadingGroup.defaultProps = {
  
  mode:"desktop"
}

function BookingDetail() {
  const { booking, isLoading } = useBooking();
  const {checkout,isChekingOut}=useCheckout();
  const { isDeleting, deleteBooking } = useDeleteBooking();
  const navigate = useNavigate();
  const {mode} = useShowHideSidebar();

  const moveBack = useMoveBack();
  if (isLoading) return <Spinner />;
  if(!booking) return<Empty resourceName="booking"/>
  const { status, id: bookingId,guests: { fullName: guestName } } = booking;

  const statusToTagName = {
    unconfirmed: "blue",
    "checked-in": "green",
    "checked-out": "silver",
  };
  

  return (
    <>
      <Row type={mode==="desktop"?"horizontal":"vertical"} >
        <HeadingGroup  mode={mode}>
          <Heading as="h1">Booking #{bookingId}</Heading>
          <Tag type={statusToTagName[status]}>{status.replace("-", " ")}</Tag>
        </HeadingGroup>
        <ButtonText onClick={moveBack}>&larr; Back</ButtonText>
      </Row>

      <BookingDataBox booking={booking} />

      <ButtonGroup mode={mode}>
        {status === "unconfirmed" && (
          <Button onClick={() => navigate(`/checkin/${bookingId}`)}>
            Check-in
          </Button>
        )}

        {status === "checked-in" && (
          <Button
            icon={<HiArrowUpOnSquare />}
            onClick={() => checkout(bookingId)}
            disable={isChekingOut}
            size={mode==="mobile"?"medium":""}
          >
            Check-out
          </Button>
        )}
         
        <Modal>
        <Modal.Open opens="delete">
        <Button variation="danger" >Delete Booking</Button>
            </Modal.Open>

        <Modal.Window name="delete">
            <ConfirmDelete
              resourceName={`Booking which belongs to \n${guestName}`}
              
              onConfirm={() => {
                deleteBooking(bookingId,{
                  onSettled:()=>navigate(-1)
                });

              }
            }
              disabled={isDeleting}
            />
          </Modal.Window>
        </Modal>
       
        <Button size={mode==="mobile"?"small":"medium"} variation="secondary" onClick={moveBack}>
          Back
        </Button>
      </ButtonGroup>
    </>
  );
}

export default BookingDetail;
