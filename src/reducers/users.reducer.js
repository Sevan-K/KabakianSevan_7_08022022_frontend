/* --------------------------------- */
/*          Imports Section          */
/* --------------------------------- */

import { GET_ALL_USER } from "../actions/users.actions";

/* -------------------------------------------- */
/*          Reducer definition section          */
/* -------------------------------------------- */
// initial state (required for all reducers)
const initialState = [];

// function creation
export default function usersReducer(state = initialState, action) {
   switch (action.type) {
      case GET_ALL_USER:
         return action.payload;
      default:
         return state;
   }
}
