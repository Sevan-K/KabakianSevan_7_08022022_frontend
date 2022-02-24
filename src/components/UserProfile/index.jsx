/* --------------------------------- */
/*          Imports Section          */
/* --------------------------------- */
import { useState } from "react";
import { useSelector } from "react-redux";
import styled from "styled-components";
// default profile picture
import defaultProfileImage from "../../assets/icon.svg";
import UserProfileData from "./UserProfileData";
import UserProfileForm from "./UserProfileForm";

/* ------------------------------------------- */
/*          Styled components section          */
/* ------------------------------------------- */

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
      <main>
         <h1>Profil de {user.pseudo}</h1>
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
      </main>
   );
}
<article>
   <h2>Photo de profil</h2>
</article>;
export default UserProfile;
