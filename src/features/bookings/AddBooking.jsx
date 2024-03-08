import Button from "../../ui/Button";
import CreateBookingForm from "../bookings/CreateBookingForm";
import Modal from "../../ui/Modal";
import { useGuestsWithNoBooking } from "../Guests/useGuestsWithNoBooking";

import SpinnerMini from "../../ui/SpinnerMini"

const AddBooking = () => {
  const {guests,isLoading} = useGuestsWithNoBooking();

  if(isLoading) return <SpinnerMini/>

  const guestsLength = guests?.length;
  
  return (<>
  {guestsLength>0?<div>
      <Modal>
        <Modal.Open opens="booking-form">
          <Button >Add new Booking</Button>
        </Modal.Open>
        <Modal.Window name="booking-form">
          <CreateBookingForm />
        </Modal.Window>
      </Modal>
    </div>:<div>All Guests are booked !!</div>}
    
    
    
    </>
    
  );
}



export default AddBooking;
