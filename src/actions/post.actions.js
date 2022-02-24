/* --------------------------------- */
/*          Imports Section          */
/* --------------------------------- */

import axios from "axios";

/* ----------------------------------------- */
/*          GET_ALL_POSTS action section          */
/* ----------------------------------------- */

// creating and axporting an action type
export const GET_ALL_POSTS = "GET_ALL_POSTS";

// creating an action
export const getAllPosts = () => {
   return async (dispatch) => {
      try {
         const response = await axios({
            method: "GET",
            url: `${process.env.REACT_APP_API_URL}posts}`,
            withCredentials: true,
         });
         return dispatch({
            type: GET_ALL_POSTS,
            payload: response.data.posts,
         });
      } catch (err) {
         return console.log(err);
      }
   };
};
