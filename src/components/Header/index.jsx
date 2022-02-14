/* -------------------------------------- */
/*          Secrtion des imports          */
/* -------------------------------------- */
import { Link } from "react-router-dom";
import styled from "styled-components";
import headerLogo from "../../assets/icon-left-font.svg";

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

// styled component for navigator
const LinkWrapper = styled.nav`
   display: flex;
   justify-content: space-evenly;
`;

// styled component for the <p> where the image is
const ImageWrapper = styled.p`
   align-self: center;
   width: 80%;
   height: 10rem;
`;

/* --------------------------------------------- */
/*          Components creation section          */
/* --------------------------------------------- */
// Header component function
function Header() {
   return (
      <StyledHeader>
         <ImageWrapper>
            <img src={headerLogo} alt="Logo groupomania" />
         </ImageWrapper>
         <LinkWrapper>
            <Link to="/">Accueil</Link>
            <Link to="/profile">Profil</Link>
            <p>Log Out</p>
         </LinkWrapper>
      </StyledHeader>
   );
}

// exporting component
export default Header;
