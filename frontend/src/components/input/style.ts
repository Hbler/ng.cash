import styled from "styled-components";

export const InputContainer = styled.div`
  width: 100%;
  margin: 0 0 0.5rem 0;
  padding: 0.5rem 0;

  gap: 0.3rem;
  display: flex;
  flex-direction: column;

  input {
    height: 45px;
    padding: 0 0.8rem;

    font-size: 1rem;
    color: ${({ theme: { secondary } }) => secondary};

    border: none;
    border-radius: 3px 3px 0 0;
    border-bottom: 2px solid;
    border-color: ${({ theme: { highlight } }) => highlight};
    background-color: ${({ theme: { secondaryA30 } }) => secondaryA30};

    ::placeholder {
      font-weight: 500;
      font-size: 0.8rem;
      color: ${({ theme: { secondaryA70 } }) => secondaryA70};
    }
  }

  small {
    margin-top: 0.3rem;
    color: ${({ theme: { error } }) => error};
  }
`;
