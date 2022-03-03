/* --------------------------------- */
/*          Imports Section          */
/* --------------------------------- */

import {
   faPenToSquare,
   faSpinner,
   faTrashCan,
} from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { useEffect, useState } from "react";
import { useSelector } from "react-redux";
import defaultProfileImage from "../../assets/profile.png";
import dateFormat from "../../utils/functions/dateFormat";
import { useUserId } from "../../utils/hooks";
import { IconButton } from "../../utils/style/Atoms";

/* ------------------------------------------- */
/*          Styled components section          */
/* ------------------------------------------- */

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
   // local state to know if focus is on a comment

   // component to return
   return (
      <li>
         <p>
            <img
               src={author.imageUrl || defaultProfileImage}
               alt="Profil de l'auteur du post"
            />
         </p>
         {userId === comment.userId && (
            <>
               <IconButton>
                  <FontAwesomeIcon icon={faPenToSquare} />
               </IconButton>
               <IconButton>
                  <FontAwesomeIcon icon={faTrashCan} />
               </IconButton>
            </>
         )}
         <p>
            <strong>{author.pseudo}</strong>
         </p>
         <p>{dateFormat(comment.createdAt)}</p>
         <p>{comment.content}</p>
      </li>
   );
}

// export the create component
export default Comment;
