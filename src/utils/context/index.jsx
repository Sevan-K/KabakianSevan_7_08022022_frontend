/* --------------------------------- */
/*          Imports section          */
/* --------------------------------- */
import axios from "axios";
import { createContext, useEffect, useState } from "react";
import { useToken } from "../hooks";

/* -------------------------------------------------- */
/*          Auth context section          */
/* -------------------------------------------------- */

// Auth context creation
export const AuthContext = createContext();

// token provider component creation
export function AuthProvider({ children }) {
   // a local state is declared to store the token
   const [auth, setAuth] = useState({});
   // function to setToken value
   const storeAuth = (recievedAuth) => {
      setAuth(recievedAuth);
   };

   // returning the provider with the Auth context
   return (
      <AuthContext.Provider value={{ auth, storeAuth }}>
         {children}
      </AuthContext.Provider>
   );
}

/* ---------------------------------------- */
/*          UserId context section          */
/* ---------------------------------------- */

// userId context creation
export const UserIdContext = createContext();

// userId provider component creation
export function UserIdProvider({ children }) {
   // local state to store userId
   const [userId, setUserId] = useState(null);

   // useEffect to get userId on first render
   useEffect(() => {
      const getUserId = async () => {
         try {
            const response = await axios({
               method: "get",
               url: `^${process.env.REACT_APP_API_URL}token`,
               withCredentials: true,
            });
            console.log("=== response ===>", response);
            const { userId } = response.json();
            setUserId(userId);
         } catch (err) {
            console.log(err);
         }
      };
      getUserId();
   }, []);

   return (
      <UserIdContext.Provider value={{ userId }}>
         {children}
      </UserIdContext.Provider>
   );
}
