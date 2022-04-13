/* --------------------------------- */
/*          Imports Section          */
/* --------------------------------- */
import styled from "styled-components";
import { Link } from "react-router-dom";
import { colors, padding } from "../../../../utils/style/variables";

/* ------------------------------------------------------------ */
/*         Comment component styled components section          */
/* ------------------------------------------------------------ */
// styled component for round user  image wrapper
export const SmallUserImageWrapper = styled(Link)`
   width: 8vw;
   max-width: 4rem;
   height: 8vw;
   max-height: 4rem;
   border-radius: 5vw;
   overflow: hidden;
   margin-right: ${padding.icons};
`;

// styled component for comment container
export const CommentContainer = styled.li`
   display: grid;
   grid-template-columns: ${({ matchesMedium }) =>
      matchesMedium
         ? "calc(10vw + 1rem) 1fr repeat(2, 8%)"
         : "calc(6rem) 1fr repeat(2, 3.7rem)"};
   grid-template-areas:
      "img comment edit delete"
      "img date edit delete";
   margin-bottom: 0.7rem;
   & a {
      grid-area: img;
   }
   & p:nth-child(2) {
      grid-area: pseudo;
   }
   & > button {
      &:first-of-type {
         grid-area: edit;
      }
      &:last-of-type {
         grid-area: delete;
      }
   }
`;

// styled component for comment PseudoContentWrapper
export const PseudoContentWrapper = styled.div`
   grid-area: comment;
   background-color: ${({ isAuthorConnected }) =>
      isAuthorConnected ? colors.ownCommentBg : colors.backgroundLight};
   padding: ${padding.comment};
   border-radius: 1rem;
   border-top-left-radius: 0;
`;

// styled component for comment content
export const CommentContent = styled.p`
   font-size: 1.3rem;
`;