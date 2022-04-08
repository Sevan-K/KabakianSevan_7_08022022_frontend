/* --------------------------------- */
/*          Imports Section          */
/* --------------------------------- */
import React from "react";
import ReactDOM from "react-dom";
import { BrowserRouter as Router } from "react-router-dom";

// global style import
import GlobalStyle from "./utils/style/GlobalStyle";

// authentification context provider import
import { OnHomeProvider, UserIdProvider } from "./utils/context";

// redux imports
import { Provider } from "react-redux";
import { applyMiddleware, createStore } from "redux";
import { composeWithDevTools } from "redux-devtools-extension"; // dev-tool
import thunk from "redux-thunk"; // ne pas enlever pour la mise en prod
// import logger from "redux-logger"; // dev-tool

// importing the combined reducers
import rootReducer from "./reducers";
// importing action to get all users from DB
import { getAllUsers } from "./actions/users.actions";

import App from "./app";

/* ---------------------------------------- */
/*          Store creation section          */
/* ---------------------------------------- */

// store creation
const store = createStore(
   rootReducer,
   composeWithDevTools(applyMiddleware(thunk /* , logger */))
);

// as soon as possible all users are required
store.dispatch(getAllUsers());

/* --------------------------------------------- */
/*          Components creation section          */
/* --------------------------------------------- */
ReactDOM.render(
   <React.StrictMode>
      <Router>
         {/* -------------- Providers -------------- */}
         <Provider store={store}>
            <UserIdProvider>
               <OnHomeProvider>
                  {/* -------------- Global style component -------------- */}
                  <GlobalStyle />
                  {/* -------------- Main app -------------- */}
                  <App />
               </OnHomeProvider>
            </UserIdProvider>
         </Provider>
      </Router>
   </React.StrictMode>,
   document.getElementById("root")
);

