/* --------------------------------- */
/*          Imports Section          */
/* --------------------------------- */
import { DELETE_POSTS, GET_ALL_POSTS } from "../actions/post.actions";

/* -------------------------------------------- */
/*          Reducer definition section          */
/* -------------------------------------------- */

// initial state (required for all reducers)
const initialState = [];

// reducver function creation
export default function allPostsReducer(state = initialState, action) {
   switch (action.type) {
      case GET_ALL_POSTS:
         return action.payload;
      case DELETE_POSTS:
         return state.filter((post) => post.id !== action.payload);
      default:
         return state;
   }
}
