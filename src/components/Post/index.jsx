/* --------------------------------- */
/*          Imports Section          */
/* --------------------------------- */

/* ------------------------------------------- */
/*          Styled components section          */
/* ------------------------------------------- */

/* --------------------------------------------- */
/*          Components creation section          */
/* --------------------------------------------- */
function Post({ id, content, userId }) {
   // component to return
   return (
      <div>
         <h3>Post numéro {id} </h3>
         <p>Post de : {userId}</p>
         <p>Message : {content}</p>
      </div>
   );
}

// export the create component
export default Post;
