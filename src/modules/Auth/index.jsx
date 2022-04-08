/* --------------------------------- */
/*          Imports Section          */
/* --------------------------------- */
import { useState } from "react";
import PropTypes from "prop-types";

// importing components
import LogInForm from "./components/LogInForm";
import SignUpForm from "./components/SignUpForm";
import { useMediaQuerry } from "../../utils/hooks";
import { MainAuth, StyledButton, SignUpMessage } from "./styledComponents";

/* --------------------------------------------- */
/*          Components creation section          */
/* --------------------------------------------- */
// Authentification component function
function Auth({ signUp }) {
   // local state to know if the user want to log in or to sign up
   const [signUpModal, setSignUpModal] = useState(signUp);

   // local state to know if the signUpForm has been submited with success
   const [signUpFormSubmit, setSignUpFormSubmit] = useState(false);

   // constant for small screens mediaquerry
   const matchesSmall = useMediaQuerry("(max-width: 450px)");

   // component to return
   // signUp form if signUpModal is true
   // logIn form if signUpModal is false or signUpFormSubmit is true
   return (
      <MainAuth matchesSmall={matchesSmall}>
         <h2>Authentification</h2>
         {/* -------------- Buttons to switch between signu up and log in forms -------------- */}
         <div>
            <StyledButton
               onClick={() => setSignUpModal(false)}
               $isSelected={!signUpModal || signUpFormSubmit}
            >
               Connexion
            </StyledButton>
            <StyledButton
               onClick={() => {
                  setSignUpModal(true);
                  setSignUpFormSubmit(false);
               }}
               $isSelected={signUpModal && !signUpFormSubmit}
            >
               Inscription
            </StyledButton>
         </div>
         {/* -------------- Successfully created account message -------------- */}
         {signUpFormSubmit && (
            <SignUpMessage>
               Votre compte a été crée avec succès 👏 , connectez vous !
            </SignUpMessage>
         )}
         {/* -------------- Log in form component -------------- */}
         {signUpModal && !signUpFormSubmit ? (
            /* -------------- Sign up form component -------------- */

            <SignUpForm setSignUpFormSubmit={setSignUpFormSubmit} />
         ) : (
            /* -------------- Log in form component -------------- */
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
