import styled from "styled-components";
import HeaderMenu from "./HeaderMenu";
import UserAvatar from "../features/authentication/UserAvatar";
import ButtonIcon from "./ButtonIcon";
import { GiHamburgerMenu } from "react-icons/gi";
import useWindowDimensions from "../hooks/useWindowDimensions";
import { useShowHideSidebar } from "../context/showHideSideBarContex";
const StyledHeader = styled.header`
  background-color: var(--color-grey-0);
  padding: 1.2rem 4.8rem;
  border-bottom: 1px solid var(--color-grey-100);
  display: flex;
  gap: 2.4rem;
  align-items: center;
  justify-content: space-between;
`;

const Header = () => {
  const { width } = useWindowDimensions();
  const {toggleHide} = useShowHideSidebar()
  // console.log("width ===> " + width);
  // console.log("hideSideBar ===>"+hideSideBar);
  return (
    <StyledHeader>
      <div>
        {" "}
        {width < 1000 &&<ButtonIcon onClick={toggleHide}> <GiHamburgerMenu /></ButtonIcon>}
      </div>
      <div style={{display:"flex",gap:"2.4rem"}}>
        {" "}
        <UserAvatar />
        <HeaderMenu />
      </div>
    </StyledHeader>
  );
};

export default Header;
