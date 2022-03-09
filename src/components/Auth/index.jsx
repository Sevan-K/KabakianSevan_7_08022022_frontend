/* -------------------------------------- */
/*          Secrtion des imports          */
/* -------------------------------------- */
import { useState } from "react";
import styled from "styled-components";
import PropTypes from "prop-types";

// importing components
import LogInForm from "./LogInForm";
import SignUpForm from "./SignUpForm";
import { colors, mainSize } from "../../utils/style/variables";
import { useMediaQuerry } from "../../utils/hooks";

/* ------------------------------------------- */
/*          Styled components section          */
/* ------------------------------------------- */
// styled component for the main element
const MainAuth = styled.main`
   width: ${({ matchesSmall }) =>
      matchesSmall ? mainSize.smallscreen : mainSize.regular};
   max-width: 50rem;
   margin: auto;
   padding: 2rem;
   border-radius: 1rem;
   text-align: center;
   // background-color: ${colors.backgroundLight};
   // border: 0.1rem solid ${colors.primary};
   background-color: ${colors.newCommentBg};
   box-shadow: 0.2rem 0.2rem 0.4rem ${colors.unactiveLink};
   & div {
      margin: 2rem 0;
   }
`;

// styled component fo the button
const StyledButton = styled.button`
   padding: 1rem 2rem;
   color: ${({ $isSelected }) =>
      $isSelected ? "#FFF" : colors.darkUnactiveLink};
   background-color: ${({ $isSelected }) =>
      $isSelected ? colors.primary : "#FFF"};
   z-index: ${({ $isSelected }) => ($isSelected ? 1 : 2)};
   font-weight: bold;
   font-size: 1.5rem;
   transition: 500ms;
   box-shadow: 0.1rem 0.1rem 0.5rem ${colors.unactiveLink};
   &:first-of-type {
      border-bottom-left-radius: 1rem;
      border-top-left-radius: 1rem;
   }
   &:last-of-type {
      border-top-right-radius: 1rem;
      border-bottom-right-radius: 1rem;
   }
`;

// styled component fo the succesfull sign up message
const SignUpMessage = styled.p`
   border-top: 0.1rem solid ${colors.unactiveLink};
   border-bottom: 0.1rem solid ${colors.unactiveLink};
   padding: 1rem 0;
   color: ${colors.darkUnactiveLink};
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
