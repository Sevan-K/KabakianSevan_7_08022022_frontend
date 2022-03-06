/* -------------------------------------- */
/*          Secrtion des imports          */
/* -------------------------------------- */

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
   // component to return
   return (
      <div>
         <h1>Page profils</h1>
         {!!userId ? <UserProfile /> : <Auth />}
      </div>
   );
}

// exporting component
export default Profile;
