/* --------------------------------- */
/*          Imports section          */
/* --------------------------------- */
import { createContext, useState } from "react";

/* ------------------------------------------------------- */
/*          Section pour le contexte lié au theme          */
/* ------------------------------------------------------- */

// auth context creation
export const AuthContext = createContext();

// provider compoonent creation
export function AuthProvider({ children }) {
   // a local state is declared to store the token
   const [token, setToken] = useState("");
   // function to setToken value
   const storeToken = (recievedToken) => {
      setToken(recievedToken);
   };
   // returning the provider with the authentification context
   return (
      <AuthContext.Provider value={{ token, storeToken }}>
         {children}
      </AuthContext.Provider>
   );
}
