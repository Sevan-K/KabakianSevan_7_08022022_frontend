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

/* --------------------------------------------- */
/*          Components creation section          */
/* --------------------------------------------- */
ReactDOM.render(
   <React.StrictMode>
      <Router>
         <UserIdProvider>
            <GlobalStyle />
            <Header />
            <Routes>
               <Route exact path="/" element={<Home />} />
               <Route path="/profile" element={<Profile />} />
               <Route path="*" element={<Error />} />
            </Routes>
         </UserIdProvider>
      </Router>
   </React.StrictMode>,
   document.getElementById("root")
);
