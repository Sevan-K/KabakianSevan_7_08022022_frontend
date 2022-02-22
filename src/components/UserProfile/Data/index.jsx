/* --------------------------------- */
/*          Imports Section          */
/* --------------------------------- */
import { useSelector } from "react-redux";
import styled from "styled-components";
import { ProfileImageWrapper } from "../../../utils/style/Atoms";

/* ------------------------------------------- */
/*          Styled components section          */
/* ------------------------------------------- */

/* --------------------------------------------- */
/*          Components creation section          */
/* --------------------------------------------- */
function UserProfileData({ setEditingUserProfile }) {
   // getting the user data from userReducer
   const user = useSelector((state) => state.userReducer);
   // component to return

   return (
      <div>
         <button onClick={() => setEditingUserProfile(true)}>
            Editer le profil
         </button>
         <article>
            <h2>Photo de profil</h2>
            <ProfileImageWrapper>
               <img src={user.imageUrl} alt="Profil de l'utilisateur" />
            </ProfileImageWrapper>
         </article>
         <article>
            <h2>A propos de {user.pseudo}</h2>
            <p>{user.bio}</p>
         </article>
      </div>
   );
}

// export component
export default UserProfileData;
