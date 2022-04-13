/* --------------------------------- */
/*          Imports Section          */
/* --------------------------------- */
import styled from "styled-components";
import { colors, padding } from "../../../../utils/style/variables";

/* ---------------------------------------------------------- */
/*          Post component styled components section          */
/* ---------------------------------------------------------- */

// styled component for post container
export const PostLiContainer = styled.li`
   // border: 0.2rem solid ${colors.backgroundLight};
   box-shadow: 0.1rem 0.1rem 0.5rem ${colors.unactiveLink};
   width: 100%;
   overflow: hidden;
   margin: 1.5rem auto;
   // padding: 1rem 0;
   border-radius: 1rem;
   & button {
      font-size: 1.5rem;
   }
`;

// styled component for post header
export const PostHeader = styled.header`
   background-color: ${colors.backgroundLight};
   padding: ${padding.icons};
   display: grid;
   grid-template-columns: ${({ matchesMedium }) =>
      matchesMedium
         ? "calc(10vw + 1rem) 1fr repeat(2, 8%)"
         : "7rem 1fr repeat(2, 3.7rem)"};
   grid-template-areas:
      "img pseudo edit delete"
      "img date edit delete";
   & > a {
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

// styled component for post content
export const PostContent = styled.p`
   padding: ${padding.icons};
   font-size: 1.3rem;
`;

// styled component for the middletoolbar
export const MiddleToolBar = styled.div`
   display: flex;
   flex-direction: row;
   align-items: center;
   margin: 0 ${padding.icons};
   ${({ areCommentsShown }) =>
      areCommentsShown &&
      `
      border-bottom: 0.1rem solid ${colors.unactiveLink} ;
      `}
   & p {
      font-size: 1.2rem;
      font-weight: bold;
      color: ${colors.darkUnactiveLink};
      margin-right: 1rem;
   }
   & button:last-of-type {
      margin-left: auto;
   }
`;

// styled component for the comment wrapper
export const CommentsWrapper = styled.div`
   padding: 2rem 1rem;
`;
