import Button from "../../ui/Button";
import CreateBookingForm from "../bookings/CreateBookingForm";
import Modal from "../../ui/Modal";


const AddBooking = () => {
  return (
    <div>
      <Modal>
        <Modal.Open opens="booking-form">
          <Button>Add new Booking</Button>
        </Modal.Open>
        <Modal.Window name="booking-form">
          <CreateBookingForm />
        </Modal.Window>
      </Modal>
    </div>
  );
};



export default AddBooking;
