/* --------------------------------- */
/*          Imports section          */
/* --------------------------------- */

import { useContext } from "react";
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
