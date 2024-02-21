import { useState } from "react";
import Button from "../../ui/Button";
import CreateCabinForm from "./CreateCabinForm";
import Modal from "../../ui/Modal";
import CabinTable from "./CabinTable";

const AddCabin = () =>{
    return <Modal>
        <Modal.Open opens="cabin-form">
            <Button>Add new Cabin</Button>
        </Modal.Open>
        <Modal.Window name="cabin-form">
            <CreateCabinForm/>
        </Modal.Window>

        <Modal.Open opens="table">
            <Button>Show Table</Button>
        </Modal.Open>
        <Modal.Window name="table"> 
            <CabinTable/>
        </Modal.Window>


    </Modal>
}

// const AddCabin = () => {
//   const [isOpenModel, setIsOpenModel] = useState(false);
//   return (
//     <div>
//       <Button onClick={() => setIsOpenModel((show) => !show)}>
//         Add new cabin
//       </Button>
//       {isOpenModel && (
//         <Modal onClose={() => setIsOpenModel(false)}>
//           <CreateCabinForm onCloseModal={() => setIsOpenModel(false)} />
//         </Modal>
//       )}
//     </div>
//   );
// };

export default AddCabin;
