/* -------------------------------------- */
/*          Secrtion des imports          */
/* -------------------------------------- */

import { useState } from "react";
import styled from "styled-components";
import PropTypes from "prop-types";

// importing components
import LogInForm from "./LogInForm";
import SignUpForm from "./SignUpForm";
import { mainSize } from "../../utils/style/variables";

/* ------------------------------------------- */
/*          Styled components section          */
/* ------------------------------------------- */
// styled component for the main element
const MainAuth = styled.main`
   width: ${mainSize};
   margin: auto;
   padding: 2rem;
   border: 1px solid black;
`;

// styled component fo the button
const StyledButton = styled.button`
   padding: 1rem;
   background-color: ${({ $isSelected }) => $isSelected && "red"};
`;

/* --------------------------------------------- */
/*          Components creation section          */
/* --------------------------------------------- */
// Authentification component function
function Auth({ signUp }) {
   // local state to know if the user want to log in or to sign up
   const [signUpModal, setSignUpModal] = useState(signUp);

   // local state to know if the signUpForm has been submited with success
   const [signUpFormSubmit, setSignUpFormSubmit] = useState(false);

   // component to return
   // signUp form if signUpModal is true
   // logIn form if signUpModal is false or signUpFormSubmit is true
   return (
      <MainAuth>
         <p>Auth</p>
         <div>
            <StyledButton
               onClick={() => setSignUpModal(false)}
               $isSelected={!signUpModal || signUpFormSubmit}
            >
               Login
            </StyledButton>
            <StyledButton
               onClick={() => {
                  setSignUpModal(true);
                  setSignUpFormSubmit(false);
               }}
               $isSelected={signUpModal && !signUpFormSubmit}
            >
               SignUp
            </StyledButton>
         </div>
         {signUpFormSubmit && (
            <p>Votre compte a été crée avec succès, connectez vous !</p>
         )}
         {signUpModal && !signUpFormSubmit ? (
            <SignUpForm setSignUpFormSubmit={setSignUpFormSubmit} />
         ) : (
            <LogInForm />
         )}
      </MainAuth>
   );
}

// setting proptypes
Auth.propTypes = {
   signUp: PropTypes.bool,
};

// setting defaultProps values
Auth.defaultProps = {
   signUp: false,
};

// exporting component
export default Auth;
