import styled, { css } from "styled-components";

interface Props {
  color?: string;
  size?: string;
}
export const StyledBtn = styled.button<Props>`
  width: 100%;
  margin: 0 0 1rem 0;
  padding: 0 0.8rem;

  font-size: 1.2rem;

  border-radius: 0 0 5px 5px;
  cursor: pointer;

  ${({ color }) => {
    switch (color) {
      case "pink":
        return css`
          font-weight: 500;
          color: ${({ theme: { primary } }) => primary};
          background-color: ${({ theme: { accent } }) => accent};
          :hover {
            background-color: ${({ theme: { secondary } }) => secondary};
          }
        `;
      case "purple":
        return css`
          font-weight: 500;
          color: ${({ theme: { secondary } }) => secondary};
          background-color: ${({ theme: { highlight } }) => highlight};
          :hover {
            background-color: ${({ theme: { primary } }) => primary};
          }
        `;
      default:
        return css`
          font-weight: 500;
          color: ${({ theme: { primary } }) => primary};
          background-color: ${({ theme: { secondary } }) => secondary};
          :hover {
            border: 1px solid;
            border-color: ${({ theme: { primary } }) => primary};
          }
        `;
    }
  }}

  ${({ size }) => {
    switch (size) {
      case "sm":
        return css`
          height: 30px;
        `;
      case "lg":
        return css`
          height: 60px;
        `;
      default:
        return css`
          height: 45px;
        `;
    }
  }}
`;
