/* --------------------------------- */
/*          Imports Section          */
/* --------------------------------- */
import {
   ProfileWrapper,
   ProfileArticles,
   ProfileImageWrapper,
   StyledText,
} from "../styledComponents";

/* --------------------------------------------- */
/*          Components creation section          */
/* --------------------------------------------- */
function ProfileData({ userToDisplay, defaultProfileImage }) {
   // component to return
   return (
      <ProfileWrapper>
         <ProfileArticles>
            <h3>Photo de profil</h3>
            <ProfileImageWrapper>
               <img
                  src={userToDisplay.imageUrl || defaultProfileImage}
                  alt="Profil de l'utilisateur"
               />
            </ProfileImageWrapper>
         </ProfileArticles>
         <ProfileArticles>
            <h3>A propos de {userToDisplay.pseudo}</h3>
            <StyledText>
               {userToDisplay.bio || "Pas de description pour le moment..."}
            </StyledText>
         </ProfileArticles>
      </ProfileWrapper>
   );
}

// export component
export default ProfileData;
