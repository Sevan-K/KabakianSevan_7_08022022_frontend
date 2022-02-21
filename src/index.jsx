/* -------------------------------------- */
/*          Secrtion des imports          */
/* -------------------------------------- */
import React from "react";
import ReactDOM from "react-dom";
import { BrowserRouter as Router, Route, Routes } from "react-router-dom";

// pages import
import Home from "./pages/Home";
import Profile from "./pages/Profile";
import Error from "./pages/Error";

// components import
import Header from "./components/Header";

// global style import
import GlobalStyle from "./utils/style/GlobalStyle";

// authentification context provider import
import { UserIdProvider } from "./utils/context";

// redux imports
import { Provider } from "react-redux";
import { applyMiddleware, createStore } from "redux";
import { composeWithDevTools } from "redux-devtools-extension"; // dev-tool
import thunk from "redux-thunk"; // ne pas enlever pour la mise en prod
import logger from "redux-logger"; // dev-tool

// importing the combined reducers
import rootReducer from "./reducers";

// store creation
// adding (for dev) the dev tool
const store = createStore(
   rootReducer,
   composeWithDevTools(applyMiddleware(thunk, logger))
);

/* --------------------------------------------- */
/*          Components creation section          */
/* --------------------------------------------- */
ReactDOM.render(
   <React.StrictMode>
      <Router>
         <Provider store={store}>
            <UserIdProvider>
               <GlobalStyle />
               <Header />
               <Routes>
                  <Route exact path="/" element={<Home />} />
                  <Route path="/profile" element={<Profile />} />
                  <Route path="*" element={<Error />} />
               </Routes>
            </UserIdProvider>
         </Provider>
      </Router>
   </React.StrictMode>,
   document.getElementById("root")
);
