/* --------------------------------- */
/*          Imports Section          */
/* --------------------------------- */
import styled from "styled-components";
import { colors, mainSize, padding } from "../../../utils/style/variables";

/* ------------------------------------------------------------- */
/*         Home module shared styled components section          */
/* ------------------------------------------------------------- */

/* --------------------------------------------------------- */
/*         Home component styled components section          */
/* --------------------------------------------------------- */
// styled component for home page main component
export const HomeMain = styled.main`
   max-width: 60rem;
   margin: auto;
   width: ${({ matchesSmall }) =>
      matchesSmall ? mainSize.smallscreen : mainSize.regular};
`;

/* ---------------------------------------------------------------- */
/*         NewPostForm component styled components section          */
/* ---------------------------------------------------------------- */
// styled component for the form wrapper
export const NewPostFormWrapper = styled.div`
   padding: 2rem;
   width: 100%;
   margin: 0 auto 3rem;
   border-radius: 2rem;
   border-bottom-left-radius: 0;
   // border-top-right-radius: 0;
   display: flex;
   flex-direction: column;
   align-items: center;
   background-color: ${colors.backgroundLight};
   box-shadow: 0.15rem 0.15rem 0.3rem ${colors.unactiveLink};

   transition: 200ms;
   &:focus-within {
      box-shadow: 0.4rem 0.4rem 0.8rem ${colors.unactiveLink};
   }
`;

// styled component fo the form
export const StyledForm = styled.form`
   width: 100%;
   display: flex;
   flex-flow: row wrap;
   & p {
      width: 100%;
      text-align: center;
      margin-top: 1rem;
   }
`;

// styled component for form header
export const FormHeader = styled.header`
   flex: 1 1 100%;
   display: flex;
   justify-content: space-between;
   align-items: center;
   margin-bottom: 1rem;
   & > h3 {
      font-size: 1.5rem;
      color: ${colors.darkUnactiveLink};
   }
`;

// styled component for textarea
export const StyledTextArea = styled.textarea`
   flex: 1 1 50%;
   border-radius: 1rem;
   border: none;
   padding: 0.5rem 1rem;
   min-width: 5rem;
`;

// styled component for the log in link
export const IconLabel = styled.label`
   display: flex;
   align-items: center;
   padding: ${padding.icons};
   font-size: 2.1rem;
   background: none;
   color: ${colors.darkUnactiveLink};
   transition: 300ms;
   &:hover {
      color: ${colors.primary};
   }
`;

// styled component for post preview (to be replaced by a post component when styled)
export const PostPreview = styled.div`
   width: 100%;
   margin-top: 2rem;
   border: 0.1rem solid ${colors.primary};
   border-radius: 1rem;
   padding: 1rem;
   background-color: #fff;
   & > p {
      margin-bottom: 1rem;
   }
`;