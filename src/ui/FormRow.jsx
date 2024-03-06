import styled, { css } from "styled-components";
import { useShowHideSidebar } from "../context/showHideSideBarContex";


const displayOptions = {
  mobile:css`grid-template-columns: 1fr; gap:0rem; padding: 0.4rem 0;`,
  desktop:css`grid-template-columns: 24rem 1fr 1.2fr; gap:2.4rem; padding: 1.2rem 0;`
}

const buttonDisplayOptions = {
  mobile:css`margin-top: 1rem;
  margin-bottom: 1rem;`,
  
}



const StyledFormRow = styled.div`
  display: grid;
  align-items: center;
  
  ${props=>displayOptions[props.mode]};

  
  

  

  &:first-child {
    padding-top: 0;
  }
 

  &:last-child {
    padding-bottom: 0;
  }

  &:not(:last-child) {
    border-bottom: 1px solid var(--color-grey-100);
  }

  &:has(button) {
    display: flex;
  
    justify-content: space-between;
    gap: 1.2rem;
    ${props=>buttonDisplayOptions[props.mode]};
  }
 
  

 
`;


StyledFormRow.defaultProps = {
  
  mode:"desktop",
  
}

const Label = styled.label`
  font-weight: 500;
`;

const Error = styled.span`
  font-size: 1.4rem;
  color: var(--color-red-700);
`;

const FormRow = ({label,error,children}) => {
  const {mode} = useShowHideSidebar();
  return (
    <StyledFormRow mode={mode} >
   {label&&<Label htmlFor={children.props.id}>{label}</Label>} 
    {children}
    {error&&<Error> {error}</Error>}
  </StyledFormRow>
  )
}

export default FormRow;
