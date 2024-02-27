import styled, { css } from "styled-components";
import { useRecentBookings } from "./useRecentBookings";
import Spinner from "../../ui/Spinner";
import { useRecentStays } from "./useRecentStays";
import Stats from "./Stats";
import { useCabins } from "../cabins/useCabins";
import SalesChart from "./SalesChart";
import DurationChart from "./DurationChart";
import Today from "../check-in-out/TodayActivity";
import TodayActivity from "../check-in-out/TodayActivity";
import { useShowHideSidebar } from "../../context/showHideSideBarContex";
const displayonCond={
  desktop: css`grid-template-columns: 1fr 1fr 1fr 1fr;
  grid-template-rows: auto 34rem auto;`,
  mobile:css`grid-template-columns: repeat(auto-fit, minmax(15rem, 1fr)); ;
   grid-template-rows: auto auto auto;`
}
const StyledDashboardLayout = styled.div`
  display: grid;
  grid-template-columns: 1fr 1fr 1fr 1fr;
  grid-template-rows: auto 34rem auto;
  ${props=>displayonCond[props.mode]};

  gap: 2.4rem;
`;
StyledDashboardLayout.defaultProps = {
  
  mode:"desktop"
}

const DashboardLayout = () => {
  const { bookings, isLoading1 } = useRecentBookings();
  const {
    stays,
    confirmedStays,
    isLoading: isLoading2,
    numDays,
  } = useRecentStays();
  const {cabins,isLoading:isLoading3} = useCabins();
  const {mode} =useShowHideSidebar();
  if (isLoading1 || isLoading2||isLoading3) return <Spinner />;

  //console.log("Bookings in D===> "+JSON.stringify(bookings))
  return (
    <StyledDashboardLayout mode={mode}>
      <Stats
        bookings={bookings}
        confirmedStays={confirmedStays}
        numDays={numDays}
        cabinCount={cabins.length}
      />
      <TodayActivity/>
      <DurationChart confirmedStays={confirmedStays}/>
      <SalesChart bookings={bookings} numDays={numDays}/>
    </StyledDashboardLayout>
  );
};

export default DashboardLayout;
