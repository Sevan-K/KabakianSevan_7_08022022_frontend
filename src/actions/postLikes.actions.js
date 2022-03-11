/* --------------------------------- */
/*          Imports Section          */
/* --------------------------------- */

import axios from "axios";

/* ---------------------------------------------- */
/*          GET_POSTS_LIKES action section          */
/* ---------------------------------------------- */

// creating and axporting an action type
export const GET_POSTS_LIKES = "GET_POSTS_LIKES";

// creating an action
export const getPostLikes = () => {
   return async (dispatch) => {
      try {
         const response = await axios({
            method: "GET",
            url: `${process.env.REACT_APP_API_URL}posts/likes`,
            withCredentials: true,
         });
         return dispatch({
            type: GET_POSTS_LIKES,
            payload: response.data.postLikes,
         });
      } catch (err) {
         return console.log(err);
      }
   };
};

/* ---------------------------------------------- */
/*          ADD_LIKE action section          */
/* ---------------------------------------------- */

// creating and axporting an action type
export const ADD_LIKE = "ADD_LIKE";

// creating an action
export const addLike = (postId, userId) => {
   return async (dispatch) => {
      try {
         await axios({
            method: "post",
            url: `${process.env.REACT_APP_API_URL}posts/${postId}/like`,
            withCredentials: true,
         });
         return dispatch({
            type: ADD_LIKE,
            payload: { postId, userId },
         });
      } catch (err) {
         return console.log(err);
      }
   };
};

/* ---------------------------------------------- */
/*          REMOVE_LIKE action section          */
/* ---------------------------------------------- */

// creating and axporting an action type
export const REMOVE_LIKE = "REMOVE_LIKE";

// creating an action
export const removeLike = (postId, userId) => {
   return async (dispatch) => {
      try {
         await axios({
            method: "delete",
            url: `${process.env.REACT_APP_API_URL}posts/${postId}/like`,
            withCredentials: true,
         });
         return dispatch({
            type: REMOVE_LIKE,
            payload: { postId, userId },
         });
      } catch (err) {
         return console.log(err);
      }
   };
};
