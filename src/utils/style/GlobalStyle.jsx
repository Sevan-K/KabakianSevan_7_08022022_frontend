/* -------------------------------------- */
/*          Secrtion des imports          */
/* -------------------------------------- */
import { createGlobalStyle } from "styled-components";

/* ------------------------------------ */
/*          Section des styles          */
/* ------------------------------------ */

// a globalstyle is created as a styled component
const StyledGlobalStyle = createGlobalStyle`
    *,
    *::after,
    *::before {
        margin: 0;
        padding: 0;
        box-sizing: inherit;
        scroll-behavior: smooth;
        font-family: 'Trebuchet MS', Helvetica, sans-serif;
        // position:relative;
    }
    html {
        font-size: 62.5%;
        scroll-behavior: smooth;
    }
        body {
        box-sizing: border-box;
        overflow-x: hidden;
        font-size:15px;
    }
    a {
        text-decoration: none;
        color: $color-text;
    }
    ul {
        list-style: none;
    }
        button {
        border: none;
    }
    * > img {
        height: 100%;  
        width: 100%;
        object-fit: cover;
        object-position: center;;
    }
    // for the fixed header
    #root {
        margin-top: 13rem;
     }
    `;

// the styled global styled is used in a component to be added to the app
function GlobalStyle() {
   return <StyledGlobalStyle />;
}

// the component is exported
export default GlobalStyle;
