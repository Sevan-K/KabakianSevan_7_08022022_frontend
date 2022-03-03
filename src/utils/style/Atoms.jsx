/* -------------------------------------- */
/*          Secrtion des imports          */
/* -------------------------------------- */
import styled from "styled-components";
import { colors, padding } from "./variables";

/* ----------------------------------------------- */
/*          Section des styles à exporter          */
/* ----------------------------------------------- */
// styled component for image wrapper on profile components (data and form)
export const ProfileImageWrapper = styled.p`
   width: 10%;
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
export const UserImageWrapper = styled.p`
   width: 10vw;
   max-width: 7rem;
   height: 10vw;
   max-height: 7rem;
   border-radius: 5vw;
   overflow: hidden;
   margin-right: ${padding.icons};
`;

// styled component for round user  image wrapper
export const SmallUserImageWrapper = styled.p`
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
   color: gray;
   font-style: italic;
   font-size: 1.2rem;
`;
