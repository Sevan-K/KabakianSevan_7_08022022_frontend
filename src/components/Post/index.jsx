/* --------------------------------- */
/*          Imports Section          */
/* --------------------------------- */
import { useEffect } from "react";
import { useState } from "react";
import { useSelector } from "react-redux";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import {
   faSpinner,
   faPenToSquare,
   faTrashCan,
   faCommentDots,
} from "@fortawesome/free-solid-svg-icons";
import { IconButton, UserImageWrapper } from "../../utils/style/Atoms";
import dateFormat from "../../utils/functions/dateFormat";
import styled from "styled-components";
import { colors } from "../../utils/style/variables";

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
function Post({ post }) {
   // getting users data from the store
   const users = useSelector((state) => state.usersReducer);
   // getting the user who wrote the post
   const [author] = users.filter((user) => user.id === post.userId);
   // local state to know if post card is loading
   const [isloading, setIsLoading] = useState(true);
   // local state to display comments
   const [showComments, setShowComments] = useState(false);

   // useEffect to stop loading once users data are available
   useEffect(() => {
      if (users.length !== 0) {
         setIsLoading(false);
      }
   }, [users]);

   // component to return
   return (
      <PostLiContainer className="dev">
         {isloading ? (
            <FontAwesomeIcon icon={faSpinner} className="fa-spin" />
         ) : (
            <>
               <PostHeader>
                  <UserImageWrapper>
                     <img src={author.imageUrl} alt="Profil de l'utilisateur" />
                  </UserImageWrapper>
                  <PseudoText>{author.pseudo}</PseudoText>
                  <DateText>Publié {dateFormat(post.updatedAt)}</DateText>
                  <IconButton>
                     <FontAwesomeIcon icon={faPenToSquare} />
                  </IconButton>
                  <IconButton>
                     <FontAwesomeIcon icon={faTrashCan} />
                  </IconButton>
               </PostHeader>
               <div>
                  <PostContent>{post.content}</PostContent>
                  {post.imageUrl && (
                     <p>
                        <img src={post.imageUrl} alt="post" />
                     </p>
                  )}
               </div>
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
               {showComments && (
                  <ul>
                     <li>Commentaire 1</li>
                     <li>Commentaire 2</li>
                  </ul>
               )}{" "}
            </>
         )}
      </PostLiContainer>
   );
}

// export the create component
export default Post;
