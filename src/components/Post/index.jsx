/* --------------------------------- */
/*          Imports Section          */
/* --------------------------------- */
import { useEffect } from "react";
import { useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import {
   faSpinner,
   faPenToSquare,
   faTrashCan,
   faCommentDots,
   faPaperPlane,
   faCircleArrowLeft,
} from "@fortawesome/free-solid-svg-icons";
import {
   DateText,
   IconButton,
   PseudoText,
   UserImageWrapper,
} from "../../utils/style/Atoms";
import dateFormat from "../../utils/functions/dateFormat";
import styled from "styled-components";
import { colors } from "../../utils/style/variables";
import defaultProfileImage from "../../assets/profile.png";
import { deletePost, updatePost } from "../../actions/post.actions";
import { useOnHome, useUserId } from "../../utils/hooks";
import Comment from "../Comment";
import NewCommentForm from "./NewCommentForm";

/* ------------------------------------------- */
/*          Styled components section          */
/* ------------------------------------------- */

// styled component for post container
const PostLiContainer = styled.li`
   border: 0.1rem solid red;
   width: 90%;
   margin: 1.5rem auto;
   padding: 1rem;
   border-radius: 1rem;
   & button {
      font-size: 1.5rem;
   }
`;

// styled component for post header
const PostHeader = styled.header`
   display: grid;
   grid-template-columns: calc(10vw + 1rem) 1fr repeat(2, 8%);
   grid-template-areas:
      "img pseudo edit delete"
      "img date edit delete";
   & > a {
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

// styled component for post content
const PostContent = styled.p`
   padding: 1rem 0;
   font-size: 1.3rem;
`;

// styled component for the form to edit comment content
const EditContentForm = styled.form`
   display: flex;
   align-items: center;
`;

// styled component for the textarea of the form to edit comment content
const StyledTextArea = styled.textarea`
   flex: 1;
   border: none;
   background: transparent;
   font-size: 1.3rem;
`;

/* --------------------------------------------- */
/*          Components creation section          */
/* --------------------------------------------- */
function Post({ post }) {
   // getting id of logged in user
   const { userId } = useUserId();
   // getting user from the store
   const user = useSelector((state) => state.userReducer);
   // getting users data from the store
   const users = useSelector((state) => state.usersReducer);
   //  getting comments data from the store
   const comments = useSelector((state) => state.commentsReducer);
   // getting the user who wrote the post
   const [author] = users.filter((user) => user.id === post.userId);
   // local state to know if post card is loading
   const [isloading, setIsLoading] = useState(true);
   // local state to display comments
   const [showComments, setShowComments] = useState(false);
   // local stage to store updated content
   const [updatedContent, setUpdatedContent] = useState("");
   // local state to set a unique temporary id for the textarea the comment being updated
   const [tempId, updateTempId] = useState("");
   // get acces to redux actions using useDispatch hook
   const dispatch = useDispatch();
   // getting onHome context using its hook
   const { updateOnHome } = useOnHome();

   // useEffect to stop loading once users data are available
   useEffect(() => {
      if (users.length !== 0) {
         setIsLoading(false);
      }
   }, [users]);

   // useEffect to set focus on form's textarea of the comment beeing editted
   useEffect(() => {
      if (!!tempId) {
         document.getElementById(tempId).focus();
         // console.log("=== tempId ===>", tempId);
      }
   }, [tempId]);

   const handleStotEditPost = () => {
      setUpdatedContent("");
      updateTempId("");
   };

   // function to remove a post
   const handleDeletePost = () => {
      if (
         window.confirm("Êtes vous certain.e de vouloir supprimer ce post ?")
      ) {
         // use post action to delete the post
         dispatch(deletePost(post.id));
      }
   };

   // function to edit a post
   const handleEditPost = (event) => {
      // set the loading state as true
      setIsLoading(true);
      // prevent page reload
      event.preventDefault();
      // call post action to update the targeted post
      dispatch(updatePost(post.id, updatedContent));
      // end editing
      setUpdatedContent("");
      // end loading
      setIsLoading(false);
   };

   // component to return
   return (
      <PostLiContainer>
         {isloading ? (
            <FontAwesomeIcon icon={faSpinner} className="fa-spin" />
         ) : (
            <>
               {/* -------------- Post Header -------------- */}
               <PostHeader>
                  <UserImageWrapper
                     to={"/profile/" + author.pseudo}
                     onClick={() => updateOnHome(false)}
                  >
                     <img
                        src={author.imageUrl || defaultProfileImage}
                        alt="Profil de l'utilisateur"
                     />
                  </UserImageWrapper>
                  <PseudoText>{author.pseudo}</PseudoText>
                  <DateText>Publié {dateFormat(post.updatedAt)}</DateText>
                  {(userId === post.userId || user.admin === 1) && (
                     <>
                        <IconButton
                           onClick={() => {
                              setUpdatedContent(post.content);
                              updateTempId(
                                 `edit-comment-content-${Date.now()}`
                              );
                           }}
                        >
                           <FontAwesomeIcon icon={faPenToSquare} />
                        </IconButton>
                        <IconButton onClick={handleDeletePost}>
                           <FontAwesomeIcon icon={faTrashCan} />
                        </IconButton>
                     </>
                  )}
               </PostHeader>
               {/* -------------- Post content and image -------------- */}
               <div>
                  {updatedContent ? (
                     // -------------- form --------------
                     <EditContentForm action="" onSubmit={handleEditPost}>
                        <IconButton
                           onClick={(event) => {
                              event.preventDefault();
                              handleStotEditPost();
                           }}
                        >
                           <FontAwesomeIcon icon={faCircleArrowLeft} />
                        </IconButton>
                        <StyledTextArea
                           name=""
                           id={tempId}
                           value={updatedContent}
                           onChange={(event) =>
                              setUpdatedContent(event.target.value)
                           }
                        ></StyledTextArea>
                        <IconButton type="submit">
                           <FontAwesomeIcon icon={faPaperPlane} />
                        </IconButton>
                     </EditContentForm>
                  ) : (
                     // -------------- content --------------
                     <PostContent>{post.content}</PostContent>
                  )}
                  {post.imageUrl && (
                     <p>
                        <img src={post.imageUrl} alt="post" />
                     </p>
                  )}
               </div>
               {/* -------------- Post bottom part -------------- */}
               <div>
                  <IconButton onClick={() => setShowComments(!showComments)}>
                     <FontAwesomeIcon icon={faCommentDots} />
                  </IconButton>
                  {/* <button
                     onClick={() => {
                        alert(post.id);
                     }}
                  >
                     Likez
                  </button>
                  <p>{post.likes || 0}</p> */}
               </div>
               {/* -------------- Post comments -------------- */}
               {showComments && (
                  <>
                     <ul>
                        {comments.map((comment) => {
                           if (comment.postId === post.id) {
                              return (
                                 <Comment key={comment.id} comment={comment} />
                              );
                           } else {
                              return null;
                           }
                        })}
                     </ul>
                     <NewCommentForm postId={post.id} />
                  </>
               )}
            </>
         )}
      </PostLiContainer>
   );
}

// export the create component
export default Post;
