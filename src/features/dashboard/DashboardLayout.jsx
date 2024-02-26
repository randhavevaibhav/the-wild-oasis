import styled from "styled-components";
import { useRecentBookings } from "./useRecentBookings";
import Spinner from "../../ui/Spinner";
import { useRecentStays } from "./useRecentStays";

const StyledDashboardLayout = styled.div`
  display: grid;
  grid-template-columns: 1fr 1fr 1fr 1fr;
  grid-template-rows: auto 34rem auto;
  gap: 2.4rem;
`;



const DashboardLayout = () => {
  const {bookings,isLoading1} = useRecentBookings();
  const{stays,confirmedStays,isLoading:isLoading2} =useRecentStays();
  if(isLoading1 ||isLoading2) return<Spinner/>

  //console.log("Bookings in D===> "+JSON.stringify(bookings))
  return (
    <StyledDashboardLayout>
      <div>
      Statistics
      </div>
      <div>
      Todays activities
      </div>
      <div>
      Chart stay duration
      </div>
      <div>
      Chart Sales
      </div>
    </StyledDashboardLayout>
  )
}

export default DashboardLayout
