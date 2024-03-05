import styled, { css } from "styled-components";

const displayOptions = {
  mobile:css`flex-direction: column; gap:1rem;`,
  desktop:css`flex-direction: row;`
}
const StyledDatePickerItems = styled.div`
  display: flex;
  align-items: flex-start;
  justify-content: space-between;
  
  color: black;
  font-weight: 501;
  font-size: 1.4rem;
  ${props=>displayOptions[props.mode]};
          
       
`;
StyledDatePickerItems.defaultProps = {
  
  mode:"desktop"
}



const DatePickerItemsWrapper = ({children,mode}) => {
  return (
    <StyledDatePickerItems mode={mode}>
      
       
        {children}
       
     
        
    </StyledDatePickerItems>
  )
}

export default DatePickerItemsWrapper
