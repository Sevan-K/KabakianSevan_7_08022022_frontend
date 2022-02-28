/* -------------------------------------- */
/*          Secrtion des imports          */
/* -------------------------------------- */
import { useSelector } from "react-redux";
import { Link } from "react-router-dom";
import styled from "styled-components";
import headerLogo from "../../assets/icon-left-font.svg";
import { useUserId } from "../../utils/hooks";
import Logout from "./LogOut";

import logInSvg from "../../assets/right-to-bracket-solid.svg";

import { colors } from "../../utils/style/colors";

import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import {
   faHome as faHomeSolid,
   faUser as faUserSolid,
} from "@fortawesome/free-solid-svg-icons";
import { useEffect, useState } from "react";
// import { faUser as faUserRegular,  } from "@fortawesome/free-regular-svg-icons";

/* ------------------------------------------- */
/*          Styled components section          */
/* ------------------------------------------- */
// styled component for the header
const StyledHeader = styled.header`
   // border-bottom: 0.2rem solid black;
   padding: 1rem;
   margin-bottom: 1rem;
   display: flex;
   flex-direction: column;
`;

// styled component for the upper raw
const UpperRaw = styled.div`
   display: flex;
   justify-content: flex-end;
   align-items: center;
`;

// styled component for navigator
const NavBar = styled.nav`
   display: flex;
   justify-content: space-evenly;
   border-bottom: 0.1rem solid #a4b0be;
`;

// styled component for the nav in link
const NavLink = styled(Link)`
   font-size: 2.1rem;
   color: ${({ active }) =>
      active === "true" ? colors.primary : colors.unactiveLink};
   border-bottom: 0.2rem solid
      ${({ active }) => (active === "true" ? colors.primary : "transparent")};
   flex: 1;
   text-align: center;
   padding: 0.5rem;
`;

// styled component for the <p> where the image is
const ImageWrapper = styled.p`
   margin-right: auto;
   align-self: center;
   width: 40%;
   max-width: 50rem;
   height: 7rem;
`;

// styled component for the log in link
const LogInLink = styled(Link)`
   margin: 1rem;
   width: 2rem;
   opacity: 0.5;
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

   const [onHome, setOnHome] = useState(true);

   useEffect(() => {
      // const urlText = window.location.href;
      // const actualUrl = new URL(urlText);
      // console.log("=== url ===>", actualUrl);
      console.log("=== onHome ===>", onHome);
   }, [onHome]);

   return (
      <StyledHeader>
         <UpperRaw>
            <ImageWrapper>
               <img src={headerLogo} alt="Logo groupomania" />
            </ImageWrapper>
            {userId ? (
               <>
                  <p>Bienvenue {user.pseudo}</p>
                  <Logout />
               </>
            ) : (
               <LogInLink to="/profile">
                  <img
                     src={logInSvg}
                     alt="Flèche vert la droite et l'intérieur pour se connecter"
                  />
                  {/* <FontAwesomeIcon icon={faStar} />{" "} */}
               </LogInLink>
            )}
         </UpperRaw>
         <NavBar className="dev">
            <NavLink
               to="/"
               onClick={() => {
                  setOnHome(true);
               }}
               active={onHome ? "true" : "false"}
            >
               <FontAwesomeIcon icon={faHomeSolid} />
            </NavLink>
            <NavLink
               to="/profile"
               onClick={() => {
                  setOnHome(false);
               }}
               active={onHome ? "false" : "true"}
            >
               <FontAwesomeIcon icon={faUserSolid} />
            </NavLink>
         </NavBar>
      </StyledHeader>
   );
}

// exporting component
export default Header;
