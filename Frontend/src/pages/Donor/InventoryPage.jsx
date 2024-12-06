import React, { useEffect, useState } from "react";
import { FaTrash } from "react-icons/fa";
import { Loader } from "lucide-react";
import useDonorStore from "../../store/useDonorStore";

const InventoryPage = () => {
  const {
    isCheckingInventory,
    getInventory,
    inventory,
    addResource,
    deleteResource,
  } = useDonorStore();

  useEffect(() => {
    getInventory();
  }, [getInventory, isCheckingInventory, addResource]);

  const [formData, setFormData] = useState({
    resource: "",
    quantity: 1,
  });

  const handleChangeResource = (e) => {
    setFormData({ ...formData, resource: e.target.value });
  };

  const handleChangeQuantity = (e) => {
    setFormData({ ...formData, quantity: e.target.value });
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    console.log(formData);
    addResource(formData);
    setFormData({ resource: "", quantity: 1 });
    // getInventory();
  };

  return (
    <div className="w-full h-screen flex">
      <div>
        <button
          className="btn btn-neutral mt-5 ml-5"
          onClick={() => document.getElementById("my_modal_1").showModal()}
        >
          Add Resources
        </button>
        <dialog id="my_modal_1" className="modal">
          <div className="modal-box">
            <h2 className="mt-2">Add Requiremnets</h2>
            <select
              name="name"
              onChange={handleChangeResource}
              value={formData.resource}
              className="select select-bordered w-full max-w-xs mt-2"
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
                <span className="label-text">Quantity</span>
                <span className="label-text-alt">No. of Resources</span>
              </div>
              <input
                type="number"
                placeholder="Type here"
                name="quantity"
                value={formData.quantity}
                onChange={handleChangeQuantity}
                className="input input-bordered w-full max-w-xs mt-2"
              />
            </label>
            <button
              className="btn btn-neutral mt-5 ml-5"
              onClick={handleSubmit}
            >
              Add to inventory
            </button>
            <div className="modal-action">
              <form method="dialog">
                {/* if there is a button in form, it will close the modal */}
                <button
                  type="button"
                  className="btn"
                  onClick={() => document.getElementById("my_modal_1").close()}
                >
                  Close
                </button>
              </form>
            </div>
          </div>
        </dialog>
        <div className="overflow-x-auto flex flex-col items-center ml-5 mt-16">
          {inventory?.length === 0 && (
            <h1 className="text-3xl font-bold">No Resources Added Yet</h1>
          )}
          <table className="table">
            {/* head */}
            <thead>
              <tr>
                <th></th>
                <th>Resource</th>
                <th>Quantity</th>
              </tr>
            </thead>
            <tbody>
              {/* row 1 */}
              {console.log(inventory)}
              {inventory?.map((resource, index) => (
                <tr key={resource._id}>
                  <th>{index + 1}</th>
                  <td>{resource.resource}</td>
                  <td>{resource.quantity}</td>
                  <td
                    className="hover:text-red-500 hover:cursor-pointer"
                    onClick={() => deleteResource(resource)}
                  >
                    <FaTrash />
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>
    </div>
  );
};

export default InventoryPage;
