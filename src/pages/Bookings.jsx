import Heading from "../ui/Heading";
import Row from "../ui/Row";
import BookingTable from "../features/bookings/BookingTable";
import BookingTableOperations from "../features/bookings/BookingTableOperations";
import { useShowHideSidebar } from "../context/showHideSideBarContex";

function Bookings() {
  const {mode} = useShowHideSidebar();
  const type = mode==="mobile"?"vertical":"horizontal";
  
  
  return (<>
    <Row type={type} style={{alignItems:mode==="mobile"?"center":"flex-start"}}>
      <Heading as="h1">All bookings</Heading>
      <BookingTableOperations/>
    </Row>
    <BookingTable/>
  </>
  
  );
}

export default Bookings;
