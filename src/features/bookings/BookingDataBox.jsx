import styled, { css } from "styled-components";
import { format, isToday } from "date-fns";
import {
  HiOutlineChatBubbleBottomCenterText,
  HiOutlineCheckCircle,
  HiOutlineCurrencyDollar,
  HiOutlineHomeModern,
} from "react-icons/hi2";

import DataItem from "../../ui/DataItem";
import { Flag } from "../../ui/Flag";

import { formatDistanceFromNow, formatCurrency } from "../../utils/helpers";
import { useShowHideSidebar } from "../../context/showHideSideBarContex";

const StyledBookingDataBox = styled.section`
  /* Box */
  background-color: var(--color-grey-0);
  border: 1px solid var(--color-grey-100);
  border-radius: var(--border-radius-md);

  overflow: hidden;
`;

const Header = styled.header`
  background-color: var(--color-brand-500);
  padding: 2rem 4rem;
  color: #e0e7ff;
  font-size: 1.8rem;
  font-weight: 500;
  display: flex;
  align-items: center;
  justify-content: space-between;
  ${(props) =>
    props.mode==="mobile" &&
    css`
      padding: 0.4rem 1rem;
    `}

  svg {
    height: 3.2rem;
    width: 3.2rem;
    ${(props) =>
    props.mode==="mobile" &&
    css`
      height: 10rem;
    width: 10rem;
    `}

  }

  & div:first-child {
    display: flex;
    align-items: center;
    gap: 1.6rem;
    font-weight: 600;
   
    ${props=>displayOptions[props.mode]};
    
  }

  & span {
    font-family: "Sono";
    font-size: 2rem;
    margin-left: 4px;
  }
`;

const displayOptions = {
  mobile:css`font-size: 1.4rem;`,
  desktop:css`font-size: 1.8rem;`
}
const sectionDisplayOptions = {
  mobile:css`padding: 3.2rem 1rem 1.2rem;`,
  desktop:css`padding: 3.2rem 4rem 1.2rem;`
}

const Section = styled.section`
  ${props=>sectionDisplayOptions[props.mode]};

`;

Section.defaultProps = {
  
  mode:"desktop"
}

const GuestDisplayOptions = {
  mobile:css`flex-direction: column;`,
  desktop:css`flex-direction: row;`
}


const Guest = styled.div`
  display: flex;
  align-items: center;
  gap: 1.2rem;
  margin-bottom: 1.6rem;
  color: var(--color-grey-500);
  ${props=>GuestDisplayOptions[props.mode]};

  & p:first-of-type {
    font-weight: 500;
    color: var(--color-grey-700);
  }
`;

Guest.defaultProps = {
  
  mode:"desktop"
}
const PriceDisplayOptions = {
  mobile:css`padding: 0.6rem 1.2rem;`,
  desktop:css`padding: 1.6rem 3.2rem;`
}

const Price = styled.div`
  display: flex;
  align-items: center;
  justify-content: space-between;
  ${props=>PriceDisplayOptions[props.mode]};
  border-radius: var(--border-radius-sm);
  margin-top: 2.4rem;

  background-color: ${(props) =>
    props.isPaid ? "var(--color-green-100)" : "var(--color-yellow-100)"};
  color: ${(props) =>
    props.isPaid ? "var(--color-green-700)" : "var(--color-yellow-700)"};

  & p:last-child {
    text-transform: uppercase;
    font-size: 1.4rem;
    font-weight: 600;
  }

  svg {
    height: 2.4rem;
    width: 2.4rem;
    color: currentColor !important;
  }
`;

Price.defaultProps = {
  
  mode:"desktop"
}

const Footer = styled.footer`
  padding: 1.6rem 4rem;
  font-size: 1.2rem;
  color: var(--color-grey-500);
  text-align: right;
`;

// A purely presentational component
function BookingDataBox({ booking }) {
  const {
    created_at,
    startDate,
    endDate,
    numNights,
    numGuests,
    cabinPrice,
    extrasPrice,
    totalPrice,
    hasBreakfast,
    observations,
    isPaid,
    guests: { fullName: guestName, email, country, countryFlag, nationalID },
    cabins: { name: cabinName },
  } = booking;
  const {mode} = useShowHideSidebar();

  return (
    <StyledBookingDataBox>
      <Header mode={mode}>
        <div>
          <HiOutlineHomeModern />
          <p>
            {numNights} nights in Cabin <span>{cabinName}</span>
          </p>
       

        <p>
          {format(new Date(startDate), "EEE, MMM dd yyyy")} (
          {isToday(new Date(startDate))
            ? "Today"
            : formatDistanceFromNow(startDate)}
          ) &mdash; {format(new Date(endDate), "EEE, MMM dd yyyy")}
        </p>
        </div>
      </Header>

      <Section mode={mode}>
        <Guest mode={mode}>
          {countryFlag && <Flag src={countryFlag} alt={`Flag of ${country}`} />}
          <p>
            {guestName} {numGuests > 1 ? `+ ${numGuests - 1} guests` : ""}
          </p>
          <span style={{display:mode==="mobile"?"none":""}}>&bull;</span>
          <p>{email}</p>
          <span style={{display:mode==="mobile"?"none":""}}>&bull;</span>
          <p>National ID {nationalID}</p>
        </Guest>

        {observations && (
          <DataItem
            icon={<HiOutlineChatBubbleBottomCenterText />}
            label="Observations"
          >
            {observations}
          </DataItem>
        )}

        <DataItem icon={<HiOutlineCheckCircle />} label="Breakfast included?">
          {hasBreakfast ? "Yes" : "No"}
        </DataItem>

        <Price isPaid={isPaid} mode={mode}>
          <DataItem icon={<HiOutlineCurrencyDollar />} label={`Total price`}>
            {formatCurrency(totalPrice)}

            {hasBreakfast &&
              ` (${formatCurrency(cabinPrice)} cabin + ${formatCurrency(
                extrasPrice
              )} breakfast)`}
          </DataItem>

          <p>{isPaid ? "Paid" : "Will pay at property"}</p>
        </Price>
      </Section>

      <Footer>
        <p>Booked {format(new Date(created_at), "EEE, MMM dd yyyy, p")}</p>
      </Footer>
    </StyledBookingDataBox>
  );
}

export default BookingDataBox;
