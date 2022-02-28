/* -------------------------------------- */
/*          Secrtion des imports          */
/* -------------------------------------- */
// react tools
import { useSelector } from "react-redux";
import { Link } from "react-router-dom";
import styled from "styled-components";
import { useUserId } from "../../utils/hooks";
import { useState } from "react";

// components
import Logout from "./LogOut";

// assets
import headerLogo from "../../assets/icon-left-font.svg";
import logInSvg from "../../assets/right-to-bracket-solid.svg";

// style variables
import { colors } from "../../utils/style/colors";

import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import {
   faHome as faHomeSolid,
   faUser as faUserSolid,
   faRightToBracket,
} from "@fortawesome/free-solid-svg-icons";
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

// styled component for the <p> where the image is
const LogoWrapper = styled.p`
   margin-right: auto;
   align-self: center;
   width: 40%;
   max-width: 50rem;
   height: 7rem;
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
   &:hover {
      box-shadow: 0.25rem 0.25rem 0.5rem ${colors.unactiveLink};
   }
`;

// styled component for the <p> where the image is
const ImageWrapper = styled.p`
   align-self: center;
   width: 20%;
   max-width: 10rem;
`;

// styled component for the log in link
const LogInLink = styled(Link)`
   padding: 1rem;
   font-size: 2.1rem;
   background: none;
   color: ${colors.unactiveLink};
   &:hover {
      color: ${colors.primary};
   }
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
   const [onHome, setOnHome] = useState(true);

   // component to return
   return (
      <StyledHeader>
         <UpperRaw>
            <LogoWrapper>
               <img src={headerLogo} alt="Logo groupomania" />
            </LogoWrapper>
            {userId ? (
               <>
                  <ProfilLink to="/profile" onClick={() => setOnHome(false)}>
                     <ImageWrapper>
                        <img
                           src={user.imageUrl}
                           alt="Profil de l'utilisateur"
                        />
                     </ImageWrapper>
                     <p>Bienvenue {user.pseudo}</p>
                  </ProfilLink>
                  <Logout />
               </>
            ) : (
               <LogInLink to="/profile" onClick={() => setOnHome(false)}>
                  <FontAwesomeIcon icon={faRightToBracket} />
               </LogInLink>
            )}
         </UpperRaw>
         <NavBar>
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
