/* -------------------------------------- */
/*          Secrtion des imports          */
/* -------------------------------------- */
import { Link } from "react-router-dom";
import headerLogo from "../../assets/icon-above-font.png";

/* --------------------------------------------- */
/*          Components creation section          */
/* --------------------------------------------- */
// component function
function Header() {
   return (
      <header>
         <p>
            <img src={headerLogo} alt="Logo groupomania" />
         </p>
         <nav>
            <Link to="/">Accueil</Link>
            <Link to="/profile">Profil</Link>
         </nav>
         <p>Log Out</p>
      </header>
   );
}

// exporting component
export default Header;
