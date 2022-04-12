/* --------------------------------- */
/*          Imports Section          */
/* --------------------------------- */

import {
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
import {
   deleteComment,
   updateComment,
} from "../../../../actions/comments.action";
import defaultProfileImage from "../../../../assets/profile.png";
import dateFormat from "../../../../utils/functions/dateFormat";
import { useMediaQuerry, useOnHome, useUserId } from "../../../../utils/hooks";
import {
   DateText,
   PseudoText,
   SmallUserImageWrapper,
} from "../../../../utils/style/Atoms";

import { IconButton } from "../../../Shared/styledComponents";
import { colors, padding } from "../../../../utils/style/variables";

/* ------------------------------------------- */
/*          Styled components section          */
/* ------------------------------------------- */
// styled component for comment container
const CommentContainer = styled.li`
   display: grid;
   grid-template-columns: ${({ matchesMedium }) =>
      matchesMedium
         ? "calc(10vw + 1rem) 1fr repeat(2, 8%)"
         : "calc(6rem) 1fr repeat(2, 3.7rem)"};
   grid-template-areas:
      "img comment edit delete"
      "img date edit delete";
   margin-bottom: 0.7rem;
   & a {
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
   background-color: ${({ isAuthorConnected }) =>
      isAuthorConnected ? colors.ownCommentBg : colors.backgroundLight};
   padding: ${padding.comment};
   border-radius: 1rem;
   border-top-left-radius: 0;
`;

// styled component for the form to edit comment content
const EditContentForm = styled.form`
   display: flex;
   align-items: center;
`;

// styled component for the textarea of the form to edit comment content
const PostStyledTextArea = styled.textarea`
   flex: 1;
   border: none;
   background: transparent;
   font-size: 1.3rem;
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
   // getting user from the store
   const user = useSelector((state) => state.userReducer);
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
   // local state to set a unique temporary id for the textarea the comment being updated
   const [tempCommentId, updateTempCommentId] = useState("");
   // getting onHome context using its hook
   const { updateOnHome } = useOnHome();

   // constant for medium screens mediaquerry
   const matchesMedium = useMediaQuerry("(max-width: 500px)");

   // useEffect to set focus on form's textarea of the comment beeing editted
   useEffect(() => {
      if (!!tempCommentId) {
         document.getElementById(tempCommentId).focus();
         // console.log("=== tempCommentId ===>", tempCommentId);
      }
   }, [tempCommentId]);

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

   // function to start editting a comment
   const handleStartEditComment = () => {
      if (!tempCommentId) {
         // set textarea value to comment content
         setUpdatedContent(comment.content);
         // define a unique and temporary id
         updateTempCommentId(`edit-comment-content-${Date.now()}`);
      } else {
         handleStotEditComment();
      }
   };

   const handleStotEditComment = () => {
      setUpdatedContent("");
      updateTempCommentId("");
   };

   // function to submit edit a comment form
   const handleEditCommentSubmit = (event) => {
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
      <CommentContainer matchesMedium={matchesMedium}>
         {/* -------------- Comment author's profile image -------------- */}
         <SmallUserImageWrapper
            to={"/profile/" + author.pseudo}
            onClick={() => updateOnHome(false)}
         >
            <img
               src={author.imageUrl || defaultProfileImage}
               alt="Profil de l'auteur du post"
            />
         </SmallUserImageWrapper>
         {/* -------------- Comment content and author's pseudo -------------- */}
         <PseudoContentWrapper isAuthorConnected={userId === comment.userId}>
            <PseudoText>{author.pseudo}</PseudoText>
            {updatedContent ? (
               /* -------------- Form to edit comment -------------- */
               <EditContentForm onSubmit={handleEditCommentSubmit}>
                  <PostStyledTextArea
                     id={tempCommentId}
                     name=""
                     // onBlur={() => {
                     //    if (!updatedContent) handleStotEditComment();
                     // }}
                     value={updatedContent}
                     onChange={(event) => setUpdatedContent(event.target.value)}
                  ></PostStyledTextArea>
                  <IconButton type="submit">
                     <FontAwesomeIcon icon={faPaperPlane} />
                  </IconButton>
               </EditContentForm>
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
         {(userId === comment.userId || user.admin === true) && (
            <>
               <IconButton onClick={handleStartEditComment}>
                  {updatedContent ? (
                     <FontAwesomeIcon icon={faCircleXmark} />
                  ) : (
                     <FontAwesomeIcon icon={faPenToSquare} />
                  )}
               </IconButton>
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
