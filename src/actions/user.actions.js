/* --------------------------------- */
/*          Imports Section          */
/* --------------------------------- */
// import axios
import axios from "axios";


/* --------------------------------- */
/*          Imports Section          */
/* --------------------------------- */
// exporting GET_USER type
export const GET_USER = "GET_USER";
// exporting GET_USER type
export const getUser = (userId) => {
   // return what you want to add to store
   return (dispatch) => {
      //    returning the fetch to the API using axios
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
