/* -------------------------------------- */
/*          Secrtion des imports          */
/* -------------------------------------- */

import { useState } from "react";
import { useSelector } from "react-redux";
import styled from "styled-components";
// default profile picture
import defaultProfileImage from "../../assets/icon.svg";
import UserProfileData from "./_Data";
import UserProfileForm from "./_Form";

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
            <UserProfileForm />
         ) : (
            <UserProfileData setEditingUserProfile={setEditingUserProfile} />
         )}
      </main>
   );
}
<article>
   <h2>Photo de profil</h2>
</article>;
export default UserProfile;
