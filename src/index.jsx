/* -------------------------------------- */
/*          Secrtion des imports          */
/* -------------------------------------- */
import React from "react";
import ReactDOM from "react-dom";

// pages import
import Home from "./pages/Home";
import Profile from "./pages/Profile";
import Error from "./pages/Error";

// rooter import
import { BrowserRouter as Router, Route, Routes } from "react-router-dom";
import Header from "./components/Header";

/* --------------------------------------------- */
/*          Components creation section          */
/* --------------------------------------------- */
ReactDOM.render(
   <React.StrictMode>
      <Router>
         <Header />
         <Routes>
            <Route exact path="/" element={<Home />} />
            <Route path="/profile" element={<Profile />} />
            <Route path="*" element={<Error />} />
         </Routes>
      </Router>
   </React.StrictMode>,
   document.getElementById("root")
);
