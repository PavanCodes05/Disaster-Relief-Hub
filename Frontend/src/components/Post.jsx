import React from "react";

const Post = (post) => {
  return (
    <div className="lg:w-1/2 h-screen mx-auto grid grid-cols-1 mt-5">
      <div className="">
        <div className="card bg-base-100 w-full shadow-xl sm:h-96">
          <div className="card-body">
            <h2 className="card-title text-4xl">{post.title}</h2>
            <h2 className="card-side">
              {post.username}, {post.location}
            </h2>
            <p className="card-normal">{post.description}</p>
            <p className="underline text-2xl">Requirements: </p>
            <ul className="flex-col justify-around items-center h-full">
              {post.requiredResources.map((resource) => (
                <li key={resource.resource}>
                  {resource.resource}:{resource.quantity}
                </li>
              ))}
            </ul>
            <div className="card-actions justify-end">
              <button className="btn btn-primary">Donate</button>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Post;
