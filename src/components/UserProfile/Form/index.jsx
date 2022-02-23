/* --------------------------------- */
/*          Imports Section          */
/* --------------------------------- */
import { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import styled from "styled-components";
import { updateUser } from "../../../actions/user.actions";
import { ProfileImageWrapper } from "../../../utils/style/Atoms";

/* ------------------------------------------- */
/*          Styled components section          */
/* ------------------------------------------- */

/* --------------------------------------------- */
/*          Components creation section          */
/* --------------------------------------------- */
function UserProfileForm({ setEditingUserProfile, defaultProfileImage }) {
   // getting the user data from userReducer
   const user = useSelector((state) => state.userReducer);
   // constant to call a redux action
   const dispatch = useDispatch();

   // local state to keep track of the file
   const [file, updateFile] = useState(null);
   // local state to update bio value
   const [bio, updateBio] = useState(
      user.bio || "Dites quelque chose de vous ici !"
   );

   // local state for image url
   const [profileImageUrl, updateProfileImageUrl] = useState(
      user.imageUrl || defaultProfileImage
   );

   // function to handle change on image profile file input
   const handleFileChange = (event) => {
      // get file from the input
      const [file] = event.target.files;
      // update file state
      updateFile(file);
      // update profile image
      updateProfileImageUrl(URL.createObjectURL(file));
   };

   // function to handle change on bio text area
   const handleBioChange = (event) => {
      // update bio with texte area value
      updateBio(event.target.value);
   };

   // function to handle form submit
   const handleUpdateProfile = (event) => {
      // preventing page reload
      event.preventDefault();
      // building user to send for the update
      const modifiedUser = { ...user, bio: bio };
      console.log("=== modifiedUser ===>", modifiedUser);
      let dataToSend;
      if (!!file) {
         // building the formdata to send
         dataToSend = new FormData();
         dataToSend.append("user", JSON.stringify(modifiedUser));
         dataToSend.append("image", file);
      } else {
         dataToSend = modifiedUser;
      }

      // launch action to update user profile data
      dispatch(updateUser(dataToSend, user.id));
      // end profile edition
      setEditingUserProfile(false);
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
               <img src={profileImageUrl} alt="Profil de l'utilisateur" />
            </ProfileImageWrapper>
            <input
               type="file"
               id="profile_image"
               name="profile_image"
               onChange={handleFileChange}
               accept="image/png, image/jpeg,image/jpg"
            />
         </article>
         <article>
            <h2>A propos de {user.pseudo}</h2>
            <textarea
               name="profile_bio"
               id="profile_bio"
               value={bio}
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
