/* --------------------------------- */
/*          Imports Section          */
/* --------------------------------- */

import NewPostForm from "../../components/NewPostForm";
import Auth from "../../components/Auth";
import Thread from "../../components/Thread";
import { useUserId } from "../../utils/hooks/index";
import { useEffect, useState } from "react";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faSpinner } from "@fortawesome/free-solid-svg-icons";
import { PageTitle } from "../../utils/style/Atoms";

/* ------------------------------------------- */
/*          Styled components section          */
/* ------------------------------------------- */

/* --------------------------------------------- */
/*          Components creation section          */
/* --------------------------------------------- */

// component function
function Home() {
   // userId is required from context
   const { userId } = useUserId();

   // local state to know if post card is loading
   const [isloading, setIsLoading] = useState(true);

   // useEffect to stop loading once users data are available
   useEffect(() => {
      setIsLoading(false);
   }, [userId]);

   return (
      <div>
         {isloading ? (
            <FontAwesomeIcon icon={faSpinner} className="fa-spin" />
         ) : (
            <>
               <PageTitle className="dev">Fil d'actualité</PageTitle>
               {!!userId ? (
                  <main>
                     <NewPostForm />
                     <Thread />
                  </main>
               ) : (
                  <Auth signUp={true} />
               )}
            </>
         )}
      </div>
   );
}

// exporting component
export default Home;
