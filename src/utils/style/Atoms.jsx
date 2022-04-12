/* --------------------------------- */
/*          Imports Section          */
/* --------------------------------- */
import { Link } from "react-router-dom";
import styled, { keyframes } from "styled-components";
import { colors, padding } from "./variables";

/* --------------------------------------------- */
/*          Styled components to export          */
/* --------------------------------------------- */

// styled component for round user  image wrapper
export const UserImageWrapper = styled(Link)`
   width: 10vw;
   max-width: 6rem;
   height: 10vw;
   max-height: 6rem;
   border-radius: 5vw;
   overflow: hidden;
   margin-right: ${padding.icons};
`;

// styled component for round user  image wrapper
export const SmallUserImageWrapper = styled(Link)`
   width: 8vw;
   max-width: 4rem;
   height: 8vw;
   max-height: 4rem;
   border-radius: 5vw;
   overflow: hidden;
   margin-right: ${padding.icons};
`;

// styled component for pseudo in post an comment cards
export const PseudoText = styled.p`
   font-weight: bold;
   color: ${colors.darkUnactiveLink};
`;

// styled component for date in post an comment cards
export const DateText = styled.p`
   grid-area: date;
   color: ${({ color }) => (color ? color : colors.unactiveLink)};
   font-style: italic;
   font-size: 1.2rem;
`;


/* ----------------------------------------- */
/*         Loader component section          */
/* ----------------------------------------- */

// style pour le loader
const rotate = keyframes`
from {
  transform: rotate(0deg);
}
to {
  transform : rotate(360deg);
}
`;

const loader_disappear = keyframes`
to {
   opacity: 0;
   z-index: -1;
 }`;

export const Loader = styled.div`
   position: fixed;
   right: 0;
   left: 0;
   top: 0;
   bottom: 0;
   background-color: #fff;
   z-index: 10;
   display: flex;
   flex-direction: column;
   justify-content: flex-start;
   align-items: center;
   animation: ${loader_disappear} 500ms 1500ms forwards;
`;

export const LoaderLogo = styled.p`
   margin-top: 15rem;
   height: 50vw;
   width: 80vw;
   max-width: 35rem;
   max-height: 20rem;
`;

export const LoaderSpinner = styled.div`
   border: clamp(0.3rem, 0.25rem + 1vw, 1.5rem) solid ${colors.backgroundLight};
   border-bottom-color: ${colors.primary};
   border-radius: 50%;
   animation: ${rotate} 750ms infinite linear;
   height: 20vw;
   width: 20vw;
   max-width: 15rem;
   max-height: 15rem;
`;

export const LoaderText = styled.p`
   margin-bottom: 5rem;
   color: ${colors.darkUnactiveLink};
   font-size: 1.7rem;
   font-style: italic;
`;
