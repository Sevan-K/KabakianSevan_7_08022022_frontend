/* --------------------------------- */
/*          Imports Section          */
/* --------------------------------- */
// import axios
import axios from "axios";

/* ----------------------------------------- */
/*          GET_USER Action Section          */
/* ----------------------------------------- */
// exporting GET_USER type
export const GET_USER = "GET_USER";
// exporting GET_USER action
export const getUser = (userId) => {
   // return what you want to add to store
   return (dispatch) => {
      // returning the fetch to the API using axios
      return (
         axios({
            method: "get",
            url: `${process.env.REACT_APP_API_URL}users/${userId}`,
            withCredentials: true,
         })
            //   once user is recoverd it is send (dispacth) to the reducer
            .then((response) =>
               dispatch({ type: GET_USER, payload: response.data.user })
            )
            .catch((err) => console.log(err))
      );
   };
};

/* -------------------------------------------- */
/*          UPDATE_USER Action Section          */
/* -------------------------------------------- */
// exporting UPDATE_USER type
export const UPDATE_USER = "UPDATE_USER";
// exporting UPDATE_USER action
export const updateUser = (dataToSend, userId) => {
   // return what you want to add to store
   return async (dispatch) => {
      try {
         const response = await axios({
            method: "PUT",
            url: `${process.env.REACT_APP_API_URL}users/${userId}`,
            withCredentials: true,
            data: dataToSend,
         });
         return dispatch({ type: UPDATE_USER, payload: response.data.user });
      } catch (err) {
         return console.log(err);
      }
   };
};

/* -------------------------------------------- */
/*          DELETE_USER Action Section          */
/* -------------------------------------------- */
// exporting DELETE_USER type
export const DELETE_USER = "DELETE_USER";
// exporting DELETE_USER action
export const deleteUser = (userId) => {
   // return what you want to add to store
   return async (dispatch) => {
      try {
         await axios({
            method: "delete",
            url: `${process.env.REACT_APP_API_URL}users/${userId}`,
            withCredentials: true,
         });
         return dispatch({ type: DELETE_USER, payload: {} });
      } catch (err) {
         return console.log(err);
      }
   };
};
