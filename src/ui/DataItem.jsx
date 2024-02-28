import styled, { css } from "styled-components";
import { useShowHideSidebar } from "../context/showHideSideBarContex";
const displayOptions = {
  mobile:css`font-size: 1.3rem;
  justify-content: space-between;`,
  desktop:css`font-size: 1.6rem;
  `
}
const StyledDataItem = styled.div`
  display: flex;
  align-items: center;
  gap: 1.6rem;
  
${props=>displayOptions[props.mode]};
  padding: 0.8rem 0;
`;
StyledDataItem.defaultProps = {
  
  mode:"desktop"
}

const Label = styled.span`
  display: flex;
  align-items: center;
  gap: 0.8rem;
  font-weight: 500;

  & svg {
    width: 2rem;
    height: 2rem;
    color: var(--color-brand-600);
  }
`;

function DataItem({ icon, label, children }) {
  const {mode} = useShowHideSidebar();
  return (
    <StyledDataItem mode={mode}>
      <Label>
        {icon}
        <span>{label}</span>
      </Label>
      {children}
    </StyledDataItem>
  );
}

export default DataItem;
