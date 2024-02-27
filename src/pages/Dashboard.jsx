import styled from "styled-components";
import DashboardFilter from "../features/dashboard/DashboardFilter";
import DashboardLayout from "../features/dashboard/DashboardLayout";
import Heading from "../ui/Heading";
import Row from "../ui/Row";
import { useShowHideSidebar } from "../context/showHideSideBarContex";
const StyledDashboard = styled.div`

justify-content: space-between;


`;
function Dashboard() {
  const {mode} =useShowHideSidebar();
  const changedType = mode==="desktop"?"horizontal":"vertical"
  return (<>
  <Row type={changedType}>
    
    <Heading as="h1">Dashboard</Heading>
    
    <DashboardFilter/>
    
    

    
   
    </Row>
    <DashboardLayout/>
    </>
    
  );
}

export default Dashboard;
