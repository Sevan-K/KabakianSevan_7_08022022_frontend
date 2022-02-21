/* -------------------------------------- */
/*          Secrtion des imports          */
/* -------------------------------------- */

import axios from "axios";
import { useEffect, useState } from "react";
import Auth from "../../components/Auth";
import { useUserId } from "../../utils/hooks";

/* --------------------------------------------- */
/*          Components creation section          */
/* --------------------------------------------- */
// component function
function Profile() {
   // getting userId from its hook
   const { userId } = useUserId();
   const [user, setUser] = useState({});
   useEffect(() => {
      if (!!userId) {
         const getUserData = async () => {
            const response = await axios({
               method: "get",
               url: `${process.env.REACT_APP_API_URL}users/${userId}`,
               withCredentials: true,
            });
            const { user } = response.data;
            console.log("=== user ===>", user);
            setUser(user);
         };
         getUserData();
      }
   }, [userId]);

   // component code
   // if user is connected show his profile page
   // if not show authentification page
   return (
      <div>
         <h1>Page pour les profils</h1>
         {userId ? (
            <div>Profil de l'utilisateur {user.pseudo}</div>
         ) : (
            <Auth signUp={true} />
         )}
      </div>
   );
}

// exporting component
export default Profile;
