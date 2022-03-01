/* --------------------------------- */
/*          Imports Section          */
/* --------------------------------- */
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import {
   faSpinner,
   faFileImage,
   faPaperPlane,
} from "@fortawesome/free-solid-svg-icons";
import { useSelector } from "react-redux";
import { useEffect, useState } from "react";

/* ------------------------------------------- */
/*          Styled components section          */
/* ------------------------------------------- */
// styled component for the form

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

   // function to handle submit
   const handleNewPostSubmit = (event) => {
      event.preventDefault();
      //   console.log("=== file ===>", file);
      //   console.log("=== content ===>", content);
      const newPost = {
         content,
         userId: user.id,
      };
      // building dataToSend object
      let dataToSend;
      if (!!file) {
         let dataToSend = new FormData();
         dataToSend.append("post", JSON.stringify(newPost));
         dataToSend.append("image", file);
      } else {
         dataToSend = newPost;
      }
      console.log("=== dataToSend ===>", dataToSend);
   };

   return (
      <div className="dev">
         {isLoading ? (
            <FontAwesomeIcon icon={faSpinner} className="fa-spin" />
         ) : (
            <>
               <form action="" onSubmit={handleNewPostSubmit}>
                  <p>
                     <img src={user.imageUrl} alt="" />
                  </p>
                  <textarea
                     name="newPostContent"
                     id="newPostContent"
                     type="text"
                     placeholder="Quoi de neuf ?"
                     value={content}
                     onChange={(event) => updateContent(event.target.value)}
                     //   cols="30"
                     //   rows="10"
                  ></textarea>
                  <label htmlFor="newPostImage">
                     <FontAwesomeIcon icon={faFileImage} />
                  </label>
                  <input
                     type="file"
                     name="newPostImage"
                     id="newPostImage"
                     onChange={handleFileUpdload}
                     style={{ display: "none" }}
                  />
                  <label htmlFor="newPostSubmit">
                     <FontAwesomeIcon icon={faPaperPlane} />
                  </label>
                  <input
                     type="submit"
                     name="newPostSubmit"
                     id="newPostSubmit"
                     value="Envoyer"
                     style={{ display: "none" }}
                  />
               </form>
               <div>
                  {file && (
                     <p>
                        <img src={filePreview} alt="Post" />
                     </p>
                  )}
                  {content && <p>{content}</p>}
               </div>
            </>
         )}
      </div>
   );
}

// export the create component
export default NewPostForm;
