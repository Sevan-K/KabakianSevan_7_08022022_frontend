/* -------------------------------------- */
/*          Secrtion des imports          */
/* -------------------------------------- */

import Auth from "../../components/Auth";

/* --------------------------------------------- */
/*          Components creation section          */
/* --------------------------------------------- */
// component function
function Profile() {
   return (
      <div>
         <h1>Page pour les profils</h1>
         <Auth signUp={true} />
      </div>
   );
}

// exporting component
export default Profile;
