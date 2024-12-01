import React from "react";
import { useEffect } from "react";

import useDonorStore from "../../store/useDonorStore";
import Post from "../../components/Post";

const RecommendedPosts = () => {
  const { recommendedPosts, posts } = useDonorStore();

  useEffect(() => {
    recommendedPosts();
  }, [recommendedPosts]);

  if (!posts) return <div>Loading...</div>;
  return (
    <div>
      {posts.map(
        (post, index) => (
          console.log(post._id), (<Post key={index} {...post} />)
        )
      )}
    </div>
  );
};

export default RecommendedPosts;
