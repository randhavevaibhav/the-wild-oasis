import styled, { css } from "styled-components";

const Form = styled.form`
  ${(props) =>
    props.type === "regular" &&
    css`
     

      /* Box */
      background-color: var(--color-grey-0);
      border: 1px solid var(--color-grey-100);
      border-radius: var(--border-radius-md);
    `}

  ${(props) =>
    props.type === "modal" &&
    css`
      width: 85rem;
    `}

    ${(props) =>
    props.mode === "mobile" &&
    css`
     padding: 2rem 1rem;
     width: 100%;
    
    `}
    ${(props) =>
    props.mode === "desktop" &&
    css`
     padding: 2.4rem 4rem;
    
    `}
    
  overflow: hidden;
  font-size: 1.4rem;
`;

Form.defaultProps={
  type:"regular",
  mode:"desktop"
}

export default Form;
