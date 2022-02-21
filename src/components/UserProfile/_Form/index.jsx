/* -------------------------------------- */
/*          Secrtion des imports          */
/* -------------------------------------- */
import { useSelector } from "react-redux";
import styled from "styled-components";

/* ------------------------------------------- */
/*          Styled components section          */
/* ------------------------------------------- */

/* --------------------------------------------- */
/*          Components creation section          */
/* --------------------------------------------- */
function UserProfileForm() {
   // getting the user data from userReducer
   const user = useSelector((state) => state.userReducer);
   // component to return
   return <form action="">Edition du profil WIP</form>;
}

// export component
export default UserProfileForm;
