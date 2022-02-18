/* -------------------------------------- */
/*          Secrtion des imports          */
/* -------------------------------------- */
import { Link } from "react-router-dom";
import styled from "styled-components";
import headerLogo from "../../assets/icon-left-font.svg";
import axios from "axios";
import { useUserId } from "../../utils/hooks";

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
   const { userId } = useUserId();
   const handleLogOut = async () => {
      try {
         await axios({
            method: "GET",
            url: `${process.env.REACT_APP_API_URL}auth/logout`,
            withCredentials: true,
         });

         window.location = "/";
      } catch (err) {
         console.log(err.message);
      }
   };
   return (
      <StyledHeader>
         <ImageWrapper>
            <img src={headerLogo} alt="Logo groupomania" />
         </ImageWrapper>
         <button onClick={handleLogOut}>Log Out</button>
         <LinkWrapper>
            <Link to="/">Accueil</Link>
            <Link to="/profile">Profil</Link>
         </LinkWrapper>
         {userId && <p>Salut {userId} ?</p>}
      </StyledHeader>
   );
}

// exporting component
export default Header;
