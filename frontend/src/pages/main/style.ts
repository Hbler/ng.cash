import styled from "styled-components";

export const SMain = styled.main`
  .container {
    min-height: 100vh;

    display: flex;
    justify-content: space-between;

    color: ${({ theme: { secondary } }) => secondary};

    & > h1 {
      top: 50%;
      left: 50%;

      transform: translate(-50%, -50%);
      position: absolute;
    }

    h2 {
      text-align: center;

      font-weight: 500;
      font-size: 3.8rem;
      text-transform: uppercase;
    }

    h3 {
      margin: 0 auto;

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

      & > p {
        text-align: center;

        font-size: 2rem;
        font-weight: 300;
        text-transform: uppercase;
        color: ${({ theme: { secondary } }) => secondary};

        span {
          font-weight: 500;
        }
      }

      &:nth-child(1) {
        background-color: ${({ theme: { secondary } }) => secondary};

        h2 {
          font-weight: 300;
          color: ${({ theme: { primary } }) => primary};
        }

        h3 {
          padding: 0 1rem;

          color: ${({ theme: { primary } }) => primary};
          text-align: center;

          border: 1px solid;
          border-radius: 5px;
          border-color: ${({ theme: { primary } }) => primary};
        }

        & > button {
          width: 40%;

          font-size: 1rem;

          border-radius: 5px;
        }

        svg {
          top: 2%;
          left: 2%;

          font-size: 1.5rem;
          color: ${({ theme: { primary } }) => primary};

          cursor: pointer;
          position: absolute;

          &:hover {
            color: ${({ theme: { accent } }) => accent};
          }

          &:nth-child(2) {
            left: unset;
            right: 2%;
          }
        }
      }
    }

    .transactions {
      width: 100%;
      height: 40vh;
      padding: 0.8rem 0.8rem 1.5rem;

      gap: 0.5rem;
      display: flex;
      flex-direction: column;

      overflow: scroll;
      border: 1px solid;
      border-radius: 5px;
      border-color: ${({ theme: { secondary } }) => secondary};
    }

    .filters {
      width: 100%;

      gap: 1rem;
      display: flex;

      button {
        margin: unset;

        border-radius: 5px;

        :hover {
          background-color: ${({ theme: { accent } }) => accent};
        }
      }
    }

    .filter_date {
      width: 100%;

      display: flex;
      align-items: center;
      justify-content: space-between;

      input {
        width: 50%;

        text-align: center;
      }

      button {
        width: 40%;
        margin: unset;

        border-radius: 5px;

        :hover {
          background-color: ${({ theme: { accent } }) => accent};
        }
      }
    }
  }
`;
