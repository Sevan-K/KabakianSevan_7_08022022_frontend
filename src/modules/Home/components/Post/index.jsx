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
   faHeart,
} from "@fortawesome/free-solid-svg-icons";
import { faHeart as faHeartRegular } from "@fortawesome/free-regular-svg-icons";

import dateFormat from "../../../../utils/functions/dateFormat";
import { colors } from "../../../../utils/style/variables";
import defaultProfileImage from "../../../../assets/profile.png";
import { deletePost, updatePost } from "../../../../actions/post.actions";
import { useMediaQuerry, useOnHome, useUserId } from "../../../../utils/hooks";
import Comment from "../Comment";
import NewCommentForm from "../NewCommentForm";
import { addLike, removeLike } from "../../../../actions/postLikes.actions";
// styled components
import {
   PostLiContainer,
   PostHeader,
   PostContent,
   MiddleToolBar,
   CommentsWrapper,
} from "./styledComponents";
import {
   UserImageWrapper,
   PseudoText,
   DateText,
   EditContentForm,
   PostStyledTextArea,
} from "../../styledComponents";
import { IconButton } from "../../../Shared/styledComponents";

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
   // getting all likes from the state
   const postLikes = useSelector((state) => state.postLikesReducer);
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
   // constant for medium screens mediaquerry
   const matchesMedium = useMediaQuerry("(max-width: 590px)");
   // local state to count the number of comment
   const [commentsNumber, updateCommentsNumber] = useState(0);
   // local state to count the number of likes
   const [likesNumber, updateLikesNumber] = useState(0);
   // local state to know if user is liking this post
   const [isUserLiking, setIsUserLiking] = useState(false);

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

   // useEffect to udpate the number of comments
   useEffect(() => {
      const commentsNumber = comments.reduce(
         (acc, comment) => (comment.postId === post.id ? acc + 1 : acc),
         0
      );
      updateCommentsNumber(commentsNumber);
   }, [comments, post]);

   // function to end the edition of a post
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

   // useEffect to check if user is liking the post and update the number of likes
   useEffect(() => {
      // constant to check if user is already liking this post
      const isUserLiking = postLikes.reduce(
         (acc, postUserObject) =>
            postUserObject.userId === userId &&
            postUserObject.postId === post.id
               ? (acc = true)
               : acc,
         false
      );
      setIsUserLiking(isUserLiking);
      // constant to calculate the number of likes
      const likesNumber =
         postLikes &&
         postLikes.reduce(
            (acc, postUserObject) =>
               postUserObject.postId === post.id ? acc + 1 : acc,
            0
         );
      updateLikesNumber(likesNumber);
   }, [postLikes, userId, post]);

   // function to handle like
   const handleLikes = async () => {
      // if there is no like yet
      if (likesNumber === 0 || !isUserLiking) {
         dispatch(addLike(post.id, userId));
      } else {
         dispatch(removeLike(post.id, userId));
      }
      // dispatch(getPostLikes());
   };

   // component to return
   return (
      <PostLiContainer>
         {isloading ? (
            <FontAwesomeIcon icon={faSpinner} className="fa-spin" />
         ) : (
            <>
               {/* -------------- Post Header -------------- */}
               <PostHeader matchesMedium={matchesMedium}>
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
                  <DateText color={colors.darkUnactiveLink}>
                     Publié {dateFormat(post.updatedAt)}
                  </DateText>
                  {(userId === post.userId || user.admin === true) && (
                     <>
                        <IconButton
                           color={colors.darkUnactiveLink}
                           onClick={() => {
                              setUpdatedContent(post.content);
                              updateTempId(
                                 `edit-comment-content-${Date.now()}`
                              );
                           }}
                        >
                           <FontAwesomeIcon icon={faPenToSquare} />
                        </IconButton>
                        <IconButton
                           onClick={handleDeletePost}
                           color={colors.darkUnactiveLink}
                        >
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
                        <PostStyledTextArea
                           name=""
                           id={tempId}
                           value={updatedContent}
                           onChange={(event) =>
                              setUpdatedContent(event.target.value)
                           }
                        ></PostStyledTextArea>
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
               {/* -------------- Post MiddleToolBar -------------- */}
               <MiddleToolBar areCommentsShown={showComments}>
                  <IconButton onClick={() => setShowComments(!showComments)}>
                     <FontAwesomeIcon icon={faCommentDots} />
                  </IconButton>
                  {commentsNumber !== 0 && <p>{commentsNumber}</p>}
                  <IconButton onClick={handleLikes}>
                     {isUserLiking ? (
                        <FontAwesomeIcon icon={faHeart} />
                     ) : (
                        <FontAwesomeIcon icon={faHeartRegular} />
                     )}
                  </IconButton>
                  {likesNumber !== 0 && <p>{likesNumber}</p>}
               </MiddleToolBar>
               {/* -------------- Post comments -------------- */}
               {showComments && (
                  <CommentsWrapper>
                     <ul>
                        {comments.length !== 0 &&
                           comments.map((comment) => {
                              if (comment.postId === post.id) {
                                 return (
                                    <Comment
                                       key={comment.id}
                                       comment={comment}
                                    />
                                 );
                              } else {
                                 return null;
                              }
                           })}
                     </ul>
                     <NewCommentForm postId={post.id} />
                  </CommentsWrapper>
               )}
            </>
         )}
      </PostLiContainer>
   );
}

// export the create component
export default Post;
