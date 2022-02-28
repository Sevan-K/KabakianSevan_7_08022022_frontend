/* -------------------------------------- */
/*          Secrtion des imports          */
/* -------------------------------------- */

import Auth from "../../components/Auth";
import UserProfile from "../../components/UserProfile";
import { useUserId } from "../../utils/hooks";

/* --------------------------------------------- */
/*          Components creation section          */
/* --------------------------------------------- */
// component function
function Profile() {
   // getting userId from its hook
   const { userId } = useUserId();
   // component to return
   return (
      <div>
         <h1>Page pour les profils</h1>
         {!!userId ? <UserProfile /> : <Auth signUp={false} />}
      </div>
   );
}

// exporting component
export default Profile;
