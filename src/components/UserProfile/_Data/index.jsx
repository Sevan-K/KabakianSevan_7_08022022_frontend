/* -------------------------------------- */
/*          Secrtion des imports          */
/* -------------------------------------- */
import { useSelector } from "react-redux";
import styled from "styled-components";

/* ------------------------------------------- */
/*          Styled components section          */
/* ------------------------------------------- */
// styled component for the <p> where the image is
const ImageWrapper = styled.p`
   margin-right: auto;
   align-self: center;
   width: 10%;
`;

/* --------------------------------------------- */
/*          Components creation section          */
/* --------------------------------------------- */
function UserProfileData({ setEditingUserProfile }) {
   // getting the user data from userReducer
   const user = useSelector((state) => state.userReducer);
   // component to return

   return (
      <div>
         <button onClick={() => setEditingUserProfile(true)}>
            Editer le profil
         </button>
         <article>
            <h2>Photo de profil</h2>
            <ImageWrapper>
               <img src={user.imageUrl} alt="Profil de l'utilisateur" />
            </ImageWrapper>
         </article>
         <article>
            <h2>A propos de {user.pseudo}</h2>
            <p>{user.bio}</p>
            <p>
               Membre de Groupomania depuis le {user.createdAt.split("T")[0]} à{" "}
               {user.createdAt.split("T")[1].split(".")[0]}
            </p>
         </article>
      </div>
   );
}

// export component
export default UserProfileData;
