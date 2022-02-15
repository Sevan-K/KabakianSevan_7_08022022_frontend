/* -------------------------------------- */
/*          Secrtion des imports          */
/* -------------------------------------- */

import Auth from "../../components/Auth";
import { useAuth } from "../../utils/hooks";

/* --------------------------------------------- */
/*          Components creation section          */
/* --------------------------------------------- */
// component function
function Profile() {
   // using Token and store token from auth token thought useAuth
   const { token } = useAuth();
   // component code
   // if user is connected show his profile page
   // if not show authentification page
   return (
      <div>
         <h1>Page pour les profils</h1>
         {token ? <div>Profil de l'utilisateur</div> : <Auth signUp={true} />}
      </div>
   );
}

// exporting component
export default Profile;
