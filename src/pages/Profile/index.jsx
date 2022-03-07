/* -------------------------------------- */
/*          Secrtion des imports          */
/* -------------------------------------- */

import { faSpinner } from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { useEffect, useState } from "react";
import styled from "styled-components";
import Auth from "../../components/Auth";
import UserProfile from "../../components/UserProfile";
import { useUserId } from "../../utils/hooks";
import { mainSize } from "../../utils/style/variables";

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
      if (!!userId) {
         setIsLoading(false);
      }
   }, [userId]);

   // component to return
   return (
      <div>
         {isloading ? (
            <FontAwesomeIcon icon={faSpinner} className="fa-spinner" />
         ) : (
            <>
               <h1>Page profils</h1>
               {!!userId ? <UserProfile /> : <Auth />}
            </>
         )}
      </div>
   );
}

// exporting component
export default Profile;
