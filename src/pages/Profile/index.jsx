/* -------------------------------------- */
/*          Secrtion des imports          */
/* -------------------------------------- */

import Auth from "../../components/Auth";
import { useUserId } from "../../utils/hooks";

/* --------------------------------------------- */
/*          Components creation section          */
/* --------------------------------------------- */
// component function
function Profile() {
   // getting userId from its hook
   const { userId } = useUserId();

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
