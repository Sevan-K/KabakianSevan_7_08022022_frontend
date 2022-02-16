/* --------------------------------- */
/*          Imports section          */
/* --------------------------------- */

import { useContext } from "react";
import { TokenContext, UserIdContext } from "../context";

/* ------------------------------------------- */
/*          Hook to get token context          */
/* ------------------------------------------- */
export function useToken() {
   const { token, storeToken } = useContext(TokenContext);
   return { token, storeToken };
}

/* ------------------------------------------- */
/*          Hook to get userId context          */
/* ------------------------------------------- */
export function useUserId() {
   const { userId, getUserId } = useContext(UserIdContext);
   return { userId, getUserId };
}
