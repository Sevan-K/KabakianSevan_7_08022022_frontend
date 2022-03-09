/* --------------------------------- */
/*          Imports Section          */
/* --------------------------------- */

import {
   DELETE_COMMENT,
   GET_ALL_COMMENTS,
   UPDATE_COMMENT,
} from "../actions/comments.action";
import { DELETE_ONE_OF_USERS } from "../actions/users.actions";

/* -------------------------------------------- */
/*          Reducer definition section          */
/* -------------------------------------------- */

// initial state (required for all reducers)
const initialState = [];

// reducver function creation
export default function commentsReducer(state = initialState, action) {
   switch (action.type) {
      case GET_ALL_COMMENTS:
         return action.payload;
      case DELETE_COMMENT:
         // remove the comment which id is on payload from the store
         return state.filter((comment) => comment.id !== action.payload);
      case UPDATE_COMMENT:
         // update the targeted comment's content on store
         return state.map((comment) =>
            comment.id === action.payload.commentId
               ? { ...comment, content: action.payload.content }
               : comment
         );
      case DELETE_ONE_OF_USERS:
         return state.filter(
            (comment) => comment.userId !== action.payload.userId
         );
      default:
         return state;
   }
}
