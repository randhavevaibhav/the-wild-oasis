import { useQuery } from "@tanstack/react-query";
import { getAllBookings } from "../../services/apiBookings";



export const useGetAllBookings = () => {
  
//Query
  const {
    isLoading,
    data: bookings,
    error,
  } = useQuery({
    queryKey: ["bookingByCabinId"],
    queryFn: () => getAllBookings(),
    retry:false
  });

  return { isLoading, error, bookings };
};
