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
function Post({ post }) {
   // getting users data from the store
   const users = useSelector((state) => state.usersReducer);

   // getting the user who wrote the post
   const [author] = users.filter((user) => user.id === post.userId);

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
                  <p>date : {post.updatedAt}</p>
               </header>
               <div>
                  <p>Message : {post.content}</p>
                  {post.imageUrl && (
                     <p>
                        <img src={post.imageUrl} alt="post" />
                     </p>
                  )}
               </div>
               <div>
                  <button>Commentaires</button>
                  {" "}
                  <button
                     onClick={() => {
                        alert(post.id);
                     }}
                  >
                     Likez
                  </button>
                  <p>{post.likes || 0}</p>
               </div>
            </>
         )}
      </li>
   );
}

// export the create component
export default Post;
