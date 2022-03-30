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
import { useUserId } from "./utils/hooks";
import Auth from "./components/Auth";

/* --------------------------------------------- */
/*          Components creation section          */
/* --------------------------------------------- */
function App() {
   // userId is required from context
   const { userId } = useUserId();
   return (
      <>
         {/* -------------- Loader -------------- */}
         <Loader>
            <LoaderLogo>
               <img src={logo} alt="Logo de l'entreprise" />
            </LoaderLogo>{" "}
            <LoaderText>Le réseau social</LoaderText>
            <LoaderSpinner></LoaderSpinner>
         </Loader>
         {/* -------------- Shared header -------------- */}
         <Header />
         {/* -------------- Differents pages -------------- */}
         <Routes>
            {/* if a user is connected display page component if not display auth component */}
            <Route
               exact
               path="/"
               // TODO FIXME => props is used only on first render (whenpage is reloaded)
               element={!!userId ? <Home /> : <Auth signUp={true} />}
            />
            <Route
               path="/profile/"
               element={!!userId ? <Profile /> : <Auth />}
            />
            <Route
               path="/profile/:pseudo"
               element={!!userId ? <Profile /> : <Auth />}
            />
            <Route path="*" element={<Error />} />
         </Routes>
      </>
   );
}

// exporting component
export default App;
