import Spinner from "../../ui/Spinner";

import CabinRow from "./CabinRow";
import { useCabins } from "./useCabins";
import Table from "../../ui/Table";
import Menus from "../../ui/Menus";
import { useSearchParams } from "react-router-dom";
import Empty from "../../ui/Empty";
import { useShowHideSidebar } from "../../context/showHideSideBarContex";

const CabinTable = () => {
  const { isLoading, cabins } = useCabins();
  const [searchParams] = useSearchParams();
  const {mode} = useShowHideSidebar();
  const TableColums = mode==="mobile"?"1fr 1fr":"0.6fr 1.8fr 2.2fr 1fr 1fr 1fr"
  if(!isLoading)
  {
    if(!cabins.length) return <Empty resourceName="Cabins"/>

  }
  if (isLoading) {
    return <Spinner />;
  }

  //1) filter
  const filterValue = searchParams.get("discount") || "all";
  

  let filteredCabins;

  if (filterValue === "all") filteredCabins = cabins;
  if (filterValue === "no-discount")
    filteredCabins = cabins.filter((cabin) => cabin.discount === 0);
  if (filterValue === "with-discount")
    filteredCabins = cabins.filter((cabin) => cabin.discount > 0);

  //2) sort by
  const sortBy = searchParams.get("sortBy") || "startDate-asc";
  const [field, direction] = sortBy.split("-");
  const modifier = direction === "asc" ? 1 : -1;
  let sortedCabins = filteredCabins;

  if (field === "name") {
    sortedCabins = filteredCabins.sort((a, b) => {
      if (a[field] < b[field]) {
        return -1 * modifier;
      } else if (a[field] > b[field]) {
        return 1 * modifier;
      } else {
        return 0;
      }
    });
  } else {
    sortedCabins = filteredCabins.sort((a, b) => {
      return (a[field] - b[field]) * modifier;
    });
  }

  

  return (
    <Menus>
      <Table columns={TableColums}>
       { mode==="desktop"&&<Table.Header>
          <div></div>
          <div>Cabin</div>
          <div>Capacity</div>
          <div>Price</div>
          <div>Discount</div>
          <div></div>
        </Table.Header>}
        <Table.Body
          data={sortedCabins}
          render={(cabin) => <CabinRow cabin={cabin} key={cabin.id} />}
        />
      </Table>
    </Menus>
  );
};

export default CabinTable;
