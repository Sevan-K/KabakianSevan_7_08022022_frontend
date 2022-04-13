/* --------------------------------- */
/*          Imports Section          */
/* --------------------------------- */
import { faCircleXmark, faPaperPlane } from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { useState } from "react";
import { useDispatch } from "react-redux";
import {
   addComment,
   getAllComments,
} from "../../../../actions/comments.action";
import { useUserId } from "../../../../utils/hooks";
import { colors } from "../../../../utils/style/variables";
// styled components
import { ErrorMessage, IconButton } from "../../../Shared/styledComponents";
import { NewCommentStyledForm, NewCommentTextArea } from "./styledComponents";

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

   // component to return
   return (
      <NewCommentStyledForm action="" onSubmit={handleNewCommentSubmit}>
         {/* -------------- Cancel button, if content is not null -------------- */}
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
         {/* -------------- Visible part (textarea and sumbit button) -------------- */}
         <NewCommentTextArea
            name=""
            id=""
            placeholder="Votre réaction..."
            value={newCommentContent}
            onChange={(event) => setNewCommentContent(event.target.value)}
         ></NewCommentTextArea>
         <IconButton color={colors.darkUnactiveLink} type="submit">
            <FontAwesomeIcon icon={faPaperPlane} />
         </IconButton>
         {/* -------------- Potential error message -------------- */}
         {error && (
            <ErrorMessage>
               Entrez un contenu valide 😐 Pas de caractères spéciaux...
            </ErrorMessage>
         )}
      </NewCommentStyledForm>
   );
}

// export the create component
export default NewCommentForm;
