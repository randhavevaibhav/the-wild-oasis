import Button from "../../ui/Button";

import Modal from "../../ui/Modal";



import CreateGuestForm from "./CreateGuestForm";

const AddGuest = () => {
  

  // if(isLoading) return <SpinnerMini/>

  
  
  return (<>
  <div>
      <Modal>
        <Modal.Open opens="guest-form">
          <Button >Add new Guest</Button>
        </Modal.Open>
        <Modal.Window name="guest-form">
          <CreateGuestForm />
        </Modal.Window>
      </Modal>
    </div>
    
    
    
    </>
    
  );
}



export default AddGuest;
