import { useQuery } from "@tanstack/react-query";
import { getGuestsWithNoBooking } from "../../services/apiGuests";



export const useGuestsWithNoBooking = () => {

  const {isLoading,data:guests,error} = useQuery({
    queryKey:['guestsWithNoBooking'],
    queryFn:getGuestsWithNoBooking
  });

  return {isLoading,error,guests}
};
