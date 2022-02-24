/* --------------------------------- */
/*          Imports section          */
/* --------------------------------- */

import { useState } from "react";
import axios from "axios";

/* ------------------------------------------- */
/*          Styled components section          */
/* ------------------------------------------- */

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

   // getting userId from its hook

   // function to handle action on submit
   const handleLogIn = async (event) => {
      event.preventDefault();
      // appel à l'API avec axios (post pour le login)
      try {
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
            // go to home page
            window.location = "/";
         }
      } catch (error) {
         console.log(error.message);
      }
   };

   // component to return
   return (
      <form action="" onSubmit={handleLogIn} id="login-form">
         <p>LogInForm</p>
         <label htmlFor="email">Email</label>
         <input
            type="email"
            id="email"
            name="email"
            value={email}
            onChange={(event) => setEmail(event.target.value)}
         />
         {emailError && <p>{emailError}</p>}
         <label htmlFor="password">Mot de passe</label>
         <input
            type="password"
            id="password"
            name="password"
            value={password}
            onChange={(event) => setPassword(event.target.value)}
         />
         {passwordError && <p>{passwordError}</p>}
         <input type="submit" value="Test" />
      </form>
   );
}

// exporting component
export default LogInForm;
