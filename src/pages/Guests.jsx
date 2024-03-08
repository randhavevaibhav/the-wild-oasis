import Heading from "../ui/Heading";
import Row from "../ui/Row";

import { useShowHideSidebar } from "../context/showHideSideBarContex";
import GuestsTableOperations from "../features/Guests/GuestsTableOperations";
import GuestTable from "../features/Guests/GuestTable";
import AddGuest from "../features/Guests/AddGuest";


function Guests() {
  const {mode} = useShowHideSidebar();
  const type = mode==="mobile"?"vertical":"horizontal";
  
  
  return (<>
    <Row type={type} style={{alignItems:mode==="mobile"?"center":"flex-start"}}>
      <Heading as="h1">All Guests</Heading>

      <AddGuest/>
       {/* add AddGuest compo  */}
      <GuestsTableOperations/>
      {/* add guests operations  */}
    </Row>
    <GuestTable/>
  </>
  
  );
}

export default Guests;
