import { useSearchParams } from "react-router-dom";
import styled, { css } from "styled-components";

const StyledFilter = styled.div`
  border: 1px solid var(--color-grey-100);
  background-color: var(--color-grey-0);
  box-shadow: var(--shadow-sm);
  border-radius: var(--border-radius-sm);
  padding: 0.4rem;
  display: flex;
  gap: 0.4rem;
`;

const FilterButton = styled.button`
  background-color: var(--color-grey-0);
  border: none;

  ${(props) =>
    props.active &&
    css`
      background-color: var(--color-brand-600);
      color: var(--color-brand-50);
    `}

  border-radius: var(--border-radius-sm);
  font-weight: 500;
  font-size: 1.4rem;
  /* To give the same height as select */
  padding: 0.44rem 0.8rem;
  transition: all 0.3s;

  &:hover:not(:disabled) {
    background-color: var(--color-brand-600);
    color: var(--color-brand-50);
  }
`;

const Filter = ({ filterField, options }) => {
  const [searchParams, setSearchParams] = useSearchParams();
  const currentFilter = searchParams.get(filterField) || options.at(0).value;
  
  
  function handleClick(value) {
    searchParams.set(filterField, value);
    //bug fix: if we select all filter in bookings and go to page 2 or 3
  //then if we select filter as check-out then application crash because here page no become 2 or 3(i.e, which ever the page no. is) and then that same search param (i.e., page) passed to check-out filter but that filter has only 8 records so we get query to fetch 15 records which resulted in error. so after every new filter application setting value of page to 1. below==>
      if(searchParams.get("page"))
      {
        searchParams.set("page",1);

      }
    
    setSearchParams(searchParams);
  }

  return (
    <StyledFilter>
      {options.map((option) => (
        <FilterButton
          key={option.value}
          onClick={() => handleClick(option.value)}
          active={option.value === currentFilter}
          disabled={option.value === currentFilter}
        >
          {option.label}
        </FilterButton>
      ))}
    </StyledFilter>
  );
};

export default Filter;
