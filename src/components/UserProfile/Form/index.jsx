/* --------------------------------- */
/*          Imports Section          */
/* --------------------------------- */
import { useEffect, useState } from "react";
import { useSelector } from "react-redux";
import styled from "styled-components";
import { ProfileImageWrapper } from "../../../utils/style/Atoms";

/* ------------------------------------------- */
/*          Styled components section          */
/* ------------------------------------------- */

/* --------------------------------------------- */
/*          Components creation section          */
/* --------------------------------------------- */
function UserProfileForm({ setEditingUserProfile }) {
   // getting the user data from userReducer
   const user = useSelector((state) => state.userReducer);

   // local state to keep track of the file
   const [file, updateFile] = useState(null);
   // local state to update bio value
   const [bio, updateBio] = useState("");

   // function to handle change on image profile file input
   const handleFileChange = (event) => {
      // get file from the input
      const [file] = event.target.files;
      // update file state
      updateFile(file);
   };

   // function to handle change on bio text area
   const handleBioChange = (event) => {
      // update bio with texte area value
      updateBio(event.target.value);
   };

   // function to handle form submit
   const handleUpdateProfile = (event) => {
      event.preventDefault();
      const userToUpdate = { ...user, bio: bio };
      console.log({ file, user: userToUpdate });
   };

   // component to return
   return (
      <form
         // method="post"
         action=""
         id="profile_update_form"
         onSubmit={handleUpdateProfile}
      >
         <article>
            <button onClick={() => setEditingUserProfile(false)}>
               Retour au profil
            </button>
            <h2>Photo de profil</h2>
            <ProfileImageWrapper>
               <img src={user.imageUrl} alt="Profil de l'utilisateur" />
            </ProfileImageWrapper>
            <input
               type="file"
               id="profile_image"
               name="profile_image"
               onChange={handleFileChange}
            />
         </article>
         <article>
            <h2>A propos de {user.pseudo}</h2>
            <textarea
               name="profile_bio"
               id="profile_bio"
               value={bio || user.bio}
               onChange={handleBioChange}
            ></textarea>
         </article>
         <input
            type="submit"
            value="Validez les modifications"
            id="profile_submit"
            name="profile_submit"
         />
      </form>
   );
}

// export component
export default UserProfileForm;
