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
  if (posts.length === 0)
    return (
      <div className="flex items-center justify-center h-screen text-2xl">
        No posts found, Go To Inventory Page And Add Your Willing Donations
      </div>
    );
  return (
    <div>
      {posts.map(
        (post, index) => (
          console.log(post._id), (<Post key={post._id} {...post} />)
        )
      )}
    </div>
  );
};

export default RecommendedPosts;
