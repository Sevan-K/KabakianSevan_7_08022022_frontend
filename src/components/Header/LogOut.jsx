/* -------------------------------------- */
/*          Secrtion des imports          */
/* -------------------------------------- */
import axios from "axios";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faRightFromBracket } from "@fortawesome/free-solid-svg-icons";
import { IconButton } from "../../utils/style/Atoms";

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
   return (
      <IconButton onClick={handleLogOut}>
         <FontAwesomeIcon icon={faRightFromBracket} />
      </IconButton>
   );
}
export default Logout;
