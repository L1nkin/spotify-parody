import { createGlobalStyle } from "styled-components";

const GlobalStyles = createGlobalStyle`
    body {
        margin: 0;
        padding: 0 15%; /* Horizontal offset by 15% */
        font-family: 'Arial', sans-serif;
        background: linear-gradient(to bottom, #2b2b2b, black); /* Very dark grey to black */
        color: white;
    }

    #root {
        display: flex;
        flex-direction: column;
        min-height: 100vh;
    }

    * {
        box-sizing: border-box;
    }
`;

export default GlobalStyles;
