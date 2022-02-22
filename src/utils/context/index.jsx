/* --------------------------------- */
/*          Imports section          */
/* --------------------------------- */
import axios from "axios";
import { createContext, useEffect, useState } from "react";
import { useDispatch } from "react-redux";
import { getUser } from "../../actions/user.actions";

/* ---------------------------------------- */
/*          UserId context section          */
/* ---------------------------------------- */

// userId context creation
export const UserIdContext = createContext();

// userId provider component creation
export function UserIdProvider({ children }) {
   // local state to store userId
   const [userId, setUserId] = useState(null);
   // call the dispatch hook
   const dispatch = useDispatch();

   // useEffect to get userId on first render
   useEffect(() => {
      const getUserId = async () => {
         try {
            const response = await axios({
               method: "get",
               url: `${process.env.REACT_APP_API_URL}auth/tokentoid`,
               withCredentials: true,
            });
            const { userId } = response.data;
            setUserId(userId);
         } catch (err) {
            console.log("=== err ===>", err.message);
         }
      };
      getUserId();
      // if userId exist
      if (!!userId) {
         console.log("=== userId ===>", userId);
         // call the action get user
         dispatch(getUser(userId));
      }
   }, [userId]);

   // useEffect to call get user action whenever userId changes
   useEffect(() => {}, [userId, dispatch]);

   return (
      <UserIdContext.Provider value={{ userId }}>
         {children}
      </UserIdContext.Provider>
   );
}
