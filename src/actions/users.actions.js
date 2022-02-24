/* --------------------------------- */
/*          Imports Section          */
/* --------------------------------- */
// import axios
import axios from "axios";

/* ----------------------------------------- */
/*          GET_ALL_USER Action Section          */
/* ----------------------------------------- */
// exporting GET_ALL_USER
export const GET_ALL_USER = "GET_ALL_USER";
// exporting getAllUsers action
export const getAllUsers = () => {
   return async (dispatch) => {
      try {
         const response = await axios({
            method: "get",
            url: `${process.env.REACT_APP_API_URL}users`,
            withCredentials: true,
         });
         return dispatch({ type: GET_ALL_USER, payload: response.data.users });
      } catch (err) {
         return console.log(err);
      }
   };
};