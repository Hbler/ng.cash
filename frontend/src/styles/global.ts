import { createGlobalStyle } from "styled-components";

import { Theme } from "./theme";

const breakpoints = [576, 768, 992, 1200, 2000];
export const mq = breakpoints.map((bp) => `@media (min-width: ${bp}px)`);

export const GlobalStyle = createGlobalStyle<{ theme: Theme }>`
:root{
    --toastify-color-light: ${({ theme: { primary } }) => primary};
    --toastify-color-success: ${({ theme: { success } }) => success};
    --toastify-color-error: ${({ theme: { error } }) => error};
    --toastify-text-color-light: ${({ theme: { secondary } }) => secondary};
}

*{
    margin: 0;
    padding: 0;
    transition: 0.2s;
    box-sizing: border-box;
    scroll-behavior: smooth;
    font-family: 'IBM Plex Sans', sans-serif;
}

body{
    background-color: ${({ theme: { primary } }) => primary};
}

button{
    border: none;
    
    :hover{
        cursor: pointer;
    }
}

a{
    font-weight: 700;
    text-decoration: none;
    color: ${({ theme: { highlight } }) => highlight};
    :hover{
        color: ${({ theme: { highlight } }) => highlight};
    }
}

ul, ol{
    list-style: none;
}

img {
    width: 100%;
}

.container{
    width: 100%;
    max-width: 1200px;
    margin: auto;
    padding: 0.8rem;
}
`;
