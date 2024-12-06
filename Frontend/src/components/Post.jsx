import React, { useEffect, useState } from "react";

import useAuthStore from "../store/useAuthStore";
import useDonorStore from "../store/useDonorStore";

const Post = (post) => {
  const [resource, setResource] = useState("");
  const [quantity, setQuantity] = useState(1);

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
              onClick={() =>
                document.getElementById(`my_modal_${post._id}`).showModal()
              }
            >
              Donate
            </button>

            <DonateModal post={post} key={post._id} />
          </div>
        </div>
      </div>
    </div>
  );
};

const DonateModal = ({ post }) => {
  const { authUser } = useAuthStore();
  const { inventory, getInventory } = useDonorStore();
  const commonResources = [];

  useEffect(() => {
    getInventory();
  }, []);

  for (let i = 0; i < post.requiredResources.length; i++) {
    for (let j = 0; j < inventory?.length; j++) {
      if (post.requiredResources[i].resource === inventory[j].resource) {
        commonResources.push(post.requiredResources[i].resource);
      }
    }
  }

  const [resource, setResource] = useState("");
  const [quantity, setQuantity] = useState(1);
  const { makeDonation } = useDonorStore();

  const [formData, setFormData] = useState({ donations: [], postId: post._id });

  const handleSubmit = async (e) => {
    e.preventDefault();
    console.log(formData);
    await makeDonation(formData);
    document.getElementById(`my_modal_${post._id}`).close();
    window.location.reload();
  };

  const handleAdd = () => {
    setFormData({
      ...formData,
      donations: [
        ...formData.donations,
        { resource, quantity: Number(quantity) },
      ],
    });
    setResource("");
    setQuantity(1);
  };

  return (
    <dialog id={`my_modal_${post._id}`} className="modal">
      <div className="modal-box">
        <form method="dialog">
          <button className="btn btn-sm btn-circle btn-ghost absolute right-2 top-2">
            ✕
          </button>
        </form>
        <p className="py-4">You are donating to: {post.title}</p>
        <ul className="flex-col justify-around items-center">
          {post.requiredResources.map((resource) => (
            <li key={resource.resource}>
              {resource.resource}:{resource.quantity}
            </li>
          ))}
        </ul>
        <p className="py-4">Donations:</p>
        <ul className="list-disc list-inside mt-2 ">
          {formData.donations.map((donation) => (
            <li key={`${donation.resource}-${donation.quantity}`}>
              {donation.resource}:{donation.quantity}
            </li>
          ))}
        </ul>
        <form>
          <select
            className="select select-bordered w-full max-w-xs mt-2"
            value={resource}
            onChange={(e) => setResource(e.target.value)}
          >
            <option value="">Select Resource</option>

            {/* {post.requiredResources.map((item) => (
              <option value={item.resource} key={item.resource}>
                {item.resource}
              </option>
            ))} */}

            {commonResources.map((item) => (
              <option value={item} key={item}>
                {item}
              </option>
            ))}
          </select>
          <input
            type="Number"
            placeholder="Quantity"
            className="input input-bordered input-primary w-full max-w-xs mt-2"
            value={quantity}
            min={1}
            max={
              post.requiredResources.find((item) => item.resource === resource)
                ?.quantity || 1
            }
            onChange={(e) => setQuantity(e.target.valueAsNumber)}
          />
          <button
            className="btn btn-primary mt-2 w-full"
            type="button"
            onClick={handleAdd}
          >
            Add
          </button>

          <button
            className="btn btn-primary mt-2 w-full"
            type="button"
            onClick={handleSubmit}
          >
            Donate
          </button>
        </form>
      </div>
    </dialog>
  );
};

export default Post;
