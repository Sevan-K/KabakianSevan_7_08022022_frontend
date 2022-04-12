/* --------------------------------- */
/*          Imports Section          */
/* --------------------------------- */
import styled from "styled-components";
import { colors, mainSize } from "../../../utils/style/variables";

/* ---------------------------------------------------------------- */
/*         Profile module shared styled components section          */
/* ---------------------------------------------------------------- */
// styled component for image wrapper on profile components (data and form)
export const ProfileImageWrapper = styled.p`
   border-radius: 50%;
   overflow: hidden;
   width: 17rem;
   height: 17rem;
   border: 0.2rem solid ${colors.darkUnactiveLink};
   // box-shadow: 0.25rem 0.25rem 0.5rem darkgrey;
`;

// styled component for articles on profile components
export const ProfileArticles = styled.article`
   // background-color: white;
   // padding: 2rem;
   // margin: 1.5rem 0;
   // border-radius: 1rem;
   // box-shadow: 0.25rem 0.25rem 0.5rem darkgrey;
   width: 100%;
   display: flex;
   flex-direction: column;
   align-items: center;
   & h3 {
      margin: 1rem 0;
   }
`;

// styled component for div wrapper on profile components
export const ProfileWrapper = styled.div`
   background-color: white;
   padding: 2rem;
   border-radius: 1rem;
   box-shadow: 0.25rem 0.25rem 0.5rem ${colors.unactiveLink};
   margin: 1.5rem 0;
   display: flex;
   flex-direction: column;
   align-items: center;
`;

/* ------------------------------------------------------------ */
/*         Profile component styled components section          */
/* ------------------------------------------------------------ */
// styled component for the main element
export const MainProfileData = styled.main`
   width: ${({ matchesSmall }) =>
      matchesSmall ? mainSize.smallscreen : mainSize.regular};
   max-width: 50rem;
   margin: auto;
   padding: 3rem;
   background-color: ${colors.backgroundLight};
   border-radius: 1.5rem;
`;

export const ProfileDataHeader = styled.header`
   display: flex;
   align-items: center;
   justify-content: end;
   & > h2 {
      margin-right: auto;
      color: ${colors.darkUnactiveLink};
      font-size: 2rem;
   }
`;

// styled component for date in post an comment cards
export const DateText = styled.p`
   color: ${colors.darkUnactiveLink};
   font-style: italic;
   font-size: 1.3rem;
`;

/* ---------------------------------------------------------------- */
/*         ProfileForm component styled components section          */
/* ---------------------------------------------------------------- */
// styled component : label to change picture
export const ChangeUserPicLabel = styled.label`
   background-color: ${colors.darkUnactiveLink};
   position: relative;
   bottom: 3.5rem;
   left: 6rem;
   color: white;
   width: 2.75rem;
   height: 2.75rem;
   border-radius: 2.75rem;
   display: flex;
   justify-content: center;
   align-items: center;
   transition: 300ms;
   &:hover {
      background-color: ${colors.primary};
      // & ~ p {
      //    border: 0.1rem solid red;
      // }
   }
`;

// styled component : text area to change description
export const StyledTextArea = styled.textarea`
   font-size: 1.3rem;
   width: 100%;
   max-width: 40rem;
   color: ${colors.darkUnactiveLink};
`;

/* ---------------------------------------------------------------- */
/*         ProfileData component styled components section          */
/* ---------------------------------------------------------------- */
export const StyledText = styled.p`
   font-size: 1.3rem;
   color: ${colors.darkUnactiveLink};
`;