/* -------------------------------------- */
/*          Secrtion des imports          */
/* -------------------------------------- */

import { faSpinner } from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { useEffect, useState } from "react";
import Auth from "../../components/Auth";
import UserProfile from "../../components/UserProfile";
import { useUserId } from "../../utils/hooks";
import { PageTitle } from "../../utils/style/Atoms";

/* --------------------------------------------- */
/*          Components creation section          */
/* --------------------------------------------- */
// component function
function Profile() {
   // getting userId from its hook
   const { userId } = useUserId();

   // local state to know if post card is loading
   const [isloading, setIsLoading] = useState(true);

   // useEffect to stop loading once users data are available
   useEffect(() => {
      setIsLoading(false);
   }, [userId]);

   // component to return
   return (
      <div>
         {isloading ? (
            /* -------------- Loader -------------- */
            <FontAwesomeIcon icon={faSpinner} className="fa-spin" />
         ) : (
            /* -------------- Profile components -------------- */
            <>
               <PageTitle>Informations du profil</PageTitle>
               {!!userId ? (
                  /* -------------- UserProfile component if logged in -------------- */
                  <UserProfile />
               ) : (
                  /* -------------- Authenticate component to sign up or log in -------------- */
                  <Auth />
               )}
            </>
         )}
      </div>
   );
}

// exporting component
export default Profile;
