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
         return console.log(err);
      }
   };
};

/* ------------------------------------------------- */
/*          ADD_COMMENT action section          */
/* ------------------------------------------------- */

// creating and axporting an action type
export const ADD_COMMENT = "ADD_COMMENT";

// creating an action
export const addComment = (commentData) => {
   return async () => {
      try {
         await axios({
            method: "post",
            url: `${process.env.REACT_APP_API_URL}comments`,
            withCredentials: true,
            data: commentData,
         });
      } catch (err) {
         return console.log(err);
      }
   };
};

/* ------------------------------------------------- */
/*          DELETE_COMMENT action section          */
/* ------------------------------------------------- */

// creating and axporting an action type
export const DELETE_COMMENT = "DELETE_COMMENT";

// creating an action
export const deleteComment = (commentId) => {
   return async (dispatch) => {
      try {
         await axios({
            method: "delete",
            url: `${process.env.REACT_APP_API_URL}comments/${commentId}`,
            withCredentials: true,
         });
         return dispatch({ type: DELETE_COMMENT, payload: commentId });
      } catch (err) {
         return console.log(err);
      }
   };
};

/* ------------------------------------------------- */
/*          UPDATE_COMMENT action section          */
/* ------------------------------------------------- */

// creating and axporting an action type
export const UPDATE_COMMENT = "UPDATE_COMMENT";

// creating an action
export const updateComment = (commentId, content) => {
   return async (dispatch) => {
      try {
         await axios({
            method: "put",
            url: `${process.env.REACT_APP_API_URL}comments/${commentId}`,
            withCredentials: true,
            data: { content },
         });
         return dispatch({
            type: UPDATE_COMMENT,
            payload: { commentId, content },
         });
      } catch (err) {
         return console.log(err);
      }
   };
};
