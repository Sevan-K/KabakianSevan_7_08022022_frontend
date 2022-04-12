/* -------------------------------------- */
/*          Secrtion des imports          */
/* -------------------------------------- */

import axios from "axios";
import { useState } from "react";
import { AuthForm, AuthLabel } from "../styledComponents";
import {ErrorMessage, AuthSumbitInput} from "../../Shared/styledComponents";

/* ------------------------------------------- */
/*          Styled components section          */
/* ------------------------------------------- */
// all styled component are imported from atoms

/* --------------------------------------------- */
/*          Components creation section          */
/* --------------------------------------------- */
// Authentification component function
function SignUpForm({ setSignUpFormSubmit }) {
   // local state is employed to store data from user
   const [pseudo, setPseudo] = useState("");
   const [email, setEmail] = useState("");
   const [password, setPassword] = useState("");

   // local states to show error messages
   const [pseudoError, setPseudoError] = useState("");
   const [emailError, setEmailError] = useState("");
   const [passwordError, setPasswordError] = useState("");
   // possible d'ajouter une case pour voir si les deux sont les même
   // const [ctrlPasswordError, setCtrlPasswordError] = useState("");

   // function to update form status
   const checkSignUpForm = () => {
      // regex for password
      const passwordRegex =
         /^(?=.*\d)(?=.*[a-z])(?=.*[A-Z])(?=.*[a-zA-Z]).{8,}$/;
      // regex for name and
      const pseudoRegex =
         /^\b((?!-)(?!.*--)(?!')(?!.*'')[-A-ZÀ-ÿa-z0-9. ']{2,30}(?<!-)(?<!'))$/;
      // regex for email
      const emailRegex = /^[\w-.]+@([\w-]+\.)+[\w-]{2,4}$/g;

      const isPseudoValid = pseudoRegex.test(pseudo);
      // if the pseudo does not match the regex
      if (isPseudoValid) {
         setPseudoError("");
      } else {
         setPseudoError("Veuillez renseigner un pseudo valide");
      }

      const isEmailValid = emailRegex.test(email);
      // if the email  match the regex
      if (isEmailValid) {
         setEmailError("");
      }
      // if the email does not match the regex
      else {
         setEmailError("Veuillez renseigner un email valide");
      }

      const isPasswordValid = passwordRegex.test(password);
      // if the email  match the regex
      if (isPasswordValid) {
         setPasswordError("");
      }
      // if the email does not match the regex
      else {
         setPasswordError("Veuillez renseigner un mot de passe valide");
      }
      return isPseudoValid && isEmailValid && isPasswordValid;
   };

   // function to handle form submit
   const handleSignUp = async (event) => {
      event.preventDefault();
      // console.log("=== data ===>", { pseudo, email, password });
      try {
         // cheching if the form is valid or not
         if (!checkSignUpForm()) {
         } else {
            // call to the API using axios
            const response = await axios({
               method: "post",
               url: `${process.env.REACT_APP_API_URL}auth/signup`,
               withCredentials: true,
               data: { pseudo, email, password },
            });
            // checking the response
            console.log("=== response ===>", response);
            if (response.data.errors) {
               // set pseudo error to the value sent in the response to display it
               setPseudoError(response.data.errors.pseudo);
               // set email error to the value sent in the response to display it
               setEmailError(response.data.errors.email);
               // set password error to the value sent in the response to display it
               setPasswordError(response.data.errors.password);
            } else {
               // the form has been suucessfully submitted
               setSignUpFormSubmit(true);
            }
         }
      } catch (error) {
         console.log(error.message);
      }
   };

   // component to return
   return (
      <AuthForm action="" id="signup-form" onSubmit={handleSignUp}>
         <h3>Formulaire d'inscription</h3>
         <AuthLabel htmlFor="pseudo">Pseudo</AuthLabel>
         <input
            type="text"
            name="pseudo"
            id="pseudo"
            aria-label="pseudo"
            value={pseudo}
            onChange={(event) => setPseudo(event.target.value)}
         />
         {pseudoError && <ErrorMessage>{pseudoError}</ErrorMessage>}
         <AuthLabel htmlFor="email">Email</AuthLabel>
         <input
            type="email"
            name="email"
            id="email"
            aria-label="email adress"
            value={email}
            onChange={(event) => setEmail(event.target.value)}
         />
         {emailError && <ErrorMessage>{emailError}</ErrorMessage>}
         <AuthLabel htmlFor="password">Mot de passe</AuthLabel>
         <input
            type="password"
            name="password"
            id="password"
            aria-label="mot de passe"
            value={password}
            onChange={(event) => setPassword(event.target.value)}
         />
         {passwordError && <ErrorMessage>{passwordError}</ErrorMessage>}
         <AuthSumbitInput type="submit" value="S'inscrire" disabled={false} />
      </AuthForm>
   );
}

// exporting component
export default SignUpForm;
