/* --------------------------------- */
/*          Imports Section          */
/* --------------------------------- */
import { faCircleXmark, faPaperPlane } from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { useState } from "react";
import { useDispatch } from "react-redux";
import styled from "styled-components";
import { addComment, getAllComments } from "../../actions/comments.action";
import { useUserId } from "../../utils/hooks";
import { ErrorMessage, IconButton } from "../../utils/style/Atoms";
import { colors } from "../../utils/style/variables";

/* ------------------------------------------- */
/*          Styled components section          */
/* ------------------------------------------- */
// styled component for the new comment form
const StyledForm = styled.form`
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
const StyledTextArea = styled.textarea`
   width: 70%;
   border: none;
   background-color: transparent;
   font-size: 1.3rem;
   resize: vertical;
   min-height: 1.5rem;
`;

/* --------------------------------------------- */
/*          Components creation section          */
/* --------------------------------------------- */

function NewCommentForm({ postId }) {
   // getting id of logged in user
   const { userId } = useUserId();
   // local state to store new comment content
   const [newCommentContent, setNewCommentContent] = useState("");

   // get acces to redux actions using useDispatch hook
   const dispatch = useDispatch();

   // local state to display error message
   const [error, setError] = useState(false);

   // function to submit new comment
   const handleNewCommentSubmit = async (event) => {
      // prevent page reload
      event.preventDefault();

      // regex for content
      const regexForContent =
      /^((?!-)(?!.*--)(?!')(?!.*'')[-A-ZÀ-ÿa-z0-9!,?. ':;()^]{2,2000}(?<!-)(?<!'))$/;

      if (regexForContent.test(newCommentContent)) {
         // building the comment to add to DB
         const newComment = { content: newCommentContent, userId, postId };
         // add comment to DB using comments action
         await dispatch(addComment(newComment));
         // reload all comments
         dispatch(getAllComments());
         // reset new comment content
         setNewCommentContent("");
      } else {
         setError(true);
      }
   };

   return (
      <StyledForm action="" onSubmit={handleNewCommentSubmit}>
         {newCommentContent && (
            <IconButton
               color={colors.darkUnactiveLink}
               onClick={(event) => {
                  event.preventDefault();
                  setNewCommentContent("");
                  setError(false);
               }}
            >
               <FontAwesomeIcon icon={faCircleXmark} />
            </IconButton>
         )}
         <StyledTextArea
            name=""
            id=""
            placeholder="Votre réaction..."
            value={newCommentContent}
            onChange={(event) => setNewCommentContent(event.target.value)}
         ></StyledTextArea>

         <IconButton color={colors.darkUnactiveLink} type="submit">
            <FontAwesomeIcon icon={faPaperPlane} />
         </IconButton>
         {error && (
            <ErrorMessage>
               Entrez un contenu valide 😐 Pas de caractères spéciaux...
            </ErrorMessage>
         )}
      </StyledForm>
   );
}

// export the create component
export default NewCommentForm;
