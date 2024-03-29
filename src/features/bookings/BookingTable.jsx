import BookingRow from "./BookingRow";
import Table from "../../ui/Table";
import Menus from "../../ui/Menus";
import Empty from "../../ui/Empty";
import { useBookings } from "./useBookings";
import Spinner from "../../ui/Spinner";
import Pagination from "../../ui/Pagination";
import { useShowHideSidebar } from "../../context/showHideSideBarContex";

function BookingTable() {
 
  const {bookings,isLoading,count} = useBookings();
  const {mode} = useShowHideSidebar();
  if(isLoading) return <Spinner/>
  // if(!isLoading)
  // {
  //   if(!bookings.length) return <Empty resourceName="bookings"/>

  // }

  if(!bookings.length) return <Empty resourceName="bookings"/>
  


  return (
    <Menus>
      <Table columns={mode==="desktop"?"0.6fr 2fr 2.4fr 1.4fr 1fr 3.2rem":"1fr 1fr"} mode={mode}>
      {mode==="desktop"&&<Table.Header >
      <div>Cabin</div>
    <div>Guest</div>
    <div>Dates</div>
    <div>Status</div>
    <div>Amount</div>
    <div></div>
      </Table.Header>}

        <Table.Body
          data={bookings}
          render={(booking) => (
            <BookingRow key={booking.id} booking={booking} />
          )}
        />
        <Table.Footer>
          <Pagination count={count}/>
        </Table.Footer>
      </Table>
    </Menus>
  );
}

export default BookingTable;
