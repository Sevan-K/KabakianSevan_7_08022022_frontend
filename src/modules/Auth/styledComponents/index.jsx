/* --------------------------------- */
/*          Imports Section          */
/* --------------------------------- */
import styled from "styled-components";
import { mainSize, colors } from "../../../utils/style/variables";

/* ------------------------------------------- */
/*          Styled components section          */
/* ------------------------------------------- */
// styled component for the main element
export const MainAuth = styled.main`
   width: ${({ matchesSmall }) =>
      matchesSmall ? mainSize.smallscreen : mainSize.regular};
   max-width: 50rem;
   margin: auto;
   padding: 2rem;
   border-radius: 1rem;
   text-align: center;
   // background-color: ${colors.backgroundLight};
   // border: 0.1rem solid ${colors.primary};
   background-color: ${colors.newCommentBg};
   box-shadow: 0.2rem 0.2rem 0.4rem ${colors.unactiveLink};
   & div {
      margin: 2rem 0;
   }
`;

// styled component fo the button
export const StyledButton = styled.button`
   padding: 1rem 2rem;
   color: ${({ $isSelected }) =>
      $isSelected ? "#FFF" : colors.darkUnactiveLink};
   background-color: ${({ $isSelected }) =>
      $isSelected ? colors.primary : "#FFF"};
   z-index: ${({ $isSelected }) => ($isSelected ? 1 : 2)};
   font-weight: bold;
   font-size: 1.5rem;
   transition: 500ms;
   box-shadow: 0.1rem 0.1rem 0.5rem ${colors.unactiveLink};
   &:first-of-type {
      border-bottom-left-radius: 1rem;
      border-top-left-radius: 1rem;
   }
   &:last-of-type {
      border-top-right-radius: 1rem;
      border-bottom-right-radius: 1rem;
   }
`;

// styled component fo the succesfull sign up message
export const SignUpMessage = styled.p`
   border-top: 0.1rem solid ${colors.unactiveLink};
   border-bottom: 0.1rem solid ${colors.unactiveLink};
   padding: 1rem 0;
   color: ${colors.darkUnactiveLink};
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

// styled component fo the label on authentication forms
export const AuthLabel = styled.label`
   color: ${colors.darkUnactiveLink};
   padding: 0.5rem;
   font-style: italic;
   margin-top: 1rem;
`;