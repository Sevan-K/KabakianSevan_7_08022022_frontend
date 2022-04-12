/* --------------------------------- */
/*          Imports Section          */
/* --------------------------------- */
import Error from "../../modules/Error";
import {
   faCircleXmark,
   faPenToSquare,
   faSpinner,
   faTrashCan,
} from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { useNavigate, useParams } from "react-router-dom";
import { deleteUser } from "../../actions/user.actions";
import { deleteOneOfUsers } from "../../actions/users.actions";
// default profile picture
import defaultProfileImage from "../../assets/profile.png";
import dateFormat from "../../utils/functions/dateFormat";
import { useMediaQuerry, useUserId } from "../../utils/hooks";
// styled components
import { IconButton, PageTitle } from "../Shared/styledComponents";
import {
   MainProfileData,
   ProfileDataHeader,
   DateText,
} from "./styledComponents";
// children
import ProfileData from "./components/ProfileData";
import ProfileForm from "./components/ProfileForm";

/* --------------------------------------------- */
/*          Components creation section          */
/* --------------------------------------------- */
function Profile() {
   // useState to switch between ProfileData and ProfileForm components
   const [editingProfile, setEditingProfile] = useState(false);

   // getting userId from its hook
   const { userId } = useUserId();

   // get the pseudo from url
   const { pseudo } = useParams();

   // getting the user data from userReducer
   const users = useSelector((state) => state.usersReducer);

   // getting the user data from userReducer
   const user = useSelector((state) => state.userReducer);

   // the user to display is either the connected one or the one which pseudo is in url
   // !!!!!!!!!!!!!!!!!!!!!!!!!!!!! TODO FIXME
   const userToDisplay = pseudo
      ? users.filter((user) => user.pseudo === pseudo)[0]
      : user;
   // console.log("=== userToDisplay ===>", userToDisplay);

   // getting acces to redux actions
   const dispatch = useDispatch();

   // local state to know if post card is loading
   const [isloading, setIsLoading] = useState(true);

   // constant for small screens mediaquerry
   const matchesSmall = useMediaQuerry("(max-width: 450px)");

   const navigate = useNavigate();

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
            // go back to home
            return navigate("/");
         } else {
            // using delete user action
            await dispatch(deleteUser(userToDisplay.id));
            // reload app
            window.location = "/";
         }
      }
   };

   // components to return
   return (
      <>
         <PageTitle>Informations du profil</PageTitle>
         {isloading ? (
            <FontAwesomeIcon icon={faSpinner} className="fa-spinner" />
         ) : !!userToDisplay ? (
            <MainProfileData matchesSmall={matchesSmall}>
               <ProfileDataHeader>
                  <h2>Profil de {userToDisplay.pseudo}</h2>
                  {(userToDisplay.id === userId || user.admin === true) &&
                     (editingProfile ? (
                        <IconButton onClick={() => setEditingProfile(false)}>
                           <FontAwesomeIcon icon={faCircleXmark} />{" "}
                        </IconButton>
                     ) : (
                        <>
                           <IconButton onClick={() => setEditingProfile(true)}>
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
               {editingProfile ? (
                  <ProfileForm
                     setEditingProfile={setEditingProfile}
                     defaultProfileImage={defaultProfileImage}
                     userToDisplay={userToDisplay}
                     pseudo={pseudo}
                  />
               ) : (
                  <ProfileData
                     defaultProfileImage={defaultProfileImage}
                     userToDisplay={userToDisplay}
                  />
               )}
            </MainProfileData>
         ) : (
            <Error />
         )}
      </>
   );
}

export default Profile;
