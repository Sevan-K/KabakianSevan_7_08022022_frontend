/* --------------------------------- */
/*          Imports section          */
/* --------------------------------- */
import { useState } from "react";
import axios from "axios";
import { AuthForm, AuthLabel } from "../styledComponents";
import { ErrorMessage, AuthSumbitInput } from "../../Shared/styledComponents";

/* ------------------------------------------- */
/*          Styled components section          */
/* ------------------------------------------- */
// all styled component are imported from atoms

/* --------------------------------------------- */
/*          Components creation section          */
/* --------------------------------------------- */
// Authentification component function
function LogInForm() {
   // email and password state are declared
   const [email, setEmail] = useState("");
   const [password, setPassword] = useState("");

   // error message local states
   const [emailError, setEmailError] = useState("");
   const [passwordError, setPasswordError] = useState("");

   // local state to display an eventual sign in error
   const [LogInError, setLogInError] = useState("");

   // function to update form status
   const checkLogInForm = () => {
      // regex for email
      const emailRegex = /^[\w-.]+@([\w-]+\.)+[\w-]{2,4}$/g;

      const isEmailValid = emailRegex.test(email);
      // if the email  match the regex
      if (isEmailValid) {
         setEmailError("");
      }
      // if the email does not match the regex
      else {
         setEmailError("Veuillez renseigner un email valide !");
      }

      const isPasswordValid = password !== "";
      // if the email  match the regex
      if (isPasswordValid) {
         setPasswordError("");
      }
      // if the email does not match the regex
      else {
         setPasswordError("Veuillez renseigner un mot de passe !");
      }
      return isEmailValid && isPasswordValid;
   };

   // function to handle action on submit
   const handleLogIn = async (event) => {
      event.preventDefault();
      // reset LogIn Error
      setLogInError("");

      // appel à l'API avec axios (post pour le login)
      try {
         // cheching if the form is valid or not
         if (!checkLogInForm()) {
         } else {
            const response = await axios({
               method: "post",
               url: `${process.env.REACT_APP_API_URL}auth/login`,
               withCredentials: true,
               data: { email, password },
            });
            // console.log("=== response ===>", response);
            // code to handle potential errors
            if (response.data.errors) {
               // !!!!!!!! check how the errors are send by the back
               // console.log(response.data.errors);
               setEmailError(response.data.errors.email);
               setPasswordError(response.data.errors.password);
            }
            // if there is no error then we go to home page
            else {
               // there is no error
               setLogInError("");
               // go to home page
               window.location = "/";
            }
         }
      } catch (error) {
         console.log(error.message);
         setLogInError("Adresse mail ou mot de passe incorrect. Try again 😉");
      }
   };

   // component to return
   return (
      <AuthForm action="" onSubmit={handleLogIn} id="login-form">
         <h3>Formulaire de connexion</h3>
         <AuthLabel htmlFor="email">Email</AuthLabel>
         <input
            type="email"
            id="email"
            name="email"
            value={email}
            onChange={(event) => setEmail(event.target.value)}
         />
         {emailError && <ErrorMessage>{emailError}</ErrorMessage>}
         <AuthLabel htmlFor="password">Mot de passe</AuthLabel>
         <input
            type="password"
            id="password"
            name="password"
            value={password}
            onChange={(event) => setPassword(event.target.value)}
         />
         {passwordError && <ErrorMessage>{passwordError}</ErrorMessage>}
         <AuthSumbitInput type="submit" value="Se connecter" />
         {LogInError && <ErrorMessage>{LogInError}</ErrorMessage>}
      </AuthForm>
   );
}

// exporting component
export default LogInForm;
