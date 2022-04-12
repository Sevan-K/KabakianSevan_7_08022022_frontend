/* --------------------------------- */
/*          Imports Section          */
/* --------------------------------- */
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import {
   faSpinner,
   faFileImage,
   faPaperPlane,
   faCircleArrowLeft,
} from "@fortawesome/free-solid-svg-icons";
import { useDispatch, useSelector } from "react-redux";
import { useEffect, useState } from "react";
import { addPost, getAllPosts } from "../../../actions/post.actions";
import styled from "styled-components";
import { colors, padding } from "../../../utils/style/variables";
import defaultProfileImage from "../../../assets/profile.png";
import {
   UserImageWrapper,
} from "../../../utils/style/Atoms";
import {ErrorMessage, IconButton} from "../../Shared/styledComponents";

import { useOnHome } from "../../../utils/hooks";

/* ------------------------------------------- */
/*          Styled components section          */
/* ------------------------------------------- */
// styled component for the form wrapper
const NewPostFormWrapper = styled.div`
   padding: 2rem;
   width: 100%;
   margin: 0 auto 3rem;
   border-radius: 2rem;
   border-bottom-left-radius: 0;
   // border-top-right-radius: 0;
   display: flex;
   flex-direction: column;
   align-items: center;
   background-color: ${colors.backgroundLight};
   box-shadow: 0.15rem 0.15rem 0.3rem ${colors.unactiveLink};

   transition: 200ms;
   &:focus-within {
      box-shadow: 0.4rem 0.4rem 0.8rem ${colors.unactiveLink};
   }
`;

// styled component fo the form
const StyledFrom = styled.form`
   width: 100%;
   display: flex;
   flex-flow: row wrap;
   & p {
      width: 100%;
      text-align: center;
      margin-top: 1rem;
   }
`;

// styled component for form header
const FormHeader = styled.header`
   flex: 1 1 100%;
   display: flex;
   justify-content: space-between;
   align-items: center;
   margin-bottom: 1rem;
   & > h3 {
      font-size: 1.5rem;
      color: ${colors.darkUnactiveLink};
   }
`;

// styled component for textarea
const StyledTextArea = styled.textarea`
   flex: 1 1 50%;
   border-radius: 1rem;
   border: none;
   padding: 0.5rem 1rem;
   min-width: 5rem;
`;

// styled component for the log in link
const IconLabel = styled.label`
   display: flex;
   align-items: center;
   padding: ${padding.icons};
   font-size: 2.1rem;
   background: none;
   color: ${colors.darkUnactiveLink};
   transition: 300ms;
   &:hover {
      color: ${colors.primary};
   }
`;

// styled component for post preview (to be replaced by a post component when styled)
const PostPreview = styled.div`
   width: 100%;
   margin-top: 2rem;
   border: 0.1rem solid ${colors.primary};
   border-radius: 1rem;
   padding: 1rem;
   background-color: #fff;
   & > p {
      margin-bottom: 1rem;
   }
`;

/* --------------------------------------------- */
/*          Components creation section          */
/* --------------------------------------------- */
function NewPostForm() {
   // user data are required from the store
   const user = useSelector((store) => store.userReducer);
   // local state to know if component is loading
   const [isLoading, setIsLoading] = useState(true);

   // local state for new post content
   const [content, updateContent] = useState("");
   // local state for new post file
   const [file, setFile] = useState(null);
   // local state for uploaded image preview
   const [filePreview, setFilePreview] = useState("");

   // getting onHome context using its hook
   const { updateOnHome } = useOnHome();

   // local state to display error message
   const [error, setError] = useState(false);

   // get acces to redux actions using useDispatch hook
   const dispatch = useDispatch();

   // use effect to stop loading spiner
   useEffect(() => {
      if (!!user) {
         setIsLoading(false);
      }
   }, [user]);

   // function to handle file upload
   const handleFileUpdload = (event) => {
      // get file from event target file list
      const [file] = event.target.files;
      // set file as the recovered one
      setFile(file);
      // define an url to display file preview
      setFilePreview(URL.createObjectURL(file));
   };

   // function to reset newPostForm
   const resetNewPostForm = () => {
      setFile(null);
      updateContent("");
      setFilePreview("");
      setError(false);
   };

   // function to handle submit
   const handleNewPostSubmit = async (event) => {
      event.preventDefault();

      // regex for content
      const regexForContent =
         /^((?!-)(?!.*--)(?!')(?!.*'')[-A-ZÀ-ÿa-z0-9!,?. ':;()^]{2,2000}(?<!-)(?<!'))$/;

      if (regexForContent.test(content)) {
         //   console.log("=== file ===>", file);
         //   console.log("=== content ===>", content);
         const newPost = {
            content,
            userId: user.id,
         };
         // building postToSend object
         let postToSend;
         if (!!file) {
            postToSend = new FormData();
            postToSend.append("post", JSON.stringify(newPost));
            postToSend.append("image", file);
         } else {
            postToSend = newPost;
         }
         // add the post to the DB
         await dispatch(addPost(postToSend));

         // reload all the post to update the store
         dispatch(getAllPosts());

         // console.log("=== post ===>", response.data);
         // reset new post form
         resetNewPostForm();
      } else {
         setError(true);
      }
   };

   return (
      <NewPostFormWrapper>
         {isLoading ? (
            /* -------------- Loader -------------- */
            <FontAwesomeIcon icon={faSpinner} className="fa-spin" />
         ) : (
            <>
               {/* -------------- New post form -------------- */}
               <StyledFrom
                  action=""
                  onSubmit={handleNewPostSubmit}
                  id="new-post-form"
               >
                  {(content || file) && (
                     /* -------------- Form header (with cancel and sibmit button) -------------- */
                     <FormHeader>
                        <IconButton
                           color={colors.darkUnactiveLink}
                           onClick={(event) => {
                              event.preventDefault();
                              resetNewPostForm();
                           }}
                        >
                           <FontAwesomeIcon icon={faCircleArrowLeft} />
                        </IconButton>
                        <h3>Créer un nouveau post</h3>
                        <IconLabel htmlFor="newPostSubmit">
                           <FontAwesomeIcon icon={faPaperPlane} />
                        </IconLabel>
                        <input
                           type="submit"
                           name="newPostSubmit"
                           id="newPostSubmit"
                           value="Envoyer"
                           style={{ display: "none" }}
                        />
                     </FormHeader>
                  )}
                  {/* -------------- Visible part (to enter text and load image) -------------- */}
                  <UserImageWrapper
                     to={"/profile"}
                     onClick={() => updateOnHome(false)}
                  >
                     <img src={user.imageUrl || defaultProfileImage} alt="" />
                  </UserImageWrapper>
                  <StyledTextArea
                     name="newPostContent"
                     id="newPostContent"
                     type="text"
                     placeholder="Quoi de neuf ?"
                     value={content}
                     onChange={(event) => updateContent(event.target.value)}
                     //   cols="30"
                     //   rows="10"
                  ></StyledTextArea>
                  <IconLabel htmlFor="newPostImage">
                     <FontAwesomeIcon icon={faFileImage} />
                  </IconLabel>
                  <input
                     type="file"
                     name="newPostImage"
                     id="newPostImage"
                     onChange={handleFileUpdload}
                     style={{ display: "none" }}
                     accept="image/png, image/jpeg, image/jpg"
                  />
                  {/* -------------- Potential error message -------------- */}
                  {error && (
                     <ErrorMessage>
                        Entrez un contenu valide 😐 Pas de caractères
                        spéciaux...
                     </ErrorMessage>
                  )}
               </StyledFrom>
               {/* -------------- Post preview -------------- */}
               {(content || file) && (
                  <PostPreview>
                     {content && <p>{content}</p>}
                     {file && (
                        <p>
                           <img src={filePreview} alt="Post" />
                        </p>
                     )}
                  </PostPreview>
               )}
            </>
         )}
      </NewPostFormWrapper>
   );
}

// export the create component
export default NewPostForm;
