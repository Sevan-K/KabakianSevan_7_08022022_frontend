/* --------------------------------- */
/*          Imports Section          */
/* --------------------------------- */
import { Route, Routes } from "react-router-dom";
// pages import
import Home from "./pages/Home";
import Profile from "./pages/Profile";
import Error from "./pages/Error";

// components import
import Header from "./components/Header";
import {
   Loader,
   LoaderSpinner,
   LoaderLogo,
   LoaderText,
} from "./utils/style/Atoms";

import logo from "./assets/icon-above-font.svg";

/* --------------------------------------------- */
/*          Components creation section          */
/* --------------------------------------------- */
function App() {
   return (
      <>
         <Loader>
            <LoaderLogo>
               <img src={logo} alt="Logo de l'entreprise" />
            </LoaderLogo>{" "}
            <LoaderText>Le réseau social</LoaderText>
            <LoaderSpinner></LoaderSpinner>
         </Loader>
         <Header />
         <Routes>
            <Route exact path="/" element={<Home />} />
            <Route path="/profile/" element={<Profile />} />
            <Route path="/profile/:pseudo" element={<Profile />} />
            <Route path="*" element={<Error />} />
         </Routes>
      </>
   );
}

// exporting component
export default App;
