/* --------------------------------- */
/*          Imports Section          */
/* --------------------------------- */

import Thread from "../../components/Thread";

/* ------------------------------------------- */
/*          Styled components section          */
/* ------------------------------------------- */

/* --------------------------------------------- */
/*          Components creation section          */
/* --------------------------------------------- */

// component function
function Home() {
   return (
      <div>
         <h1>Page d'accueil</h1>
         <Thread />
      </div>
   );
}

// exporting component
export default Home;
