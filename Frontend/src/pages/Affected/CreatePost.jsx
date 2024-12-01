import { useState } from "react";
import useAffectedStore from "../../store/useAffectedStore";

const CreatePost = () => {
  const { createPost } = useAffectedStore();

  const [requirements, setRequirements] = useState([]);

  const [formData, setFormData] = useState({
    title: "",
    description: "",
    requiredResources: "",
    location: "",
  });

  const [requirement, setRequirement] = useState({
    resource: "",
    quantity: 0,
  });

  const handleResourceChange = (e) => {
    setRequirement({ ...requirement, resource: e.target.value });
  };

  const handleQuantityChange = (e) => {
    setRequirement({ ...requirement, quantity: e.target.value });
  };

  const handleTitleChange = (e) => {
    setFormData({ ...formData, title: e.target.value });
  };

  const handleDescriptionChange = (e) => {
    setFormData({ ...formData, description: e.target.value });
  };

  const handleLocationChange = (e) => {
    setFormData({ ...formData, location: e.target.value });
  };

  const handleAddRequirement = (e) => {
    e.preventDefault();
    setRequirements([...requirements, requirement]);
    setRequirement({ resource: "", quantity: 0 });
    console.log(requirements);
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    const newFormData = { ...formData, requiredResources: requirements };
    createPost(newFormData);

    setFormData({
      title: "",
      description: "",
      requiredResources: "",
      location: "",
    });
    setRequirements([]);
  };

  return (
    <div className="flex h-screen">
      <main className="w-full flex flex-col items-center">
        <div className="w-1/2 font-Playfair font-bold text-3xl md:text-5xl lg:text-6xl mb-6">
          You're Not Alone, Make a Post And Let The World Know!
        </div>
        <form className="w-1/2 flex flex-col justify-center">
          <label className="form-control w-full max-w-xs">
            <div className="label">
              <span className="label-text font-bold">Title</span>
              <span className="label-text-alt">Brief Your Situation</span>
            </div>
            <input
              type="text"
              placeholder="Type here"
              name="title"
              onChange={handleTitleChange}
              value={formData.title}
              className="input input-bordered w-full max-w-xs"
            />
          </label>

          <label className="form-control">
            <div className="label">
              <span className="label-text font-bold">
                Description (Optional)
              </span>
              <span className="label-text-alt">Whats Happening?</span>
            </div>
            <textarea
              className="textarea textarea-bordered h-24"
              placeholder="Explain Your Situation"
              name="description"
              onChange={handleDescriptionChange}
              value={formData.description}
            ></textarea>
          </label>

          <label className="form-control w-full max-w-xs">
            <div className="label">
              <span className="label-text font-bold">Location </span>
              <span className="label-text-alt">(Eg. Kerala,India)</span>
            </div>
            <input
              type="text"
              placeholder="Type here"
              name="location"
              onChange={handleLocationChange}
              value={formData.location}
              className="input input-bordered w-full max-w-xs"
            />
          </label>

          <div className="mt-4 flex flex-col">
            <button
              type="button"
              className="btn w-full lg:w-1/2"
              onClick={() => document.getElementById("my_modal_4").showModal()}
            >
              Selected Resources
            </button>
            <dialog id="my_modal_4" className="modal">
              <div className="modal-box w-11/12 max-w-5xl">
                <h3 className="font-bold text-lg">Selected Resources:</h3>
                <ul>
                  {requirements
                    .filter((res) => res.resource && res.quantity)
                    .map((res, index) => (
                      <li key={index}>
                        {res.resource}: {res.quantity}
                      </li>
                    ))}
                </ul>
                <div className="modal-action">
                  <button
                    type="button"
                    className="btn"
                    onClick={() =>
                      document.getElementById("my_modal_4").close()
                    }
                  >
                    Close
                  </button>
                </div>
              </div>
            </dialog>

            <h2 className="mt-2 font-bold">Add Requirements</h2>
            <select
              name="name"
              className="select select-bordered w-full max-w-xs"
              onChange={handleResourceChange}
              value={requirement.resource}
            >
              <option value="" disabled>
                Choose The Resource
              </option>
              <option value="Water bottle">Water Bottle</option>
              <option value="Food">Food</option>
              <option value="First Aid Kits">First Aid Kits</option>
              <option value="Sanitary Napkins/Tampons">
                Sanitary Napkins/Tampons
              </option>
              <option value="Tent">Tent</option>
              <option value="Blankets">Blankets</option>
              <option value="Toothpaste">Toothpaste</option>
              <option value="Bandages">Bandages</option>
              <option value="Face Masks">Face Masks</option>
              <option value="Torch Light">Torch Light</option>
              <option value="Candles">Candles</option>
              <option value="Shoes">Shoes</option>
              <option value="Baby Diapers">Baby Diapers</option>
              <option value="Hand Sanitizers">Hand Sanitizers</option>
            </select>

            <label className="form-control w-full max-w-xs">
              <div className="label">
                <span className="label-text font-bold">Quantity</span>
                <span className="label-text-alt">No. of Resources</span>
              </div>
              <input
                type="number"
                placeholder="Type here"
                name="quantity"
                className="input input-bordered w-full max-w-xs"
                onChange={handleQuantityChange}
                value={requirement.quantity}
                min="1"
              />
            </label>
            <button
              type="button"
              className="btn btn-accent max-w-xs mt-2 mb-2"
              onClick={handleAddRequirement}
            >
              ADD
            </button>
          </div>
          <button
            className="btn btn-primary max-w-xs mb-2 mt-2"
            onClick={handleSubmit}
          >
            Post
          </button>
        </form>
      </main>
    </div>
  );
};

export default CreatePost;
