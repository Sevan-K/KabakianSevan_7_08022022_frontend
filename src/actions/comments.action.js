/* --------------------------------- */
/*          Imports Section          */
/* --------------------------------- */

import axios from "axios";

/* ------------------------------------------------- */
/*          GET_ALL_COMMENTS action section          */
/* ------------------------------------------------- */
// creating and axporting an action type
export const GET_ALL_COMMENTS = "GET_ALL_COMMENTS";

// creating an action
export const getAllComments = () => {
   return async (dispatch) => {
      try {
         const response = await axios({
            method: "get",
            url: `${process.env.REACT_APP_API_URL}comments`,
            withCredentials: true,
         });
         //  console.log("=== comments ===>", response.data.comments);
         return dispatch({
            type: GET_ALL_COMMENTS,
            payload: response.data.comments,
         });
      } catch (err) {
         console.log(err);
      }
   };
};
