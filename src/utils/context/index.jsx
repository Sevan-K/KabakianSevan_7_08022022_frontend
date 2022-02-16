/* --------------------------------- */
/*          Imports section          */
/* --------------------------------- */
import axios from "axios";
import { createContext, useEffect, useState } from "react";
import { useToken } from "../hooks";

/* -------------------------------------------------- */
/*          Token context section          */
/* -------------------------------------------------- */

// token context creation
export const TokenContext = createContext();

// token provider component creation
export function TokenProvider({ children }) {
   // a local state is declared to store the token
   const [token, setToken] = useState("");
   // function to setToken value
   const storeToken = (recievedToken) => {
      setToken(recievedToken);
   };

   // returning the provider with the token context
   return (
      <TokenContext.Provider value={{ token, storeToken }}>
         {children}
      </TokenContext.Provider>
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
   const getUserId = async (token) => {
      // try {
      //    const response = await axios({
      //       method: "get",
      //       url: `^${process.env.REACT_APP_API_URL}token`,
      //       withCredentials: true,
      //       headers: {
      //          Authorization: `Baerer ${token}`,
      //       },
      //    });
      //    console.log("=== response ===>", response);
      //    const { userId } = response.json();
      //    setUserId(userId);
      // } catch (err) {
      //    console.log(err);
      // }
      setUserId(token);
   };

   return (
      <UserIdContext.Provider value={{ userId, getUserId }}>
         {children}
      </UserIdContext.Provider>
   );
}
