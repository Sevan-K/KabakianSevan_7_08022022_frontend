/* --------------------------------- */
/*          Imports Section          */
/* --------------------------------- */

import { useEffect } from "react";
import Post from "../Post";
import { useDispatch, useSelector } from "react-redux";
import { getAllPosts } from "../../actions/post.actions";
import { useState } from "react";
import { getAllComments } from "../../actions/comments.action";

/* ------------------------------------------- */
/*          Styled components section          */
/* ------------------------------------------- */

/* --------------------------------------------- */
/*          Components creation section          */
/* --------------------------------------------- */
function Thread() {
   // local state to know if posts are loaded (for infinite scroll)
   const [loadPosts, setLoadPosts] = useState(true);

   // getting acces to redux actions by using useDispatch hook
   const dispatch = useDispatch();

   // useEffect to get all the post when thread component is rendered (needed for infinite scroll)
   useEffect(() => {
      if (loadPosts) {
         // loading all the posts into the store
         dispatch(getAllPosts());
         // loading all the comments into the store
         dispatch(getAllComments());
         // set load as false not to load again
         setLoadPosts(false);
      }
   }, [loadPosts, dispatch]);

   // building posts list from the store
   const postsList = useSelector((state) => state.allPostsReducer);

   // the posts list is mapped to return a post component of each post
   const PostsComponents =
      postsList.length !== 0 &&
      postsList.map((post) => <Post post={post} key={post.id} />);

   // component to return
   return (
      <div>
         <ul>{PostsComponents}</ul>
      </div>
   );
}

// export the create component
export default Thread;
