/* --------------------------------- */
/*          Imports section          */
/* --------------------------------- */

import { useContext } from "react";
import { AuthContext } from "../context";

/* ------------------------------------------------------ */
/*          Hook to get Authentification context          */
/* ------------------------------------------------------ */
export function useAuth() {
   const { token, storeToken } = useContext(AuthContext);
   return { token, storeToken };
}
