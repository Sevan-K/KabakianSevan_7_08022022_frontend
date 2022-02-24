/* --------------------------------- */
/*          Imports Section          */
/* --------------------------------- */

import { useEffect } from "react";
import Post from "../Post";
import { useDispatch, useSelector } from "react-redux";
import { getAllPosts } from "../../actions/post.actions";
import { useState } from "react";

/* ------------------------------------------- */
/*          Styled components section          */
/* ------------------------------------------- */

/* --------------------------------------------- */
/*          Components creation section          */
/* --------------------------------------------- */

const testPostSList = [
   {
      id: 1,
      content: "Post 1",
      userId: 1,
   },
   {
      id: 2,
      content: "Post 2",
      userId: 1,
   },
];

// useEffect to get all the post

function Thread() {
   // local state to know if posts are loaded (for infinite scroll)
   const [loadPosts, setLoadPosts] = useState(true);

   // getting acces to redux actions by using useDispatch hook
   const dispatch = useDispatch();

   // useEffect to get all the post when thread component is rendered
   useEffect(() => {
      if (loadPosts) {
         dispatch(getAllPosts());
         setLoadPosts(false);
      }
   }, [loadPosts]);

   // building posts list from the store
   const postsList = useSelector((state) => state.allPostsReducer);

   // the posts list is mapped to return a post component of each post
   const PostsComponents =
      postsList.length !== 0 &&
      postsList.map(({ id, content, imageUrl, userId, updatedAt, likes }) => (
         <Post
            key={id}
            content={content}
            userId={userId}
            id={id}
            likes={likes}
            updatedAt={updatedAt}
            imageUrl={imageUrl}
         />
      ));

   // component to return
   return (
      <div>
         <ul>{PostsComponents}</ul>
      </div>
   );
}

// export the create component
export default Thread;
