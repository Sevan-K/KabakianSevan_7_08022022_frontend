/* --------------------------------- */
/*          Imports Section          */
/* --------------------------------- */
import {
   faCircleXmark,
   faPaperPlane,
} from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { useState } from "react";
import { useDispatch } from "react-redux";
import styled from "styled-components";
import { addComment, getAllComments } from "../../actions/comments.action";
import { useUserId } from "../../utils/hooks";
import { IconButton } from "../../utils/style/Atoms";
import { colors } from "../../utils/style/variables";

/* ------------------------------------------- */
/*          Styled components section          */
/* ------------------------------------------- */
// styled component for the new comment form
const StyledForm = styled.form`
   background-color: ${colors.newCommentBg};
   display: flex;
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

   // function to submit new comment
   const handleNewCommentSubmit = async (event) => {
      // prevent page reload
      event.preventDefault();
      // building the comment to add to DB
      const newComment = { content: newCommentContent, userId, postId };
      // add comment to DB using comments action
      await dispatch(addComment(newComment));
      // reload all comments
      dispatch(getAllComments());
      // reset new comment content
      setNewCommentContent("");
   };

   return (
      <StyledForm action="" id="new-comment-form">
         {newCommentContent && (
            <IconButton
               color={colors.darkUnactiveLink}
               onClick={(event) => {
                  event.preventDefault();
                  setNewCommentContent("");
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

         <IconButton
            color={colors.darkUnactiveLink}
            type="submit"
            onClick={handleNewCommentSubmit}
         >
            <FontAwesomeIcon icon={faPaperPlane} />
         </IconButton>
      </StyledForm>
   );
}

// export the create component
export default NewCommentForm;
