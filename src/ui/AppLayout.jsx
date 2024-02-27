import { Outlet } from "react-router-dom";
import Sidebar from "./Sidebar";
import Header from "./Header";
import styled, { css } from "styled-components";
import useWindowDimensions from "../hooks/useWindowDimensions";
import { useShowHideSidebar } from "../context/showHideSideBarContex";

const templateColumnsOnWidth = {
  mobile:css`grid-template-columns:none;`,
  desktop:css`grid-template-columns:26rem 1fr;`
}
const MainContainerOptions = {
  mobile:css`padding: 4rem 1.2rem 6.4rem;`,
  desktop:css`padding: 4rem 4.8rem 6.4rem; `
}
const StyledAppLayOut = styled.div`
  display: grid;
  
 ${props=>templateColumnsOnWidth[props.mode]};
  
  grid-template-rows: auto 1fr;
  height: 100vh;
`;


StyledAppLayOut.defaultProps = {
  
  mode:"desktop"
}

const Container = styled.div`
  max-width: 120rem;
  margin: 0 auto;
  display: flex;
  flex-direction: column;
  gap:3.2rem;
`;

const Main = styled.main`
  background-color: var(--color-grey-50);
  
  ${props=>MainContainerOptions[props.mode]};
  overflow: scroll;
`;

Main.defaultProps = {
  
  mode:"desktop"
}

const AppLayout = () => {
  const { width } = useWindowDimensions();
  const mode = width >1000?"desktop":"mobile";
  const {hideSideBar} = useShowHideSidebar();
  let showhideSidebar = true;
 
  if(width<1000 )
  {
    showhideSidebar=hideSideBar;
    
  }
  return (
    <StyledAppLayOut mode={mode}>
      <Header />
     {showhideSidebar&& <Sidebar />}
    
      <Main mode={mode}>
        <Container>
          <Outlet />
        </Container>
      </Main>
    </StyledAppLayOut>
  );
};

export default AppLayout;
