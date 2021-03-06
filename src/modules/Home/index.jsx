/* --------------------------------- */
/*          Imports Section          */
/* --------------------------------- */
import NewPostForm from "./components/NewPostForm";
import Thread from "./components/Thread";
import { useMediaQuerry, useUserId } from "../../utils/hooks/index";
import { useEffect, useState } from "react";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faSpinner } from "@fortawesome/free-solid-svg-icons";
import { PageTitle } from "../Shared/styledComponents";
// styled components
import { HomeMain } from "./styledComponents";


/* --------------------------------------------- */
/*          Components creation section          */
/* --------------------------------------------- */

// component function
function Home() {
   // userId is required from context
   const { userId } = useUserId();

   // local state to know if post card is loading
   const [isloading, setIsLoading] = useState(true);

   // constant for small screens mediaquerry
   const matchesSmall = useMediaQuerry("(max-width: 450px)");

   // useEffect to stop loading once users data are available
   useEffect(() => {
      setIsLoading(false);
   }, [userId]);

   return (
      <div>
         {/* -------------- Loader -------------- */}
         {isloading ? (
            <FontAwesomeIcon icon={faSpinner} className="fa-spin" />
         ) : (
            <>
               {/* -------------- Home page components -------------- */}
               <PageTitle>Fil d'actualité</PageTitle>
               <HomeMain matchesSmall={matchesSmall}>
                  <NewPostForm />
                  <Thread />
               </HomeMain>
            </>
         )}
      </div>
   );
}

// exporting component
export default Home;
