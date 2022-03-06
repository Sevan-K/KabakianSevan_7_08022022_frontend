/* --------------------------------- */
/*          Imports Section          */
/* --------------------------------- */
import { faCamera } from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import styled from "styled-components";
import { updateUser } from "../../actions/user.actions";
import {
   AuthSumbitInput,
   ProfileImageWrapper,
   UserProfileArticles,
   UserProfileWrapper,
} from "../../utils/style/Atoms";
import { colors, padding } from "../../utils/style/variables";

/* ------------------------------------------- */
/*          Styled components section          */
/* ------------------------------------------- */
// styled component : label to change picture
const ChangeUserPicLabel = styled.label`
   background-color: ${colors.darkUnactiveLink};
   position: relative;
   bottom: 3.5rem;
   left: 6rem;
   color: white;
   width: 2.75rem;
   height: 2.75rem;
   border-radius: 2.75rem;
   display: flex;
   justify-content: center;
   align-items: center;
   transition: 300ms;
   &:hover {
      background-color: ${colors.primary};
      // & ~ p {
      //    border: 0.1rem solid red;
      // }
   }
`;

// styled component : text area to change description
const StyledTextArea = styled.textarea`
   font-size: 1.3rem;
   width: 100%;
   max-width: 40rem;
   color: ${colors.darkUnactiveLink};
`;

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
      let userToSend;
      if (!!file) {
         // building the formdata to send
         userToSend = new FormData();
         userToSend.append("user", JSON.stringify(modifiedUser));
         userToSend.append("image", file);
      } else {
         userToSend = modifiedUser;
      }

      // launch action to update user profile data
      dispatch(updateUser(userToSend, user.id));
      // end profile edition
      setEditingUserProfile(false);
   };

   // component to return
   return (
      <UserProfileWrapper>
         <form
            // method="post"
            action=""
            id="profile-update-form"
            onSubmit={handleUpdateProfile}
         >
            <UserProfileArticles>
               <h3>Photo de profil</h3>
               <ProfileImageWrapper>
                  <img src={profileImageUrl} alt="Profil de l'utilisateur" />
               </ProfileImageWrapper>
               <ChangeUserPicLabel
                  htmlFor="profile_image"
                  aria-label="Modification de la description"
               >
                  <FontAwesomeIcon icon={faCamera} />{" "}
               </ChangeUserPicLabel>
               <input
                  type="file"
                  id="profile_image"
                  name="profile_image"
                  onChange={handleFileChange}
                  accept="image/png, image/jpeg, image/jpg"
                  style={{ display: "none" }}
               />
            </UserProfileArticles>
            <UserProfileArticles>
               <h3>A propos de {user.pseudo}</h3>
               <StyledTextArea
                  name="profile_bio"
                  id="profile_bio"
                  value={bio}
                  onChange={handleBioChange}
                  aria-label="Modification de la description"
               ></StyledTextArea>
            </UserProfileArticles>
            <AuthSumbitInput
               type="submit"
               value="Validez les modifications"
               id="profile_submit"
               name="profile_submit"
            />
         </form>
      </UserProfileWrapper>
   );
}

// export component
export default UserProfileForm;
