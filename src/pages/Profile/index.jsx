/* -------------------------------------- */
/*          Secrtion des imports          */
/* -------------------------------------- */

import { useEffect } from "react";
import Auth from "../../components/Auth";
import { useAuth } from "../../utils/hooks";

/* --------------------------------------------- */
/*          Components creation section          */
/* --------------------------------------------- */
// component function
function Profile() {
   // using auth
   const { auth } = useAuth();

   // component code
   // if user is connected show his profile page
   // if not show authentification page
   return (
      <div>
         <h1>Page pour les profils</h1>
         {auth ? <div>Profil de l'utilisateur</div> : <Auth signUp={true} />}
      </div>
   );
}

// exporting component
export default Profile;
