/* -------------------------------------- */
/*          Secrtion des imports          */
/* -------------------------------------- */

import { useState } from "react";
import styled from "styled-components";
import PropTypes from "prop-types";

// importing components
import LoginForm from "../LoginForm";
import SignUpForm from "../SignUpForm";

/* ------------------------------------------- */
/*          Styled components section          */
/* ------------------------------------------- */
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
   return (
      <div>
         <p>Auth</p>
         <div>
            <StyledButton
               onClick={() => setSignUpModal(false)}
               $isSelected={!signUpModal}
            >
               Login
            </StyledButton>
            <StyledButton
               onClick={() => setSignUpModal(true)}
               $isSelected={signUpModal}
            >
               SignUp
            </StyledButton>
         </div>

         {signUpModal ? <SignUpForm /> : <LoginForm />}
      </div>
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
