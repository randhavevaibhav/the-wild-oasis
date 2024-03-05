import Heading from "../ui/Heading";
import Row from "../ui/Row";
import CabinTable from "../features/cabins/CabinTable";

import AddCabin from "../features/cabins/AddCabin";
import CabinTableOperations from "../features/cabins/CabinTableOperations";
import { useShowHideSidebar } from "../context/showHideSideBarContex";

function Cabins() {
  const { mode } = useShowHideSidebar();
  return (
    <>
      <Row
        type={mode === "mobile" ? "vertical" : "horizontal"}
        style={{ alignItems: mode === "mobile" ? "center" : "flex-start" }}
      >
        <Heading as="h1">All cabins</Heading>
        <CabinTableOperations />
      </Row>
      <Row>
        <AddCabin />
        <CabinTable />
      </Row>
    </>
  );
}

export default Cabins;
