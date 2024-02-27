import styled, { css } from "styled-components";

import Heading from "../../ui/Heading";
import Row from "../../ui/Row";
import { useTodayActivity } from "./useTodayActivity";
import Spinner from "../../ui/Spinner";
import TodayItem from "./TodayItem";
import { useShowHideSidebar } from "../../context/showHideSideBarContex";

const displayonCond={
  desktop: css`grid-column: 1 / span 2;`,
  mobile:css`grid-column: 1 / -1;`
}

const StyledToday = styled.div`
  /* Box */
  background-color: var(--color-grey-0);
  border: 1px solid var(--color-grey-100);
  border-radius: var(--border-radius-md);

  padding: 3.2rem;
  display: flex;
  flex-direction: column;
  gap: 2.4rem;
  ${props=>displayonCond[props.mode]};
  padding-top: 2.4rem;
`;

const TodayList = styled.ul`
  overflow: scroll;
  overflow-x: hidden;

  /* Removing scrollbars for webkit, firefox, and ms, respectively */
  &::-webkit-scrollbar {
    width: 0 !important;
  }
  scrollbar-width: none;
  -ms-overflow-style: none;
`;

const NoActivity = styled.p`
  text-align: center;
  font-size: 1.8rem;
  font-weight: 500;
  margin-top: 0.8rem;
`;
StyledToday.defaultProps = {
  
  mode:"desktop"
}
function TodayActivity() {
  const { activities, isLoading } = useTodayActivity();
  const {mode} = useShowHideSidebar();
  return (
    <StyledToday mode={mode}>
      <Row type="horizontal">
        <Heading as="h2">Today</Heading>
      </Row>
      {!isLoading ? (
        activities?.length > 0 ? (
          <TodayList>{activities.map(activity=><TodayItem activity={activity} key={activity.id}/>)}</TodayList>
        ) : (
          <NoActivity>No activity today ....</NoActivity>
        )
      ) : (
        <Spinner />
      )}
    </StyledToday>
  );
}

export default TodayActivity;
