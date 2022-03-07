/* -------------------------------------- */
/*          Secrtion des imports          */
/* -------------------------------------- */
import { Link } from "react-router-dom";
import styled from "styled-components";
import { colors, padding } from "./variables";

/* ----------------------------------------------- */
/*          Section des styles à exporter          */
/* ----------------------------------------------- */

/* -------------------- UserProfile -------------------- */
// styled component for page h1
export const PageTitle = styled.h1`
   color: ${colors.unactiveLink};
   margin-bottom: 1rem;
   padding: ${padding.icons};
   text-align: center;
   font-size: 2.5rem;
`;

// styled component for image wrapper on profile components (data and form)
export const ProfileImageWrapper = styled.p`
   border-radius: 50%;
   overflow: hidden;
   width: 17rem;
   height: 17rem;
   border: 0.2rem solid ${colors.darkUnactiveLink};
   // box-shadow: 0.25rem 0.25rem 0.5rem darkgrey;
`;

// styled component for articles on userprofile components
export const UserProfileArticles = styled.article`
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

// styled component for div wrapper on userprofile components
export const UserProfileWrapper = styled.div`
   background-color: white;
   padding: 2rem;
   border-radius: 1rem;
   box-shadow: 0.25rem 0.25rem 0.5rem ${colors.unactiveLink};
   margin: 1.5rem 0;
   display: flex;
   flex-direction: column;
   align-items: center;
`;

// styled component for the log in link
export const IconButton = styled.button`
   padding: ${padding.icons};
   font-size: 2.1rem;
   background: none;
   color: ${({ color }) => (color ? color : colors.unactiveLink)};
   transition: 300ms;
   &:hover {
      color: ${colors.primary};
   }
`;

// styled component for round user  image wrapper
export const UserImageWrapper = styled(Link)`
   width: 10vw;
   max-width: 7rem;
   height: 10vw;
   max-height: 7rem;
   border-radius: 5vw;
   overflow: hidden;
   margin-right: ${padding.icons};
`;

// styled component for round user  image wrapper
export const SmallUserImageWrapper = styled(Link)`
   width: 8vw;
   max-width: 7rem;
   height: 8vw;
   max-height: 7rem;
   border-radius: 5vw;
   overflow: hidden;
   margin-right: ${padding.icons};
`;

// styled component for pseudo in post an comment cards
export const PseudoText = styled.p`
   font-weight: bold;
   color: ${colors.darkUnactiveLink};
`;

// styled component for date in post an comment cards
export const DateText = styled.p`
   grid-area: date;
   color: ${colors.unactiveLink};
   font-style: italic;
   font-size: 1.2rem;
`;

// styled component fo the submit input on authentication forms
export const AuthForm = styled.form`
   background-color: white;
   display: flex;
   flex-direction: column;
   align-items: center;
   border-radius: 1.5rem;
   padding: 2rem;
   box-shadow: 0.1rem 0.1rem 0.5rem lightgray;
   margin-top: 2rem;
   & h3 {
      margin: 1rem 0;
   }
`;

// styled component fo the submit input on authentication forms
export const AuthSumbitInput = styled.input`
   background-color: ${colors.backgroundLight};
   border: none;
   border-radius: 1rem;
   padding: 1rem 2rem;
   margin: 2rem 0;
   font-weight: bold;
   transition: all 300ms;
   &:hover {
      box-shadow: 0.25rem 0.25rem 0.5rem ${colors.unactiveLink};
      background-color: ${colors.primary};
      color: white;
   }
`;

// styled component fo the label on authentication forms
export const AuthLabel = styled.label`
   color: ${colors.darkUnactiveLink};
   padding: 0.5rem;
   font-style: italic;
   margin-top: 1rem;
`;

export const ErrorMessage = styled.p`
   color: ${colors.error};
   font-size: 1.2rem;
`;
