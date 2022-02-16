/* -------------------------------------- */
/*          Secrtion des imports          */
/* -------------------------------------- */

import { useEffect } from "react";
import Auth from "../../components/Auth";
import { useToken, useUserId } from "../../utils/hooks";

/* --------------------------------------------- */
/*          Components creation section          */
/* --------------------------------------------- */
// component function
function Profile() {
   // using Token and userId
   const { token, storeToken } = useToken();
   const { userId, getUserId } = useUserId();

   // geting userId from token
   useEffect(() => {
      storeToken("");
   }, []);
   useEffect(() => {
      getUserId(token);
   }, [token]);

   // component code
   // if user is connected show his profile page
   // if not show authentification page
   return (
      <div>
         <h1>Page pour les profils</h1>
         {userId ? <div>Profil de l'utilisateur</div> : <Auth signUp={true} />}
      </div>
   );
}

// exporting component
export default Profile;
