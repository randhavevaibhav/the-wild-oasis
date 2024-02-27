import styled, { css } from "styled-components";
import { useShowHideSidebar } from "../../context/showHideSideBarContex";

const displayonCond={
  desktop: css`grid-template-columns: 6.4rem 1fr;`,
  mobile:css`grid-template-columns: 1fr;`
}
const SVGOptions={
  desktop: css` width: 3.2rem;
  height: 3.2rem;`,
  mobile:css` width: 3.2rem; height: 3.2rem;;
  `
}

const StyledStat = styled.div`
  /* Box */
  background-color: var(--color-grey-0);
  border: 1px solid var(--color-grey-100);
  border-radius: var(--border-radius-md);

  padding: 1.6rem;
  display: grid;
  
  ${props=>displayonCond[props.mode]};
  grid-template-rows: auto auto;
  column-gap: 1.6rem;
  row-gap: 0.4rem;
`;

StyledStat.defaultProps = {
  
  mode:"desktop"
}
const Icon = styled.div`
  grid-row: 1 / -1;
  aspect-ratio: 1;
  border-radius: 50%;
  display: flex;
  align-items: center;
  justify-content: center;

  /* Make these dynamic, based on the received prop */
  background-color: var(--color-${(props) => props.color}-100);

  & svg {
    ${props=>SVGOptions[props.mode]};
    color: var(--color-${(props) => props.color}-700);
  }
`;
Icon.defaultProps = {
  
  mode:"desktop"
}

const Title = styled.h5`
  align-self: end;
  font-size: 1.2rem;
  text-transform: uppercase;
  letter-spacing: 0.4px;
  font-weight: 600;
  color: var(--color-grey-500);
`;

const Value = styled.p`
  font-size: 2.4rem;
  line-height: 1;
  font-weight: 500;
`;

function Stat({ icon, title, value, color }) {
  const {mode} = useShowHideSidebar();
  return (
    <StyledStat mode={mode}>
      <Icon color={color} mode={mode}>{icon}</Icon>
      <Title>{title}</Title>
      <Value>{value}</Value>
    </StyledStat>
  );
}

export default Stat;
