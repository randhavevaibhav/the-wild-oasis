import styled from "styled-components";
import { useUser } from "../features/authentication/useUser";
import Spinner from "./Spinner";
import { useNavigate } from "react-router-dom";
import { useEffect } from "react";

const FullPage = styled.div`
  height: 100vh;
  background-color: var(--color-grey-50);
  display: flex;
  align-items: center;
  justify-content: center;
`;

const ProtectedRoute = ({ children }) => {
    const navigate = useNavigate();

  //1. load autheticated user
  const { user, isLoading,isAuthenticated } = useUser();

  
  
  //2. if there is no auth user redirect to login page
useEffect(()=>{
if(!isAuthenticated &&!isLoading)
{
    navigate("/login");
}

},[isAuthenticated,isLoading,navigate])
//3. while loading  show a spinner
if (isLoading)
    return (
      <FullPage>
        <Spinner />
      </FullPage>
    );
  //4. if auth user is present then render the app
 if(isAuthenticated) return children;
};

export default ProtectedRoute;
