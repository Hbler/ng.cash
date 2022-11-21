import styled from "styled-components";

export const SCard = styled.li`
  padding: 0.5rem 0.8rem;

  display: flex;
  justify-content: space-between;

  border-radius: 3px;
  background-color: ${({ theme: { secondaryA30 } }) => secondaryA30};

  & > svg {
    position: relative;
  }

  small {
    width: 50%;

    text-align: right;
  }
`;
