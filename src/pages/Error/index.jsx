/* --------------------------------- */
/*          Imports Section          */
/* --------------------------------- */
import styled from "styled-components";
import errorImage from "../../assets/404error.png";
import { PageTitle } from "../../utils/style/Atoms";
import { colors, mainSize } from "../../utils/style/variables";

/* ------------------------------------------- */
/*          Styled components section          */
/* ------------------------------------------- */

// styled component for the main element
const ErrorMain = styled.main`
   width: ${mainSize.regular};
   max-width: 50rem;
   margin: auto;
   padding: 3rem;
   background-color: ${colors.backgroundLight};
   border-radius: 1.5rem;
   position: relative;
   top: 5rem;
`;

/* --------------------------------------------- */
/*          Components creation section          */
/* --------------------------------------------- */
// component function
function Error() {
   return (
      <ErrorMain>
         <PageTitle>Page not found</PageTitle>
         <p>
            <img src={errorImage} alt="404 error" />
         </p>
      </ErrorMain>
   );
}

// exporting component
export default Error;
