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
// exporting GET_USER type
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
// exporting UPDATE_USER type
export const updateUser = (dataToSend, userId) => {
   // return what you want to add to store
   return (dispatch) => {
      return axios({
         method: "PUT",
         url: `${process.env.REACT_APP_API_URL}users/${userId}`,
         withCredentials: true,
         data: dataToSend,
      })
         .then(dispatch({ type: UPDATE_USER, payload: {} }))
         .catch((err) => console.log(err));
   };
};
