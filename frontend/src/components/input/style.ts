import styled from "styled-components";

export const InputContainer = styled.div`
  width: 100%;
  margin: 0 0 0.5rem 0;
  padding: 0.5rem 0;

  gap: 0.3rem;
  display: flex;
  flex-direction: column;

  label {
    color: ${({ theme: { primary } }) => primary};
  }

  input {
    height: 45px;
    padding: 0 0.8rem;

    font-size: 1rem;
    color: ${({ theme: { primary } }) => primary};

    border: none;
    border-radius: 3px 3px 0 0;
    border-bottom: 2px solid;
    border-color: ${({ theme: { highlight } }) => highlight};
    background-color: ${({ theme: { primaryA30 } }) => primaryA30};

    ::placeholder {
      font-weight: 500;
      font-size: 0.8rem;
      color: ${({ theme: { primaryA70 } }) => primaryA70};
    }
  }

  small {
    margin-top: 0.3rem;
    color: ${({ theme: { error } }) => error};
  }
`;
