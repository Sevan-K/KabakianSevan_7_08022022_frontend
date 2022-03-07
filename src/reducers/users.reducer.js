/* --------------------------------- */
/*          Imports Section          */
/* --------------------------------- */

import { UPDATE_USER } from "../actions/user.actions";
import {
   DELETE_ONE_OF_USERS,
   GET_ALL_USERS,
   UPDATE_ONE_OF_USERS,
} from "../actions/users.actions";

/* -------------------------------------------- */
/*          Reducer definition section          */
/* -------------------------------------------- */
// initial state (required for all reducers)
const initialState = [];

// function creation
export default function usersReducer(state = initialState, action) {
   switch (action.type) {
      case GET_ALL_USERS:
         return action.payload;
      case DELETE_ONE_OF_USERS:
         return state.filter((user) => user.id !== action.payload.userId);
      case UPDATE_ONE_OF_USERS:
         return state.map((user) =>
            user.id === action.payload.id ? { ...action.payload } : user
         );
      case UPDATE_USER:
         return state.map((user) =>
            user.id === action.payload.id ? { ...action.payload } : user
         );
      default:
         return state;
   }
}
