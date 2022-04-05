/* --------------------------------- */
/*          Imports Section          */
/* --------------------------------- */
import { Link } from "react-router-dom";
import styled, { keyframes } from "styled-components";
import { colors, padding } from "./variables";

/* --------------------------------------------- */
/*          Styled components to export          */
/* --------------------------------------------- */

/* -------------------- Profile -------------------- */
// styled component for page h1
export const PageTitle = styled.h1`
   color: ${colors.unactiveLink};
   margin-bottom: 1rem;
   padding: ${padding.icons};
   text-align: center;
   font-size: 2.5rem;
`;

// styled component for image wrapper on profile components (data and form)
export const ProfileImageWrapper = styled.p`
   border-radius: 50%;
   overflow: hidden;
   width: 17rem;
   height: 17rem;
   border: 0.2rem solid ${colors.darkUnactiveLink};
   // box-shadow: 0.25rem 0.25rem 0.5rem darkgrey;
`;

// styled component for articles on profile components
export const ProfileArticles = styled.article`
   // background-color: white;
   // padding: 2rem;
   // margin: 1.5rem 0;
   // border-radius: 1rem;
   // box-shadow: 0.25rem 0.25rem 0.5rem darkgrey;
   width: 100%;
   display: flex;
   flex-direction: column;
   align-items: center;
   & h3 {
      margin: 1rem 0;
   }
`;

// styled component for div wrapper on profile components
export const ProfileWrapper = styled.div`
   background-color: white;
   padding: 2rem;
   border-radius: 1rem;
   box-shadow: 0.25rem 0.25rem 0.5rem ${colors.unactiveLink};
   margin: 1.5rem 0;
   display: flex;
   flex-direction: column;
   align-items: center;
`;

// styled component for the log in link
export const IconButton = styled.button`
   padding: ${padding.icons};
   font-size: 2.1rem;
   background: none;
   color: ${({ color }) => (color ? color : colors.unactiveLink)};
   transition: 300ms;
   &:hover {
      color: ${colors.primary};
   }
`;

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

// styled component fo the submit input on authentication forms
export const AuthForm = styled.form`
   background-color: white;
   display: flex;
   flex-direction: column;
   align-items: center;
   border-radius: 1.5rem;
   padding: 2rem;
   box-shadow: 0.1rem 0.1rem 0.5rem lightgray;
   margin-top: 2rem;
   & h3 {
      margin: 1rem 0;
   }
`;

// styled component fo the submit input on authentication forms
export const AuthSumbitInput = styled.input`
   // background-color: ${colors.backgroundLight};
   background-color: ${colors.primary};
   color: white;
   border: none;
   border-radius: 1rem;
   padding: 1rem 2rem;
   margin: 2rem 0;
   font-weight: bold;
   transition: all 200ms linear;
   max-width: 90%;
   box-shadow: 0.1rem 0.1rem 0.2rem ${colors.unactiveLink};
   &:hover {
      box-shadow: 0.3rem 0.3rem 0.6rem ${colors.unactiveLink};
      background-color: ${colors.primary};
      color: white;
   }
`;

// styled component fo the label on authentication forms
export const AuthLabel = styled.label`
   color: ${colors.darkUnactiveLink};
   padding: 0.5rem;
   font-style: italic;
   margin-top: 1rem;
`;

// styled component for forms' error messages
export const ErrorMessage = styled.p`
   color: ${colors.error};
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
