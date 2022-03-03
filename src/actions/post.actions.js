/* --------------------------------- */
/*          Imports Section          */
/* --------------------------------- */

import axios from "axios";

/* ---------------------------------------------- */
/*          GET_ALL_POSTS action section          */
/* ---------------------------------------------- */

// creating and axporting an action type
export const GET_ALL_POSTS = "GET_ALL_POSTS";

// creating an action
export const getAllPosts = () => {
   return async (dispatch) => {
      try {
         const response = await axios({
            method: "GET",
            url: `${process.env.REACT_APP_API_URL}posts`,
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

/* ------------------------------------------ */
/*          ADD_POSTS action section          */
/* ------------------------------------------ */
// creating and axporting an action type
export const ADD_POST = "ADD_POST";

// creating an action
export const addPost = (data) => {
   return async () => {
      try {
         // request to the posts routes using post method
         await axios({
            method: "post",
            url: `${process.env.REACT_APP_API_URL}posts`,
            withCredentials: true,
            data: data,
         });
      } catch (err) {
         return console.log(err);
      }
   };
};

/* --------------------------------------------- */
/*          DELETE_POST action section          */
/* --------------------------------------------- */
// creating and axporting an action type
export const DELETE_POST = "DELETE_POST";

// creating an action
export const deletePost = (postId) => {
   return async (dispatch) => {
      try {
         await axios({
            method: "delete",
            url: `${process.env.REACT_APP_API_URL}posts/${postId}`,
            withCredentials: true,
         });
         return dispatch({ type: DELETE_POST, payload: postId });
      } catch (err) {
         return console.log(err);
      }
   };
};

/* --------------------------------------------- */
/*          UPDATE_POSTS action section          */
/* --------------------------------------------- */
// creating and axporting an action type
export const UPDATE_POST = "UPDATE_POST";

// creating an action
export const updatePost = (postId, content) => {
   return async (dispatch) => {
      try {
         await axios({
            method: "put",
            url: `${process.env.REACT_APP_API_URL}posts/${postId}`,
            withCredentials: true,
            data: { content },
         });
         return dispatch({ type: UPDATE_POST, payload: { postId, content } });
      } catch (err) {
         return console.log(err);
      }
   };
};
