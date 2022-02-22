/* --------------------------------- */
/*          Imports Section          */
/* --------------------------------- */
import { GET_USER, UPDATE_USER } from "../actions/user.actions";

// initial state (required for all reducers)
const initialState = {};

// function creation
function userReducer(state = initialState, action) {
   // using a swith to precise what to return for each action
   switch (action.type) {
      case GET_USER:
         return action.payload;
      case UPDATE_USER:
         return { ...action.payload };
      default:
         return state;
   }
}

// reducer export
export default userReducer;
