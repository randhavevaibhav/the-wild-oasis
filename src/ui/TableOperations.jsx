import styled, { css } from 'styled-components';
const displayOptions = {
  mobile:css`flex-direction:column;`,
  desktop:css`flex-direction:row;`
}
const TableOperations = styled.div`
  display: flex;
  align-items: center;
  gap: 1.6rem;
  ${props=>displayOptions[props.mode]};

`;


TableOperations.defaultProps = {
  
  mode:"desktop"
}


export default TableOperations;
