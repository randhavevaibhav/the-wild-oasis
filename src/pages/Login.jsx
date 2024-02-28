import styled, { css } from "styled-components";
import LoginForm from "../features/authentication/LoginForm";
import Heading from "../ui/Heading";
import Logo from "../ui/Logo";
import { useShowHideSidebar } from "../context/showHideSideBarContex";

const displayOptions = {
  mobile:css`grid-template-columns: 35rem;`,
  desktop:css`grid-template-columns: 35rem;`
}
const LoginLayout = styled.main`
  min-height: 100vh;
  display: grid;
  ${props=>displayOptions[props.mode]};
  align-content: center;
  justify-content: center;
  gap: 3.2rem;
  background-color: var(--color-grey-50);
`;

LoginLayout.defaultProps = {
  
  mode:"desktop"
}


function Login() {
  const {mode} =useShowHideSidebar();
  return (
    <LoginLayout mode={mode}>
      <Logo/>
      <Heading as="h4">Log in to your account</Heading>
      <LoginForm />
    </LoginLayout>
  );
}

export default Login;
