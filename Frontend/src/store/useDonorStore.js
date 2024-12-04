import { create } from "zustand";
import axiosInstance from "../api/axios.js";
import { getInventory } from "../../../Backend/Controllers/donorController.js";
import toast from "react-hot-toast";

const useDonorStore = create((set) => ({
  inventory: null,
  isCheckingInventory: true,

  recommendedPosts: async () => {
    try {
      const response = await axiosInstance.get("/donor/recommendedposts");
      set({ posts: response.data.posts });
    } catch (error) {
      console.log(error);
    } finally {
      set({ isCheckingPosts: false });
    }
  },

  getInventory: async () => {
    try {
      const response = await axiosInstance.get("/donor/inventory");
      set({ inventory: response.data.resources });
    } catch (error) {
      console.log(error);
    } finally {
      set({ isCheckingInventory: false });
    }
  },

  addResource: async (data) => {
    try {
      const response = await axiosInstance.post("/donor/inventory/add", data);
      set({ inventory: response.data.resources });
      toast.success("Resource added successfully");
      console.log(response.data);
    } catch (error) {
      console.log(error);
    }
  },

  deleteResource: async (data) => {
    try {
      const response = await axiosInstance.post(
        "/donor/inventory/delete",
        data
      );
      set({ inventory: response.data.resources });
      toast.success("Resource deleted successfully");
      console.log(response.data);
    } catch (error) {
      console.log(error);
    }
  },

  makeDonation: async (data) => {
    try {
      const response = await axiosInstance.post(`/donor/makedonation`, data);
      toast.success("Donation made successfully");
      console.log(response.data);
    } catch (error) {
      console.log(error);
    }
  },
}));

export default useDonorStore;
