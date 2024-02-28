import styled, { css } from 'styled-components';

const displayOptions = {
  mobile:css`justify-content: center;`,
  desktop:css`justify-content: flex-end;`
}
const ButtonGroup = styled.div`
  display: flex;
  ${props=>displayOptions[props.mode]};
  gap: 1.2rem;
 
`;
ButtonGroup.defaultProps = {
  
  mode:"desktop"
}

export default ButtonGroup;
