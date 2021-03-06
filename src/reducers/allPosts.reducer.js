/* --------------------------------- */
/*          Imports Section          */
/* --------------------------------- */
import {
   DELETE_POST,
   GET_ALL_POSTS,
   UPDATE_POST,
} from "../actions/post.actions";
import { DELETE_ONE_OF_USERS } from "../actions/users.actions";

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
      case DELETE_POST:
         return state.filter((post) => post.id !== action.payload);
      case UPDATE_POST:
         return state.map((post) =>
            post.id === action.payload.postId
               ? { ...post, content: action.payload.content }
               : post
         );
      case DELETE_ONE_OF_USERS:
         return state.filter((post) => post.userId !== action.payload.userId);
      default:
         return state;
   }
}
