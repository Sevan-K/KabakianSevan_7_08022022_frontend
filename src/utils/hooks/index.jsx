/* --------------------------------- */
/*          Imports section          */
/* --------------------------------- */

import { useContext } from "react";
import { AuthContext, UserIdContext } from "../context";

/* ------------------------------------------- */
/*          Hook to get token context          */
/* ------------------------------------------- */
export function useAuth() {
   const { auth, storeAuth } = useContext(AuthContext);
   return { auth, storeAuth };
}

/* ------------------------------------------- */
/*          Hook to get userId context          */
/* ------------------------------------------- */
export function useUserId() {
   const { userId } = useContext(UserIdContext);
   return { userId };
}
