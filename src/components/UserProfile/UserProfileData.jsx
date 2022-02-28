/* --------------------------------- */
/*          Imports Section          */
/* --------------------------------- */
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faPenToSquare, faTrashCan } from "@fortawesome/free-solid-svg-icons";

import { useDispatch, useSelector } from "react-redux";
import styled from "styled-components";
import { deleteUser } from "../../actions/user.actions";
import { IconButton, ProfileImageWrapper } from "../../utils/style/Atoms";

/* ------------------------------------------- */
/*          Styled components section          */
/* ------------------------------------------- */
const ProfileDataHeader = styled.header`
   display: flex;
   align-items: center;
   justify-content: end;
   & > h2 {
      margin-right: auto;
   }
`;


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
         <ProfileDataHeader>
            <h2>Profil de {user.pseudo}</h2>
            <IconButton onClick={() => setEditingUserProfile(true)}>
               <FontAwesomeIcon icon={faPenToSquare} />
            </IconButton>
            <IconButton onClick={handleDeleteProfile}>
               <FontAwesomeIcon icon={faTrashCan} />
            </IconButton>
         </ProfileDataHeader>

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
