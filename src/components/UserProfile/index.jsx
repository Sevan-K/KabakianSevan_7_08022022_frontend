/* --------------------------------- */
/*          Imports Section          */
/* --------------------------------- */
import { useState } from "react";
import { useSelector } from "react-redux";
import styled from "styled-components";
// default profile picture
import defaultProfileImage from "../../assets/icon.svg";
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
   border-radius:3rem;
`;

/* --------------------------------------------- */
/*          Components creation section          */
/* --------------------------------------------- */
function UserProfile() {
   // useState to switch between UserProfileData and UserProfileForm components
   const [editingUserProfile, setEditingUserProfile] = useState(false);
   // getting the user data from userReducer
   const user = useSelector((state) => state.userReducer);
   // components to return
   return (
      <MainUserProfileData>
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
            <p>
               Membre de Groupomania depuis le {user.createdAt.split("T")[0]} à{" "}
               {user.createdAt.split("T")[1].split(".")[0]}
            </p>
         )}
      </MainUserProfileData>
   );
}
<article>
   <h2>Photo de profil</h2>
</article>;
export default UserProfile;
