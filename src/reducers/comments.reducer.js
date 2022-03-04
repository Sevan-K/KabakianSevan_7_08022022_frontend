/* --------------------------------- */
/*          Imports Section          */
/* --------------------------------- */

import { DELETE_COMMENT, GET_ALL_COMMENTS } from "../actions/comments.action";

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
         return state.filter((comment) => comment.id !== action.payload);
      default:
         return state;
   }
}
