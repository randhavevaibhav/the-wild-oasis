import Table from "../../ui/Table";
import Menus from "../../ui/Menus";
import Empty from "../../ui/Empty";

import Spinner from "../../ui/Spinner";
import Pagination from "../../ui/Pagination";
import { useShowHideSidebar } from "../../context/showHideSideBarContex";
import { useGuestsWithCond } from "./useGuestsWithCond";
import GuestRow from "./GuestRow";

function GuestTable() {
  const { guestsWithCond, isLoading, count } = useGuestsWithCond();
  const { mode } = useShowHideSidebar();
  if (isLoading) return <Spinner />;
  // if(!isLoading)
  // {
  //   if(!bookings.length) return <Empty resourceName="bookings"/>

  // }

  if (!guestsWithCond.length) return <Empty resourceName="Guests" />;

  return (
    <Menus>
      <Table
        columns={
          mode === "desktop" ? "1fr 1fr 1fr 1fr 3.2rem" : "1fr 1fr"
        }
        mode={mode}
      >
        {mode === "desktop" && (
          <Table.Header>
            <div><strong>Full Name</strong></div>
            <div><strong>Email</strong></div>
            <div><strong>National ID</strong></div>
            <div><strong>Nationality</strong></div>
            <div></div>
          </Table.Header>
        )}

        <Table.Body
          data={guestsWithCond}
          render={(guest) => (
            <GuestRow key={guest.id} guest={guest} />
          )}
        />
        <Table.Footer>
          <Pagination count={count} />
        </Table.Footer>
      </Table>
    </Menus>
  );
}

export default GuestTable;
