/* --------------------------------- */
/*          Imports Section          */
/* --------------------------------- */

/* ------------------------------------------- */
/*          Styled components section          */
/* ------------------------------------------- */

/* --------------------------------------------- */
/*          Components creation section          */
/* --------------------------------------------- */
function Comment({ comment }) {
   return (
      <li>
         L'utilisateur :{comment.userId}, à dit : {comment.content}{" "}
      </li>
   );
}

// export the create component
export default Comment;
