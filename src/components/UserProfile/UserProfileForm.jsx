/* --------------------------------- */
/*          Imports Section          */
/* --------------------------------- */
import { faCamera } from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import {  useState } from "react";
import { useDispatch } from "react-redux";
import styled from "styled-components";
import { updateUser } from "../../actions/user.actions";
import { updateOneOfUsers } from "../../actions/users.actions";
import { useUserId } from "../../utils/hooks";
import {
   AuthSumbitInput,
   ErrorMessage,
   ProfileImageWrapper,
   UserProfileArticles,
   UserProfileWrapper,
} from "../../utils/style/Atoms";
import { colors } from "../../utils/style/variables";

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
function UserProfileForm({
   userToDisplay,
   pseudo,
   setEditingUserProfile,
   defaultProfileImage,
}) {
   // getting userId from its hook
   const { userId } = useUserId();

   // constant to call a redux action
   const dispatch = useDispatch();

   // local state to keep track of the file
   const [file, updateFile] = useState(null);
   // local state to update bio value
   const [bio, updateBio] = useState(
      userToDisplay.bio || "Dites quelque chose de vous ici !"
   );

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
         console.log("=== modifiedUser ===>", modifiedUser);
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
         setEditingUserProfile(false);
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
         <UserProfileWrapper>
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
               <h3>A propos de {userToDisplay.pseudo}</h3>
               <StyledTextArea
                  name="profile_bio"
                  id="profile_bio"
                  value={bio}
                  onChange={handleBioChange}
                  aria-label="Modification de la description"
               ></StyledTextArea>
               {error && (
                  <ErrorMessage>
                     Entrez un contenu valide 😐 Pas de caractères spéciaux...
                  </ErrorMessage>
               )}
            </UserProfileArticles>
            <AuthSumbitInput
               type="submit"
               value="Validez les modifications"
               id="profile_submit"
               name="profile_submit"
            />
         </UserProfileWrapper>{" "}
      </form>
   );
}

// export component
export default UserProfileForm;
