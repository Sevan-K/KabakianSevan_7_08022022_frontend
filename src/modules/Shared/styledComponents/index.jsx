/* --------------------------------- */
/*          Imports Section          */
/* --------------------------------- */
import styled from "styled-components";
import { Link } from "react-router-dom";
import { colors , padding} from "../../../utils/style/variables";

/* ------------------------------------------------- */
/*         Header Styled components section          */
/* ------------------------------------------------- */
// styled component for the header
export const StyledHeader = styled.header`
   padding: ${({ matchesSmall }) =>
      matchesSmall ? "1rem 1rem 0 1rem" : "2rem 2rem 0 2rem"};
   display: flex;
   flex-flow: row wrap;
   // flex-direction: column;
   // style for the fixed header
   position: fixed;
   right: 0;
   left: 0;
   top: 0;
   z-index: 1;
   background-color: white;
   justify-content: flex-end;
   align-items: center;
   border-bottom: ${({ matchesBig }) =>
      matchesBig ? "0.1rem solid #a4b0be" : "none"};
   & button {
      order: 4;
   }
`;

// styled component for the <p> where the image is
export const LogoWrapper = styled.p`
   margin-right: auto;
   align-self: center;
   width: 40%;
   max-width: 25rem;
   height: ${({ matchesBig }) => (matchesBig ? "7rem" : "5rem")};
   ${({ matchesSmall }) => matchesSmall && "width: 5rem"};
   order: 1;
`;

// styled component for the profile in link
export const ProfilLink = styled(Link)`
   display: flex;
   flex-direction: row;
   padding: 1rem;
   align-items: center;
   justify-content: space-evenly;
   border-radius: 3rem;
   color: ${colors.unactiveLink};
   font-weight: bold;
   font-size: clamp(1.2rem, 1rem + 1vw, 1.5rem);
   // line-height:
   order: 3;
   &:hover {
      box-shadow: 0.25rem 0.25rem 0.5rem ${colors.unactiveLink};
      background-color: ${colors.backgroundLight};
   }
   & .icon {
      color: ${colors.primary};
      margin-left: 1rem;
   }
`;

// styled component for the <p> where the image is
export const ImageWrapper = styled.p`
   align-self: center;
   width: 8vw;
   max-width: 3.5rem;
   height: 8vw;
   max-height: 3.5rem;
   border-radius: 5vw;
   overflow: hidden;
   margin-right: ${padding.icons};
`;

// styled component for the log in link
export const LogInLink = styled(Link)`
   padding: 1rem;
   font-size: 2.1rem;
   background: none;
   color: ${colors.unactiveLink};
   order: 3;
   &:hover {
      color: ${colors.primary};
   }
`;

// styled component for navigator
export const NavBar = styled.nav`
   // flex: 1 1 ${({ matchesBig }) => (matchesBig ? "40%" : "100%")};
   width: ${({ matchesBig }) => (matchesBig ? "40%" : "100%")};
   margin: 0 auto;
   display: flex;
   justify-content: space-evenly;
   align-items: center;
   border-bottom: ${({ matchesBig }) =>
      matchesBig ? "non" : "0.1rem solid #a4b0be"};
   order: ${({ matchesBig }) => (matchesBig ? "2" : "5")};
   // ${({ matchesBig }) => matchesBig && "line-height: 6rem"};
   line-height: ${({ matchesBig }) => (matchesBig ? "6rem" : "3rem")};
`;

// styled component for the nav in link
export const NavLink = styled(Link)`
   font-size: 2.1rem;
   color: ${({ $isConcerned }) =>
      $isConcerned ? colors.primary : colors.unactiveLink};
   border-bottom: 0.2rem solid
      ${({ $isConcerned }) => ($isConcerned ? colors.primary : "transparent")};
   flex: 1;
   text-align: center;
   padding: 0.5rem;
   transition: 300ms ease-out;
   &:hover {
      color: ${colors.primary};
   }
`;

/* ------------------------------------------------- */
/*         Shared Styled components section          */
/* ------------------------------------------------- */
// styled component for forms' error messages
export const ErrorMessage = styled.p`
   color: ${colors.error};
   font-size: 1.2rem;
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

// styled component for page h1
export const PageTitle = styled.h1`
   color: ${colors.unactiveLink};
   margin-bottom: 1rem;
   padding: ${padding.icons};
   text-align: center;
   font-size: 2.5rem;
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