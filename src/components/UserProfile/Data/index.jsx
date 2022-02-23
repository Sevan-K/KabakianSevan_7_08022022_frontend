/* --------------------------------- */
/*          Imports Section          */
/* --------------------------------- */
import { useDispatch, useSelector } from "react-redux";
import styled from "styled-components";
import { deleteUser } from "../../../actions/user.actions";
import { ProfileImageWrapper } from "../../../utils/style/Atoms";

/* ------------------------------------------- */
/*          Styled components section          */
/* ------------------------------------------- */

/* --------------------------------------------- */
/*          Components creation section          */
/* --------------------------------------------- */
function UserProfileData({ setEditingUserProfile, defaultProfileImage }) {
   // getting the user data from userReducer
   const user = useSelector((state) => state.userReducer);

   // getting acces to redux actions
   const dispatch = useDispatch();

   // function to handle delete profile
   const handleDeleteProfile = () => {
      // using delete user action
      dispatch(deleteUser(user.id)).then(
         () =>
            // go back to
            (window.location = "/")
      );
   };

   // component to return
   return (
      <div>
         <button onClick={() => setEditingUserProfile(true)}>
            Editer le profil
         </button>
         <button onClick={handleDeleteProfile}>Supprimer le profil</button>
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
