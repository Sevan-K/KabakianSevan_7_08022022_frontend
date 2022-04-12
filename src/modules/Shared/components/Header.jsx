/* -------------------------------------- */
/*          Secrtion des imports          */
/* -------------------------------------- */
// react tools
import { useSelector } from "react-redux";
import { useMediaQuerry, useOnHome, useUserId } from "../../../utils/hooks";

// components
import Logout from "./LogOut";

// assets
import headerLogoBigScreen from "../../../assets/icon-left-font.svg";
import headerLogoSmallScreen from "../../../assets/icon.svg";

// fontawesome icons
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import {
   faHome as faHomeSolid,
   faUser as faUserSolid,
   faRightToBracket,
   faLockOpen,
} from "@fortawesome/free-solid-svg-icons";
// import { faUser as faUserRegular,  } from "@fortawesome/free-regular-svg-icons";

import defaultImage from "../../../assets/profile.png";

// styled components import
import {
   StyledHeader,
   LogoWrapper,
   ProfilLink,
   ImageWrapper,
   LogInLink,
   NavBar,
   NavLink,
} from "../styledComponents";

/* --------------------------------------------- */
/*          Components creation section          */
/* --------------------------------------------- */
// Header component function
function Header() {
   // userId is required from its hook
   const { userId } = useUserId();
   // logged in user is required from the store
   const user = useSelector((state) => state.userReducer);

   // local state to know if we are on home page or not
   // const [onHome, updateOnHome] = useState(true);
   const { onHome, updateOnHome } = useOnHome();

   // constant for small screens mediaquerry
   const matchesSmall = useMediaQuerry("(max-width: 475px)");
   // console.log("=== matches ===>", matchesSmall);

   // constant for small screens mediaquerry
   const matchesBig = useMediaQuerry("(min-width: 1000px)");

   // component to return
   return (
      <StyledHeader matchesBig={matchesBig} matchesSmall={matchesSmall}>
         {/* -------------- Groupomania logo -------------- */}
         <LogoWrapper matchesSmall={matchesSmall} matchesBig={matchesBig}>
            <img
               src={matchesSmall ? headerLogoSmallScreen : headerLogoBigScreen}
               alt="Logo groupomania"
            />
         </LogoWrapper>
         {userId ? (
            /* -------------- Components if a user is connected -------------- */
            <>
               {/* -------------- Link to user profile (with name and image) -------------- */}
               <ProfilLink to="/profile" onClick={() => updateOnHome(false)}>
                  <ImageWrapper>
                     <img
                        src={user.imageUrl || defaultImage}
                        alt="Profil de l'utilisateur"
                     />
                  </ImageWrapper>
                  <p>
                     {!matchesSmall && <span>Bienvenue</span>} {user.pseudo}
                     {user.admin === true && (
                        <span className="icon">
                           <FontAwesomeIcon icon={faLockOpen} />
                        </span>
                     )}
                  </p>
               </ProfilLink>
               {/* -------------- Log out button -------------- */}
               <Logout />
            </>
         ) : (
            /* -------------- Log in link if no user is connected -------------- */
            <LogInLink to="/profile" onClick={() => updateOnHome(false)}>
               <FontAwesomeIcon icon={faRightToBracket} />
            </LogInLink>
         )}
         {/* -------------- Navigation bar -------------- */}
         <NavBar matchesBig={matchesBig}>
            <NavLink
               to="/"
               onClick={() => {
                  updateOnHome(true);
               }}
               $isConcerned={onHome}
            >
               <FontAwesomeIcon icon={faHomeSolid} />
            </NavLink>
            <NavLink
               to="/profile"
               onClick={() => {
                  updateOnHome(false);
               }}
               $isConcerned={!onHome}
            >
               <FontAwesomeIcon icon={faUserSolid} />
            </NavLink>
         </NavBar>
      </StyledHeader>
   );
}

// exporting component
export default Header;
