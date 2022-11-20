import styled from "styled-components";

export const SMain = styled.main`
  .container {
    min-height: 100vh;

    display: flex;
    justify-content: space-between;

    color: ${({ theme: { secondary } }) => secondary};

    h1 {
      width: 100%;

      font-size: 5rem;
      font-weight: 700;
      text-transform: uppercase;
      font-family: "IBM Plex Mono", monospace;
    }

    h2 {
      width: 100%;

      font-weight: 500;
      font-size: 3.5rem;
      text-transform: uppercase;
    }

    h3 {
      width: 100%;

      font-size: 2.5rem;
      font-weight: 300;
    }

    & > div {
      width: 45%;

      gap: 1.5rem;
      display: flex;
      flex-direction: column;
      align-items: center;
      justify-content: center;

      border-radius: 5px;
      position: relative;

      svg {
        top: 2%;
        left: 1%;

        font-size: 1.5rem;
        color: ${({ theme: { secondary } }) => secondary};

        cursor: pointer;
        position: absolute;

        &:hover {
          color: ${({ theme: { accent } }) => accent};
        }
      }

      &:nth-child(2) {
        background-color: ${({ theme: { secondary } }) => secondary};

        h2 {
          font-weight: 300;
          text-align: center;
          color: ${({ theme: { primary } }) => primary};
        }

        & > small {
          text-transform: uppercase;
          color: ${({ theme: { primary } }) => primary};
        }

        & > button {
          width: 40%;

          font-size: 1rem;

          border-radius: 5px;
        }
      }
    }
  }
`;
