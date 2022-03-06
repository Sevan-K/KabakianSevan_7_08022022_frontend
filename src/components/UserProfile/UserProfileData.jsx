/* --------------------------------- */
/*          Imports Section          */
/* --------------------------------- */
import { useSelector } from "react-redux";

import { ProfileImageWrapper } from "../../utils/style/Atoms";

/* ------------------------------------------- */
/*          Styled components section          */
/* ------------------------------------------- */

/* --------------------------------------------- */
/*          Components creation section          */
/* --------------------------------------------- */
function UserProfileData({ setEditingUserProfile, defaultProfileImage }) {
   // getting the user data from userReducer
   const user = useSelector((state) => state.userReducer);

   // component to return
   return (
      <div>
         <article>
            <h2>Photo de profil</h2>
            <ProfileImageWrapper>
               <img
                  src={user.imageUrl || defaultProfileImage}
                  alt="Profil de l'utilisateur"
               />
            </ProfileImageWrapper>
         </article>
         <article>
            <h2>A propos de {user.pseudo}</h2>
            <p>{user.bio || "Pas de description pour le moment..."}</p>
         </article>
      </div>
   );
}

// export component
export default UserProfileData;
