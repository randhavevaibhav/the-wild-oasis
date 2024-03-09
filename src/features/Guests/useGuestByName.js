import { useQuery } from "@tanstack/react-query";
import { getGuestByName } from "../../services/apiGuests";
import { useSearchParams } from "react-router-dom";



export const useGuestByName = () => {
  const [searchParams] = useSearchParams();
  const searchVal = searchParams.get("searchguest")||""
  console.log("searchVal ====> **** "+searchVal)
  
  const {isLoading,data:guestData,error} = useQuery({
    queryKey:['guestByName',searchVal],
    queryFn:()=>getGuestByName(searchVal),
    
  });

  return {isLoading,error,guestData}
};
