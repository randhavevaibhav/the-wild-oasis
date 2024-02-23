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
  const {
    isLoading,
    data: bookings,
    error,
  } = useQuery({
    queryKey: ["bookings", filter,sortBy],
    queryFn: () => getBookings({ filter,sortBy }),
  });

  return { isLoading, error, bookings };
};
