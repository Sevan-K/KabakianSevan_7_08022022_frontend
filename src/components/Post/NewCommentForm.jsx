/* --------------------------------- */
/*          Imports Section          */
/* --------------------------------- */
import {
   faCircleArrowLeft,
   faCircleXmark,
   faPaperPlane,
} from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { useState } from "react";
import { useDispatch } from "react-redux";
import { addComment, getAllComments } from "../../actions/comments.action";
import { useUserId } from "../../utils/hooks";
import { IconButton } from "../../utils/style/Atoms";
import { colors } from "../../utils/style/variables";

/* ------------------------------------------- */
/*          Styled components section          */
/* ------------------------------------------- */

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
      <form action="" id="new-comment-form" className="dev">
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
         <textarea
            name=""
            id=""
            placeholder="Votre réaction..."
            value={newCommentContent}
            onChange={(event) => setNewCommentContent(event.target.value)}
         ></textarea>

         <IconButton
            color={colors.darkUnactiveLink}
            type="submit"
            onClick={handleNewCommentSubmit}
         >
            <FontAwesomeIcon icon={faPaperPlane} />
         </IconButton>
      </form>
   );
}

// export the create component
export default NewCommentForm;
