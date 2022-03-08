/* -------------------------------------- */
/*          Secrtion des imports          */
/* -------------------------------------- */
// react tools
import { useSelector } from "react-redux";
import { Link } from "react-router-dom";
import styled from "styled-components";
import { useMediaQuerry, useOnHome, useUserId } from "../../utils/hooks";
import { useState } from "react";

// components
import Logout from "./LogOut";

// assets
import headerLogoBigScreen from "../../assets/icon-left-font.svg";
import headerLogoSmallScreen from "../../assets/icon.svg";

// style variables
import { colors, padding } from "../../utils/style/variables";

import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import {
   faHome as faHomeSolid,
   faUser as faUserSolid,
   faRightToBracket,
} from "@fortawesome/free-solid-svg-icons";
// import { faUser as faUserRegular,  } from "@fortawesome/free-regular-svg-icons";

import defaultImage from "../../assets/profile.png";

/* ------------------------------------------- */
/*          Styled components section          */
/* ------------------------------------------- */
// styled component for the header
const StyledHeader = styled.header`
   padding: ${({ matchesSmall }) =>
      matchesSmall ? "1rem 1rem 0 1rem" : "2rem 2rem 0 2rem"};
   display: flex;
   flex-flow: row wrap;
   // flex-direction: column;
   // style for the fixed header
   position: fixed;
   right: 0;
   left: 0;
   top: 0;
   z-index: 1;
   background-color: white;
   justify-content: flex-end;
   align-items: center;
   border-bottom: ${({ matchesBig }) =>
      matchesBig ? "0.1rem solid #a4b0be" : "none"};
   & button {
      order: 4;
   }
`;

// styled component for the upper raw
const UpperRaw = styled.div`
   display: flex;
   justify-content: flex-end;
   align-items: center;
`;

// styled component for the <p> where the image is
const LogoWrapper = styled.p`
   margin-right: auto;
   align-self: center;
   width: 40%;
   max-width: 25rem;
   height: ${({ matchesSmall }) => (matchesSmall ? "5rem" : "7rem")};
   ${({ matchesSmall }) => matchesSmall && "width: 5rem"};
   order: 1;
`;

// styled component for the profile in link
const ProfilLink = styled(Link)`
   display: flex;
   flex-direction: row;
   padding: 1rem;
   align-items: center;
   justify-content: space-evenly;
   border-radius: 3rem;
   color: ${colors.unactiveLink};
   font-weight: bold;
   font-size: clamp(1.2rem, 1rem + 1vw, 1.5rem);
   // line-height:
   order: 3;
   &:hover {
      box-shadow: 0.25rem 0.25rem 0.5rem ${colors.unactiveLink};
      background-color: ${colors.backgroundLight};
   }
`;

// styled component for the <p> where the image is
const ImageWrapper = styled.p`
   align-self: center;
   width: 8vw;
   max-width: 3.5rem;
   height: 8vw;
   max-height: 3.5rem;
   border-radius: 5vw;
   overflow: hidden;
   margin-right: ${padding.icons};
`;

// styled component for the log in link
const LogInLink = styled(Link)`
   padding: 1rem;
   font-size: 2.1rem;
   background: none;
   color: ${colors.unactiveLink};
   order: 3;
   &:hover {
      color: ${colors.primary};
   }
`;

// styled component for navigator
const NavBar = styled.nav`
   // flex: 1 1 ${({ matchesBig }) => (matchesBig ? "40%" : "100%")};
   width: ${({ matchesBig }) => (matchesBig ? "40%" : "100%")};
   margin: 0 auto;
   display: flex;
   justify-content: space-evenly;
   align-items: center;
   border-bottom: ${({ matchesBig }) =>
      matchesBig ? "non" : "0.1rem solid #a4b0be"};
   order: ${({ matchesBig }) => (matchesBig ? "2" : "5")};
   // ${({ matchesBig }) => matchesBig && "line-height: 6rem"};
   line-height: ${({ matchesBig }) => (matchesBig ? "6rem" : "3rem")};
`;

// styled component for the nav in link
const NavLink = styled(Link)`
   font-size: 2.1rem;
   color: ${({ $isConcerned }) =>
      $isConcerned ? colors.primary : colors.unactiveLink};
   border-bottom: 0.2rem solid
      ${({ $isConcerned }) => ($isConcerned ? colors.primary : "transparent")};
   flex: 1;
   text-align: center;
   padding: 0.5rem;
   transition: 300ms ease-out;
   &:hover {
      color: ${colors.primary};
   }
`;

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
   const matchesSmall = useMediaQuerry("(max-width: 450px)");
   // console.log("=== matches ===>", matchesSmall);

   // constant for small screens mediaquerry
   const matchesBig = useMediaQuerry("(min-width: 1000px)");

   // component to return
   return (
      <StyledHeader matchesBig={matchesBig} matchesSmall={matchesSmall} >
         {/* <UpperRaw> */}
         <LogoWrapper matchesSmall={matchesSmall}>
            <img
               src={matchesSmall ? headerLogoSmallScreen : headerLogoBigScreen}
               alt="Logo groupomania"
            />
         </LogoWrapper>
         {userId ? (
            <>
               <ProfilLink to="/profile" onClick={() => updateOnHome(false)}>
                  <ImageWrapper>
                     <img
                        src={user.imageUrl || defaultImage}
                        alt="Profil de l'utilisateur"
                     />
                  </ImageWrapper>
                  <p>Bienvenue {user.pseudo}</p>
               </ProfilLink>
               <Logout />
            </>
         ) : (
            <LogInLink to="/profile" onClick={() => updateOnHome(false)}>
               <FontAwesomeIcon icon={faRightToBracket} />
            </LogInLink>
         )}
         {/* </UpperRaw> */}
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
