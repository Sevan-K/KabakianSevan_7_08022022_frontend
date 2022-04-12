/* --------------------------------- */
/*          Imports Section          */
/* --------------------------------- */
import { faCamera } from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { useState } from "react";
import { useDispatch } from "react-redux";
import { updateUser } from "../../../actions/user.actions";
import { updateOneOfUsers } from "../../../actions/users.actions";
import { useUserId } from "../../../utils/hooks";
// styled components
import { ErrorMessage, AuthSumbitInput } from "../../Shared/styledComponents";
import {
   ProfileWrapper,
   ProfileArticles,
   ProfileImageWrapper,
   ChangeUserPicLabel,
   StyledTextArea,
} from "../StyledComponents";

/* --------------------------------------------- */
/*          Components creation section          */
/* --------------------------------------------- */
function ProfileForm({
   userToDisplay,
   pseudo,
   setEditingProfile,
   defaultProfileImage,
}) {
   // getting userId from its hook
   const { userId } = useUserId();

   // constant to call a redux action
   const dispatch = useDispatch();

   // local state to keep track of the file
   const [file, updateFile] = useState(null);
   // local state to update bio value
   const [bio, updateBio] = useState(userToDisplay.bio || "");

   // local state for image url
   const [profileImageUrl, updateProfileImageUrl] = useState(
      userToDisplay.imageUrl || defaultProfileImage
   );

   // local state to display error message
   const [error, setError] = useState(false);

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

      // regex for content
      const regexForContent =
         /^((?!-)(?!.*--)(?!')(?!.*'')[-A-ZÀ-ÿa-z0-9!,?. ':;()^]{2,2000}(?<!-)(?<!'))$/;

      if (regexForContent.test(bio)) {
         // building user to send for the update
         const modifiedUser = { ...userToDisplay, bio: bio };
         // console.log("=== modifiedUser ===>", modifiedUser);
         let userToSend;
         // if there is a file to send
         if (!!file) {
            // building the formdata to send
            userToSend = new FormData();
            userToSend.append("user", JSON.stringify(modifiedUser));
            userToSend.append("image", file);
         } else {
            // only send the object
            userToSend = modifiedUser;
         }
         // if there is a pseudo and that the user is not the connected one
         if (!!pseudo && userToDisplay.id !== userId) {
            // launch action to update user (of users) profile data
            dispatch(updateOneOfUsers(userToSend, userToDisplay.id));
         } else {
            // launch action to update user profile data
            dispatch(updateUser(userToSend, userToDisplay.id));
         }

         // end profile edition
         setEditingProfile(false);
      } else {
         setError(true);
      }
   };

   // component to return
   return (
      <form
         // method="post"
         action=""
         id="profile-update-form"
         onSubmit={handleUpdateProfile}
      >
         <ProfileWrapper>
            <ProfileArticles>
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
            </ProfileArticles>
            <ProfileArticles>
               <h3>A propos de {userToDisplay.pseudo}</h3>
               <StyledTextArea
                  name="profile_bio"
                  id="profile_bio"
                  placeholder="Dites quelque chose de vous ici !"
                  value={bio}
                  onChange={handleBioChange}
                  aria-label="Modification de la description"
               ></StyledTextArea>
               {error && (
                  <ErrorMessage>
                     Entrez un contenu valide 😐 Pas de caractères spéciaux...
                  </ErrorMessage>
               )}
            </ProfileArticles>
            <AuthSumbitInput
               type="submit"
               value="Validez les modifications"
               id="profile_submit"
               name="profile_submit"
            />
         </ProfileWrapper>{" "}
      </form>
   );
}

// export component
export default ProfileForm;
