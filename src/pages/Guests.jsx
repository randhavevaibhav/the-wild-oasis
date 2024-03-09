import Heading from "../ui/Heading";
import Row from "../ui/Row";

import { useShowHideSidebar } from "../context/showHideSideBarContex";
import GuestsTableOperations from "../features/Guests/GuestsTableOperations";
import GuestTable from "../features/Guests/GuestTable";
import AddGuest from "../features/Guests/AddGuest";
import { useGuestByName } from "../features/Guests/useGuestByName";

import { useSearchParams } from "react-router-dom";
import { useQueryClient } from "@tanstack/react-query";


function Guests() {
  const {mode} = useShowHideSidebar();
  const type = mode==="mobile"?"vertical":"horizontal";
 
  const [searchParams, setSearchParams] = useSearchParams();
const {isLoading,guest} = useGuestByName();
const queryClient = useQueryClient();

!isLoading&&console.log("guest result =====> "+JSON.stringify(guest))
  const searchGuestByName = (val)=>{
    queryClient.invalidateQueries({
      queryKey: ["guestByName"],
    })
    searchParams.set("searchguest",val);

    setSearchParams(searchParams);
    
  }
  return (<>
    <Row type={type} style={{alignItems:mode==="mobile"?"center":"flex-start"}}>
      <Heading as="h1">All Guests</Heading>

      <AddGuest/>
       {/* add AddGuest compo  */}
      <GuestsTableOperations/>
      {/* add guests operations  */}
      <input style={{color:"black"}} type="search" placeholder="search guest" onChange={(e)=>{
       
        searchGuestByName(e.target.value);
        
        
        }}/>
    </Row>
    <GuestTable/>
  </>
  
  );
}

export default Guests;
