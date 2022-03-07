/* --------------------------------- */
/*          Imports Section          */
/* --------------------------------- */
// import axios
import axios from "axios";

/* --------------------------------------------- */
/*          GET_ALL_USERS Action Section          */
/* --------------------------------------------- */
// exporting GET_ALL_USERS
export const GET_ALL_USERS = "GET_ALL_USERS";
// exporting getAllUsers action
export const getAllUsers = () => {
   return async (dispatch) => {
      try {
         const response = await axios({
            method: "get",
            url: `${process.env.REACT_APP_API_URL}users`,
            withCredentials: true,
         });
         return dispatch({ type: GET_ALL_USERS, payload: response.data.users });
      } catch (err) {
         return console.log(err);
      }
   };
};

/* --------------------------------------------- */
/*          DELETE_ONE_OF_USERS Action Section          */
/* --------------------------------------------- */

// exporting DELETE_ONE_OF_USERS
export const DELETE_ONE_OF_USERS = "DELETE_ONE_OF_USERS";

// exporting getAllUsers action
export const deleteOneOfUsers = (userId) => {
   return async (dispatch) => {
      try {
         await axios({
            method: "delete",
            url: `${process.env.REACT_APP_API_URL}users/${userId}`,
            withCredentials: true,
         });
         return dispatch({ type: DELETE_ONE_OF_USERS, payload: { userId } });
      } catch (err) {
         return console.log(err);
      }
   };
};

/* -------------------------------------------- */
/*          UPDATE_ONE_OF_USERS Action Section          */
/* -------------------------------------------- */
// exporting UPDATE_ONE_OF_USERS type
export const UPDATE_ONE_OF_USERS = "UPDATE_ONE_OF_USERS";

// exporting UPDATE_ONE_OF_USERS action
export const updateOneOfUsers = (dataToSend, userId) => {
   // return what you want to add to store
   return async (dispatch) => {
      try {
         const response = await axios({
            method: "PUT",
            url: `${process.env.REACT_APP_API_URL}users/${userId}`,
            withCredentials: true,
            data: dataToSend,
         });
         return dispatch({
            type: UPDATE_ONE_OF_USERS,
            payload: response.data.user,
         });
      } catch (err) {
         return console.log(err);
      }
   };
};
