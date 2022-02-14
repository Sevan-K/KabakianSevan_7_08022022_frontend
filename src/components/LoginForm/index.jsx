/* -------------------------------------- */
/*          Secrtion des imports          */
/* -------------------------------------- */

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

   // function to handle action on submit
   const handleSubmit = async (event) => {
      event.preventDefault();
      console.log("=== email ===>", email);
      // appel à l'API avec axios (post pour le login)
      const response = await axios({
         method: "post",
         url: `${process.env.REACT_APP_API_URL}`,
         withCredentials: true,
         data: { email: email, password: password },
      });
      // on gère les erreurs potentielles dans la réponse

   };

   // component to return
   return (
      <form action="" onSubmit={handleSubmit} id="login-form">
         <p>LogInForm</p>
         <label htmlFor="email">Email</label>
         <input
            type="email"
            id="email"
            name="email"
            value={email}
            onChange={(event) => setEmail(event.target.value)}
         />
         <p className="error email">Erreur sur l'email</p>
         <label htmlFor="password">Mot de passe</label>
         <input
            type="password"
            id="password"
            name="password"
            value={password}
            onChange={(event) => setPassword(event.target.value)}
         />
         <p className="error password">Erreur sur le mot de passe</p>
         <input type="submit" value="Test" />
      </form>
   );
}

// exporting component
export default LogInForm;
