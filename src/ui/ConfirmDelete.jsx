import styled, { css } from "styled-components";
import Button from "./Button";
import Heading from "./Heading";
import { useDarkMode } from "../context/DarkModeContex";
import { useShowHideSidebar } from "../context/showHideSideBarContex";

const StyledConfirmDelete = styled.div`
  width: 40rem;
  display: flex;
  flex-direction: column;
  gap: 1.2rem;
  ${(props) =>
    props.mode==="mobile"&&
    css`
      width: 100%;
    `}


  & p {
    color: var(--color-grey-500);
    margin-bottom: 1.2rem;
  }

  & div {
    display: flex;
    justify-content: flex-end;
    gap: 1.2rem;
  }
`;



function ConfirmDelete({ resourceName, onConfirm, disabled,onCloseModal }) {
  const{isDarkMode}=useDarkMode();
  const {mode} = useShowHideSidebar();
  const highlightTextColor = isDarkMode?"white":"black";
  return (
    <StyledConfirmDelete mode={mode}>
      <Heading as="h3">Delete {resourceName}</Heading>
      <p>
        Are you sure you want to delete this {resourceName!="Cabins"?<strong style={{color:highlightTextColor}}>{resourceName}</strong>:"cabin"}  permanently? This
        action cannot be undone.
      </p>

      <div>
        <Button variation="secondary" disabled={disabled} onClick={onCloseModal}>
          Cancel
        </Button>
        <Button variation="danger" disabled={disabled} onClick={onConfirm}>
          Delete
        </Button>
      </div>
    </StyledConfirmDelete>
  );
}

export default ConfirmDelete;
