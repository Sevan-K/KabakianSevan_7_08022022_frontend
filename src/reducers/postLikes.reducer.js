/* --------------------------------- */
/*          Imports Section          */
/* --------------------------------- */

import {
   ADD_LIKE,
   GET_POSTS_LIKES,
   REMOVE_LIKE,
} from "../actions/postLikes.actions";

/* -------------------------------------------- */
/*          Reducer definition section          */
/* -------------------------------------------- */

// initial state (required for all reducers)
const initialState = [];

// reducver function creation
export default function postLikesReducer(state = initialState, action) {
   switch (action.type) {
      case GET_POSTS_LIKES:
         return action.payload;
      case ADD_LIKE:
         return [...state, { postId: action.postId, userId: action.userId }];
      case REMOVE_LIKE:
         return state.filter(
            (postUserObject) =>
               postUserObject.postId !== action.payload.postId &&
               postUserObject.userId !== action.payload.userId
         );
      default:
         return state;
   }
}
