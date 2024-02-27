import styled, { css } from "styled-components";
import Logo from "./Logo";
import MainNav from "./MainNav";
import useWindowDimensions from "../hooks/useWindowDimensions";
import { useShowHideSidebar } from "../context/showHideSideBarContex";

const displayonCond={
  desktop: css`grid-row: 1/-1;`,
  mobile:css`grid-row: 2/2;`
}

const StyledSidebar = styled.aside`
  background-color  : var(--color-grey-0); 
  padding: 3.2rem 2.4rem;
  border-right: 1px solid var(--color-grey-100);
  ${props=>displayonCond[props.mode]};
  
  transition:  300ms;
  display:flex;
  flex-direction: column;
  gap:3.2rem;

`;
StyledSidebar.defaultProps = {
  
  mode:"desktop"
}

const Sidebar = () => {
  const { width } = useWindowDimensions();
  let mode = "desktop";
 if(width<1000)
 {
    mode="mobile"
  
 }

 
  return (<>
  

   <StyledSidebar mode={mode} >
    <Logo/>
    <MainNav/>
    {/* use to upload dummy data */}
    {/* <Uploader/> */}

   </StyledSidebar>

  </>
   
  )
}

export default Sidebar
