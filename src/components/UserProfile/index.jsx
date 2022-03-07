/* --------------------------------- */
/*          Imports Section          */
/* --------------------------------- */
import Error from "../../pages/Error";
import {
   faCircleXmark,
   faPenToSquare,
   faSpinner,
   faTrashCan,
} from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { useParams } from "react-router-dom";
import styled from "styled-components";
import { deleteUser } from "../../actions/user.actions";
import { deleteOneOfUsers } from "../../actions/users.actions";
// default profile picture
import defaultProfileImage from "../../assets/profile.png";
import dateFormat from "../../utils/functions/dateFormat";
import { useUserId } from "../../utils/hooks";
import { IconButton } from "../../utils/style/Atoms";
import { colors, mainSize } from "../../utils/style/variables";
import UserProfileData from "./UserProfileData";
import UserProfileForm from "./UserProfileForm";

/* ------------------------------------------- */
/*          Styled components section          */
/* ------------------------------------------- */
// styled component for the main element
const MainUserProfileData = styled.main`
   width: ${mainSize};
   margin: auto;
   padding: 3rem;
   background-color: ${colors.backgroundLight};
   border-radius: 1.5rem;
`;

const ProfileDataHeader = styled.header`
   display: flex;
   align-items: center;
   justify-content: end;
   & > h2 {
      margin-right: auto;
   }
`;

// styled component for date in post an comment cards
const DateText = styled.p`
   color: ${colors.darkUnactiveLink};
   font-style: italic;
   font-size: 1.3rem;
`;
/* --------------------------------------------- */
/*          Components creation section          */
/* --------------------------------------------- */
function UserProfile() {
   // useState to switch between UserProfileData and UserProfileForm components
   const [editingUserProfile, setEditingUserProfile] = useState(false);

   // getting userId from its hook
   const { userId } = useUserId();

   // get the pseudo from url
   const { pseudo } = useParams();

   // getting the user data from userReducer
   const users = useSelector((state) => state.usersReducer);

   // getting the user data from userReducer
   const user = useSelector((state) => state.userReducer);

   // the user to display is either the connected one or the one which pseudo is in url
   const userToDisplay = pseudo
      ? users.filter((user) => user.pseudo === pseudo)[0]
      : user;
   // console.log("=== userToDisplay ===>", userToDisplay);

   // getting acces to redux actions
   const dispatch = useDispatch();

   // local state to know if post card is loading
   const [isloading, setIsLoading] = useState(true);

   // useEffect to stop loading once users data are available
   useEffect(() => {
      if (users.length !== 0) {
         setIsLoading(false);
      }
   }, [users]);

   // function to handle delete profile
   const handleDeleteProfile = async () => {
      // asking confirmation
      if (
         window.confirm(
            "Etes vous certain.e de vouloir supprimer votre profil ?"
         )
      ) {
         // if there is a pseudo and that the user is not the connected one
         if (userToDisplay.id !== userId && !!pseudo) {
            // using delete users action
            await dispatch(deleteOneOfUsers(userToDisplay.id));
         } else {
            // using delete user action
            await dispatch(deleteUser(userToDisplay.id));
         }

         // go back to
         window.location = "/";
      }
   };

   // components to return
   return (
      <>
         {isloading ? (
            <FontAwesomeIcon icon={faSpinner} className="fa-spinner" />
         ) : !!userToDisplay ? (
            <MainUserProfileData>
               <ProfileDataHeader>
                  <h2>Profil de {userToDisplay.pseudo}</h2>
                  {(userToDisplay.id === userId || user.admin === 1) &&
                     (editingUserProfile ? (
                        <IconButton
                           onClick={() => setEditingUserProfile(false)}
                        >
                           <FontAwesomeIcon icon={faCircleXmark} />{" "}
                        </IconButton>
                     ) : (
                        <>
                           <IconButton
                              onClick={() => setEditingUserProfile(true)}
                           >
                              <FontAwesomeIcon icon={faPenToSquare} />
                           </IconButton>
                           <IconButton onClick={handleDeleteProfile}>
                              <FontAwesomeIcon icon={faTrashCan} />
                           </IconButton>
                        </>
                     ))}
               </ProfileDataHeader>
               {userToDisplay.createdAt && (
                  <DateText>
                     Membre de Groupomania depuis{" "}
                     {dateFormat(userToDisplay.createdAt)}
                  </DateText>
               )}
               {editingUserProfile ? (
                  <UserProfileForm
                     setEditingUserProfile={setEditingUserProfile}
                     defaultProfileImage={defaultProfileImage}
                     userToDisplay={userToDisplay}
                     pseudo={pseudo}
                  />
               ) : (
                  <UserProfileData
                     defaultProfileImage={defaultProfileImage}
                     userToDisplay={userToDisplay}
                  />
               )}
            </MainUserProfileData>
         ) : (
            <Error />
         )}
      </>
   );
}

export default UserProfile;
