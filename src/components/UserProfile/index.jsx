/* --------------------------------- */
/*          Imports Section          */
/* --------------------------------- */
import {
   faPenToSquare,
   faTrashCan,
} from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import styled from "styled-components";
import { deleteUser } from "../../actions/user.actions";
// default profile picture
import defaultProfileImage from "../../assets/profile.png";
import dateFormat from "../../utils/functions/dateFormat";
import { IconButton } from "../../utils/style/Atoms";
import { colors, mainSize } from "../../utils/style/variables";
import UserProfileData from "./UserProfileData";
import UserProfileForm from "./UserProfileForm";

/* ------------------------------------------- */
/*          Styled components section          */
/* ------------------------------------------- */
// styled component for the main element
const MainUserProfileData = styled.main`
   width: ${mainSize};
   margin: auto;
   padding: 3rem;
   background-color: ${colors.backgroundLight};
   border-radius: 3rem;
`;

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
function UserProfile() {
   // useState to switch between UserProfileData and UserProfileForm components
   const [editingUserProfile, setEditingUserProfile] = useState(false);
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

   // components to return
   return (
      <MainUserProfileData className="dev">
         <ProfileDataHeader>
            <h2>Profil de {user.pseudo}</h2>
            <IconButton onClick={() => setEditingUserProfile(true)}>
               <FontAwesomeIcon icon={faPenToSquare} />
            </IconButton>
            <IconButton onClick={handleDeleteProfile}>
               <FontAwesomeIcon icon={faTrashCan} />
            </IconButton>
         </ProfileDataHeader>

         {editingUserProfile ? (
            <UserProfileForm
               setEditingUserProfile={setEditingUserProfile}
               defaultProfileImage={defaultProfileImage}
            />
         ) : (
            <UserProfileData
               setEditingUserProfile={setEditingUserProfile}
               defaultProfileImage={defaultProfileImage}
            />
         )}
         {user.createdAt && (
            <p>Membre de Groupomania depuis {dateFormat(user.createdAt)}</p>
         )}
      </MainUserProfileData>
   );
}
<article>
   <h2>Photo de profil</h2>
</article>;
export default UserProfile;
