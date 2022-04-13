/* --------------------------------- */
/*          Imports Section          */
/* --------------------------------- */
import styled from "styled-components";
import { colors } from "../../../../utils/style/variables";

/* ------------------------------------------------------------------- */
/*         NewCommentForm component styled components section          */
/* ------------------------------------------------------------------- */
// styled component for the new comment form
export const NewCommentStyledForm = styled.form`
   background-color: ${colors.newCommentBg};
   display: flex;
   flex-flow: row wrap;
   justify-content: flex-end;
   align-items: center;
   padding: 0.7rem;
   border-radius: 3rem;
   &:focus-within {
      box-shadow: 0.1rem 0.1rem 0.25rem ${colors.unactiveLink};
   }
   & button {
      width: 15%;
   }
   p {
      width: 100%;
      text-align: center;
      margin-top: 1rem;
   }
`;

// styled component for the new comment textare
export const NewCommentTextArea = styled.textarea`
   width: 70%;
   border: none;
   background-color: transparent;
   font-size: 1.3rem;
   resize: vertical;
   min-height: 1.5rem;
`;
