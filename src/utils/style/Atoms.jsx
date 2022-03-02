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
