// combineReducer library import
import { combineReducers } from "redux";

// import all the reducers
import userReducer from "./user.reducer";

// exporting the combine reducers
export default combineReducers({ userReducer });
