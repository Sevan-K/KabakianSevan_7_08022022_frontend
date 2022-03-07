/* --------------------------------- */
/*          Imports section          */
/* --------------------------------- */

import { useContext, useEffect, useState } from "react";
import { OnHomeContext, UserIdContext } from "../context";

// /* ------------------------------------------- */
// /*          Hook to get token context          */
// /* ------------------------------------------- */
// export function useAuth() {
//    const { auth, storeAuth } = useContext(AuthContext);
//    return { auth, storeAuth };
// }

/* -------------------------------------------- */
/*          Hook to get userId context          */
/* -------------------------------------------- */
export function useUserId() {
   const { userId } = useContext(UserIdContext);
   return { userId };
}

/* -------------------------------------------- */
/*          Hook to get onHome context          */
/* -------------------------------------------- */
export function useOnHome() {
   const { onHome, updateOnHome } = useContext(OnHomeContext);
   return { onHome, updateOnHome };
}

/* -------------------------------------------- */
/*          Hook to get onHome context          */
/* -------------------------------------------- */
export function useMediaQuerry(querry) {
   // format de querry "(min-width:600px)"

   // local state to know if querry match the media
   const [matches, setMatches] = useState(window.matchMedia(querry).matches);

   // useeffect to listen to every change of the querry argument
   useEffect(() => {
      // get the media value
      window
         .matchMedia(querry)
         .addEventListener("change", (event) => setMatches(event.matches));
   }, [querry]);

   // return matches
   return matches;
}
