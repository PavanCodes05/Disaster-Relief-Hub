import { create } from "zustand";
import { toast } from "react-hot-toast";
import axiosInstance from "../api/axios.js";
import { populatePosts } from "../../../Backend/Controllers/affectedController.js";

const useAffectedStore = create((set) => ({
  posts: null,
  isCheckingPosts: true,

  getPosts: async () => {
    try {
      const response = await axiosInstance.get("/affected/myposts");
      set({ posts: response.data });
    } catch (error) {
      console.log(error);
    } finally {
      set({ isCheckingPosts: false });
    }
  },

  createPost: async (data) => {
    try {
      const response = await axiosInstance.post("/affected/create", data);
      toast.success("Post created successfully");
      console.log(response.data);
    } catch (error) {
      console.log(error);
      toast.error(error.response.data.message);
    }
  },
}));

export default useAffectedStore;
