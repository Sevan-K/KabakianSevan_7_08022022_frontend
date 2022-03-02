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
import { IconButton, UserImageWrapper } from "../../utils/style/Atoms";
import dateFormat from "../../utils/functions/dateFormat";
import styled from "styled-components";
import { colors } from "../../utils/style/variables";
import defaultProfileImage from "../../assets/profile.png";
import {
   deletePost,
   getAllPosts,
   updatePost,
} from "../../actions/post.actions";
import { useUserId } from "../../utils/hooks";
import axios from "axios";
import Comment from "../Comment";

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
   & > p:first-of-type {
      grid-area: img;
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

// styled component for pseudo
const PseudoText = styled.p`
   font-weight: bold;
   color: ${colors.darkUnactiveLink};
   grid-area: pseudo;
`;

// styled component for date
const DateText = styled.p`
   grid-area: date;
   color: gray;
   font-style: italic;
   font-size: 1.2rem;
`;

// styled component for post content
const PostContent = styled.p`
   padding: 1rem 0;
   font-size: 1.3rem;
`;

/* --------------------------------------------- */
/*          Components creation section          */
/* --------------------------------------------- */

const testCommentsList = [
   { id: 1, content: "Commentaire 1", userId: 1, postId: 9 },
   { id: 2, content: "Commentaire 2", userId: 9, postId: 9 },
   { id: 3, content: "Commentaire 3", userId: 1, postId: 3 },
   { id: 4, content: "Commentaire 4", userId: 9, postId: 3 },
];

function Post({ post }) {
   // getting id of logged in user
   const { userId } = useUserId();
   // getting users data from the store
   const users = useSelector((state) => state.usersReducer);
   // getting the user who wrote the post
   const [author] = users.filter((user) => user.id === post.userId);
   // local state to know if post card is loading
   const [isloading, setIsLoading] = useState(true);
   // local state to display comments
   const [showComments, setShowComments] = useState(false);
   // local stage to store updated content
   const [updatedContent, setUpdatedContent] = useState("");

   // get acces to redux actions using useDispatch hook
   const dispatch = useDispatch();

   // useEffect to stop loading once users data are available
   useEffect(() => {
      if (users.length !== 0) {
         setIsLoading(false);
      }
   }, [users]);

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
   const handleEditPost = async (event) => {
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
                  <UserImageWrapper>
                     <img
                        src={author.imageUrl || defaultProfileImage}
                        alt="Profil de l'utilisateur"
                     />
                  </UserImageWrapper>
                  <PseudoText>{author.pseudo}</PseudoText>
                  <DateText>Publié {dateFormat(post.updatedAt)}</DateText>
                  {userId === post.userId && (
                     <>
                        <IconButton
                           onClick={() => setUpdatedContent(post.content)}
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
                     <form action="" id="editPostForm">
                        <IconButton
                           onClick={(event) => {
                              event.preventDefault();
                              setUpdatedContent("");
                           }}
                        >
                           <FontAwesomeIcon icon={faCircleArrowLeft} />
                        </IconButton>
                        <textarea
                           name=""
                           id=""
                           value={updatedContent}
                           onChange={(event) =>
                              setUpdatedContent(event.target.value)
                           }
                        ></textarea>
                        <IconButton type="submit" onClick={handleEditPost}>
                           <FontAwesomeIcon icon={faPaperPlane} />
                        </IconButton>
                     </form>
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
                  <ul>
                     {testCommentsList.map((comment) => {
                        if (comment.postId === post.id) {
                           return (
                              <Comment key={comment.id} comment={comment} />
                           );
                        } else {
                           return null;
                        }
                     })}
                  </ul>
               )}
            </>
         )}
      </PostLiContainer>
   );
}

// export the create component
export default Post;
