/* --------------------------------- */
/*          Imports Section          */
/* --------------------------------- */
import { useEffect } from "react";
import { useState } from "react";
import { useSelector } from "react-redux";

/* ------------------------------------------- */
/*          Styled components section          */
/* ------------------------------------------- */

/* --------------------------------------------- */
/*          Components creation section          */
/* --------------------------------------------- */
function Post({ id, content, imageUrl, userId, updatedAt, likes }) {
   // getting users data from the store
   const users = useSelector((state) => state.usersReducer);

   // getting the user who wrote the post
   const [author] = users.filter((user) => user.id === userId);

   const [isloading, setIsLoading] = useState(true);

   useEffect(() => {
      if (users.length !== 0) {
         setIsLoading(false);
      }
   }, [users]);

   // component to return
   return (
      <li>
         {isloading ? (
            <i className="fas fa-spinner fa-spin"></i>
         ) : (
            <>
               <header>
                  <p>
                     <img src={author.imageUrl} alt="Profil de l'utilisateur" />
                  </p>
                  <p>Post de : {author.pseudo}</p>
                  <p>date : {updatedAt}</p>
               </header>
               <div>
                  <p>Message : {content}</p>
                  {imageUrl && (
                     <p>
                        <img src={imageUrl} alt="post" />
                     </p>
                  )}
               </div>
               <footer>
                  <p>Commentaires</p>
                  <button
                     onClick={() => {
                        alert(id);
                     }}
                  >
                     Likez
                  </button>
                  <p>{likes || 0}</p>
               </footer>
            </>
         )}
      </li>
   );
}

// export the create component
export default Post;
