import { useQuery } from "@tanstack/react-query";
import { getBookings } from "../../services/apiBookings";
import { useSearchParams } from "react-router-dom";

export const useBookings = () => {
  const [searchParams] = useSearchParams();

  //Filter
  const filterValue = searchParams.get("status");
  //  console.log("filterValue ===> "+filterValue);
  
  const filter =
    !filterValue || filterValue === "all"
      ? null
      : {
          field: "status",
          value: filterValue,
          method:"eq"
        };
  //  console.log("filter ===> "+JSON.stringify(filter));
//sort
const sortByRaw = searchParams.get("sortBy")||"startDate-desc";
const [field,direction] = sortByRaw.split("-");

const sortBy = {
  field,
  direction
}
// console.log("sortBy ===> "+JSON.stringify(sortBy));

//
const page =!searchParams.get("page")?1:Number(searchParams.get("page"));




  const {
    isLoading,
    data: {data:bookings,count}={},
    error,
  } = useQuery({
    queryKey: ["bookings", filter,sortBy,page],
    queryFn: () => getBookings({ filter,sortBy,page }),
  });
  console.log("data ===> "+JSON.stringify(count))

  return { isLoading, error, bookings,count };
};
