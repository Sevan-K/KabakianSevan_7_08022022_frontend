/* --------------------------------- */
/*          Imports Section          */
/* --------------------------------- */
import { useSelector } from "react-redux";
import styled from "styled-components";

import {
   ProfileImageWrapper,
   UserProfileArticles,
   UserProfileWrapper,
} from "../../utils/style/Atoms";
import { colors } from "../../utils/style/variables";

/* ------------------------------------------- */
/*          Styled components section          */
/* ------------------------------------------- */
const StyledText = styled.p`
   font-size: 1.3rem;
   color: ${colors.darkUnactiveLink};
`;

/* --------------------------------------------- */
/*          Components creation section          */
/* --------------------------------------------- */
function UserProfileData({ defaultProfileImage }) {
   // getting the user data from userReducer
   const user = useSelector((state) => state.userReducer);

   // component to return
   return (
      <UserProfileWrapper>
         <UserProfileArticles>
            <h3>Photo de profil</h3>
            <ProfileImageWrapper>
               <img
                  src={user.imageUrl || defaultProfileImage}
                  alt="Profil de l'utilisateur"
               />
            </ProfileImageWrapper>
         </UserProfileArticles>
         <UserProfileArticles>
            <h3>A propos de {user.pseudo}</h3>
            <StyledText>
               {user.bio || "Pas de description pour le moment..."}
            </StyledText>
         </UserProfileArticles>
      </UserProfileWrapper>
   );
}

// export component
export default UserProfileData;
