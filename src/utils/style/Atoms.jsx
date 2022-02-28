/* -------------------------------------- */
/*          Secrtion des imports          */
/* -------------------------------------- */
import styled from "styled-components";
import { colors } from "./variables";

/* ----------------------------------------------- */
/*          Section des styles à exporter          */
/* ----------------------------------------------- */
// styled component for image wrapper on profile components (data and form)
export const ProfileImageWrapper = styled.p`
   width: 10%;
`;


// styled component for the log in link
export const IconButton = styled.button`
   padding: 1rem;
   font-size: 2.1rem;
   background: none;
   color: ${colors.unactiveLink};
   &:hover {
      color: ${colors.primary};
   }
`;