/* --------------------------------- */
/*          Imports Section          */
/* --------------------------------- */

import {
   faCircleArrowLeft,
   faCircleXmark,
   faPaperPlane,
   faPenToSquare,
   faSpinner,
   faTrashCan,
} from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import styled from "styled-components";
import { deleteComment, updateComment } from "../../actions/comments.action";
import defaultProfileImage from "../../assets/profile.png";
import dateFormat from "../../utils/functions/dateFormat";
import { useUserId } from "../../utils/hooks";
import {
   DateText,
   IconButton,
   PseudoText,
   SmallUserImageWrapper,
} from "../../utils/style/Atoms";
import { colors, padding } from "../../utils/style/variables";

/* ------------------------------------------- */
/*          Styled components section          */
/* ------------------------------------------- */
// styled component for comment container
const CommentContainer = styled.li`
   display: grid;
   grid-template-columns: calc(8vw + 1rem) 1fr repeat(2, 8%);
   grid-template-areas:
      "img comment edit delete"
      "img date edit delete";
   margin-bottom: 0.7rem;
   & p:first-of-type {
      grid-area: img;
   }
   & p:nth-child(2) {
      grid-area: pseudo;
   }
   & > button {
      &:first-of-type {
         grid-area: edit;
      }
      &:last-of-type {
         grid-area: delete;
      }
   }
`;

// styled component for comment PseudoContentWrapper
const PseudoContentWrapper = styled.div`
   grid-area: comment;
   background-color: ${colors.backgroundLight};
   padding: ${padding.comment};
   border-radius: 1rem;
   border-top-left-radius: 0;
`;

// styled component for comment content
const PostContent = styled.p`
   font-size: 1.3rem;
`;

/* --------------------------------------------- */
/*          Components creation section          */
/* --------------------------------------------- */
function Comment({ comment }) {
   // getting users data from the store
   const users = useSelector((state) => state.usersReducer);
   // getting the user who wrote the post
   const [author] = users.filter((user) => user.id === comment.userId);
   // get userId from the user connected
   const { userId } = useUserId();
   // local stage to store updated content
   const [updatedContent, setUpdatedContent] = useState("");
   // get acces to redux actions using useDispatch hook
   const dispatch = useDispatch();
   // local state to know if post card is loading
   const [isLoading, setIsLoading] = useState(false);

   // function to remove a post
   const handleDeleteComment = () => {
      if (
         window.confirm(
            "Êtes vous certain.e de vouloir supprimer ce commentaire ?"
         )
      ) {
         // use post action to delete the post
         dispatch(deleteComment(comment.id));
      }
   };

   // function to edit a comment
   const handleEditComment = (event) => {
      event.preventDefault();
      // the content is loading
      setIsLoading(true);
      // modify comment on DB and on the store
      dispatch(updateComment(comment.id, updatedContent));
      // comment is no more beeing editted
      setUpdatedContent("");
      // the content is loaded
      setIsLoading(false);
   };

   // component to return
   return (
      <CommentContainer>
         {/* -------------- Comment author's profile image -------------- */}
         <SmallUserImageWrapper>
            <img
               src={author.imageUrl || defaultProfileImage}
               alt="Profil de l'auteur du post"
            />
         </SmallUserImageWrapper>
         {/* -------------- Comment content and author's pseudo -------------- */}
         <PseudoContentWrapper>
            <PseudoText>{author.pseudo}</PseudoText>
            {updatedContent ? (
               /* -------------- Form to edit comment -------------- */
               <form className="dev"> 
                  <textarea
                     name=""
                     id=""
                     value={updatedContent}
                     onChange={(event) => setUpdatedContent(event.target.value)}
                  ></textarea>
                  <IconButton type="submit" onClick={handleEditComment}>
                     <FontAwesomeIcon icon={faPaperPlane} />
                  </IconButton>
               </form>
            ) : isLoading ? (
               /* -------------- Loading spiner -------------- */
               <FontAwesomeIcon icon={faSpinner} className="fa-spin" />
            ) : (
               /* -------------- Comment content -------------- */
               <PostContent>{comment.content}</PostContent>
            )}
         </PseudoContentWrapper>
         {/* -------------- Comment publication date -------------- */}
         <DateText>{dateFormat(comment.createdAt)}</DateText>
         {/* -------------- Comment edit and delete button -------------- */}
         {userId === comment.userId && (
            <>
               {updatedContent ? (
                  <IconButton onClick={() => setUpdatedContent("")}>
                     <FontAwesomeIcon icon={faCircleXmark} />
                  </IconButton>
               ) : (
                  <IconButton
                     onClick={() => setUpdatedContent(comment.content)}
                  >
                     <FontAwesomeIcon icon={faPenToSquare} />
                  </IconButton>
               )}
               <IconButton onClick={handleDeleteComment}>
                  <FontAwesomeIcon icon={faTrashCan} />
               </IconButton>
            </>
         )}
      </CommentContainer>
   );
}

// export the create component
export default Comment;
