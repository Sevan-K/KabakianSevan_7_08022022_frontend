/* --------------------------------- */
/*          Imports Section          */
/* --------------------------------- */
import styled from "styled-components";
import { colors } from "../../../utils/style/variables";

/* ------------------------------------------------- */
/*         Header Styled components section          */
/* ------------------------------------------------- */

/* ------------------------------------------------- */
/*         Shared Styled components section          */
/* ------------------------------------------------- */
// styled component for forms' error messages
export const ErrorMessage = styled.p`
   color: ${colors.error};
   font-size: 1.2rem;
`;