/* --------------------------------- */
/*          Imports Section          */
/* --------------------------------- */
import { Route, Routes } from "react-router-dom";
// modules import
import Home from "./modules/Home";
import Profile from "./modules/Profile";
import Error from "./modules/Error";
import Auth from "./modules/Auth";

// components import
import Header from "./modules/Shared/components/Header";
import {
   Loader,
   LoaderSpinner,
   LoaderLogo,
   LoaderText,
} from "./utils/style/Loader";

import logo from "./assets/icon-above-font.svg";
import { useUserId } from "./utils/hooks";

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
