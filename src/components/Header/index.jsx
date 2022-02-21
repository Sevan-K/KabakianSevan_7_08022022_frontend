/* -------------------------------------- */
/*          Secrtion des imports          */
/* -------------------------------------- */
import { useSelector } from "react-redux";
import { Link } from "react-router-dom";
import styled from "styled-components";
import headerLogo from "../../assets/icon-left-font.svg";
import { useUserId } from "../../utils/hooks";
import Logout from "./Logout";

/* ------------------------------------------- */
/*          Styled components section          */
/* ------------------------------------------- */
// styled component for the header
const StyledHeader = styled.header`
   border-bottom: 0.2rem solid black;
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
const LinkWrapper = styled.nav`
   display: flex;
   justify-content: space-evenly;
`;

// styled component for the <p> where the image is
const ImageWrapper = styled.p`
   margin-right: auto;
   align-self: center;
   width: 50%;
   height: 10rem;
`;

/* --------------------------------------------- */
/*          Components creation section          */
/* --------------------------------------------- */
// Header component function
function Header() {
   const { userId } = useUserId();
   const user = useSelector((state) => state.userReducer);
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
               <Link to="/profile">Connection</Link>
            )}
         </UpperRaw>
         <LinkWrapper>
            <Link to="/">Accueil</Link>
            <Link to="/profile">Profil</Link>
         </LinkWrapper>
      </StyledHeader>
   );
}

// exporting component
export default Header;
