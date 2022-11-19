import styled from "styled-components";

export const SForm = styled.form`
  width: 80%;
  padding: 0.8rem;

  display: flex;
  align-items: center;
  flex-direction: column;

  border-radius: 5px;
  background-color: ${({ theme: { primary } }) => primary};
`;
