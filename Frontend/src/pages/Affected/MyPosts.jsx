import React, { useEffect } from "react";
import Post from "../../components/Post";
import useAffectedStore from "../../store/useAffectedStore";
const MyPosts = () => {
  const { posts, getPosts } = useAffectedStore();

  useEffect(() => {
    getPosts();
  }, [getPosts]);

  console.log("Posts:", posts);
  //   if (!posts) return <div>Loading...</div>;
  return (
    <div>
      {posts.map((post) => (
        <Post key={post._id} {...post} />
      ))}
    </div>
  );
};

export default MyPosts;
