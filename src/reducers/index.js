// combineReducer library import
import { combineReducers } from "redux";

// import all the reducers
import userReducer from "./user.reducer";
import allPostsReducer from "./allPosts.reducer";
import usersReducer from "./users.reducer";
import commentsReducer from "./comments.reducer";

// exporting the combine reducers
export default combineReducers({
   userReducer,
   allPostsReducer,
   usersReducer,
   commentsReducer,
});
