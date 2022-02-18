/* -------------------------------------- */
/*          Secrtion des imports          */
/* -------------------------------------- */
import axios from "axios";

/* ------------------------------------------- */
/*          Styled components section          */
/* ------------------------------------------- */

/* --------------------------------------------- */
/*          Components creation section          */
/* --------------------------------------------- */
function Logout() {
   // function to handle click on logout button
   const handleLogOut = async () => {
      try {
         // send a request to th route to remove the cookie
         await axios({
            method: "GET",
            url: `${process.env.REACT_APP_API_URL}auth/logout`,
            withCredentials: true,
         });
         // go to home page
         window.location = "/";
      } catch (err) {
         console.log(err.message);
      }
   };
   // component to return
   return <button onClick={handleLogOut}>Déconnexion</button>;
}
export default Logout;
