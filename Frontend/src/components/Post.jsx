import React, { useState } from "react";

import useAuthStore from "../store/useAuthStore";
const Post = (post) => {
  const { authUser } = useAuthStore();
  const postRequirements = post.requiredResources;
  console.log(postRequirements);
  return (
    <div className="lg:w-1/2 mx-auto grid grid-cols-1 mt-2">
      <div className="card bg-base-100 w-full shadow-xl">
        <div className="card-body">
          <h2 className="card-title text-4xl">{post.title}</h2>
          <h2 className="card-side">
            {post.username}, {post.location}
          </h2>
          <p className="card-normal">{post.description}</p>
          <p className="underline text-2xl">Requirements: </p>
          <ul className="flex-col justify-around items-center">
            {post.requiredResources.map((resource) => (
              <li key={resource.resource}>
                {resource.resource}:{resource.quantity}
              </li>
            ))}
          </ul>
          <div className="card-actions justify-end">
            <button
              className="btn"
              onClick={() => document.getElementById("my_modal_3").showModal()}
            >
              Donate
            </button>

            <dialog id="my_modal_3" className="modal">
              <div className="modal-box">
                <form method="dialog">
                  <button className="btn btn-sm btn-circle btn-ghost absolute right-2 top-2">
                    ✕
                  </button>
                </form>
                <h3 className="font-bold text-lg">Hello!</h3>
                <p className="py-4">
                  Press ESC key or click on ✕ button to close
                </p>
                <form>
                  <select className="select select-bordered w-full max-w-xs mt-2">
                    <option value="">Select Resource</option>
                    {console.log("Here")}
                    {postRequirements.map((item) => (
                      <option value={item.resource} key={item.resource}>
                        {item.resource}
                      </option>
                    ))}
                  </select>
                  <input
                    type="Number"
                    placeholder="Quantity"
                    className="input input-bordered input-primary w-full max-w-xs mt-2"
                    min={1}
                  />
                  <button
                    className="btn btn-primary mt-2 w-full"
                    type="button"
                    onClick={() => {
                      console.log(resource, quantity);
                    }}
                  >
                    Add
                  </button>

                  <button
                    className="btn btn-primary mt-2 w-full"
                    type="button"
                    onClick={() => {
                      console.log(resource, quantity);
                    }}
                  >
                    Donate
                  </button>
                </form>
              </div>
            </dialog>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Post;
