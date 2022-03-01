/* --------------------------------- */
/*          Imports Section          */
/* --------------------------------- */

import NewPostForm from "../../components/NewPostForm";
import Auth from "../../components/Auth";
import Thread from "../../components/Thread";
import { useUserId } from "../../utils/hooks/index";

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

   return (
      <main>
         <h1>Page d'accueil</h1>
         {userId ? (
            <>
               <NewPostForm />
               <Thread />
            </>
         ) : (
            <Auth />
         )}
      </main>
   );
}

// exporting component
export default Home;
