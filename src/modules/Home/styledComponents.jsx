/* --------------------------------- */
/*          Imports Section          */
/* --------------------------------- */
import styled from "styled-components";
import { Link } from "react-router-dom";
import { colors, mainSize, padding } from "../../utils/style/variables";

/* ------------------------------------------------------------- */
/*         Home module shared styled components section          */
/* ------------------------------------------------------------- */
// styled component for round user  image wrapper
export const UserImageWrapper = styled(Link)`
   width: 10vw;
   max-width: 6rem;
   height: 10vw;
   max-height: 6rem;
   border-radius: 5vw;
   overflow: hidden;
   margin-right: ${padding.icons};
`;

/* --------------------------------------------------------- */
/*         Home component styled components section          */
/* --------------------------------------------------------- */
// styled component for home page main component
export const HomeMain = styled.main`
   max-width: 60rem;
   margin: auto;
   width: ${({ matchesSmall }) =>
      matchesSmall ? mainSize.smallscreen : mainSize.regular};
`;


/* ---------------------------------------------------------------- */
/*         Post component shared styled components section          */
/* ---------------------------------------------------------------- */
// styled component for the textarea of the form to edit comment content
export const PostStyledTextArea = styled.textarea`
   flex: 1;
   border: none;
   background: transparent;
   font-size: 1.3rem;
`;

// styled component for pseudo in post an comment cards
export const PseudoText = styled.p`
   font-weight: bold;
   color: ${colors.darkUnactiveLink};
`;

// styled component for date in post an comment cards
export const DateText = styled.p`
   grid-area: date;
   color: ${({ color }) => (color ? color : colors.unactiveLink)};
   font-style: italic;
   font-size: 1.2rem;
`;

// styled component for the form to edit comment content
export const EditContentForm = styled.form`
   display: flex;
   align-items: center;
`;