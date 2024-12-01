import { create } from "zustand";
import { toast } from "react-hot-toast";
import axiosInstance from "../api/axios.js";

const useAffectedStore = create((set) => ({
  posts: null,
  isCheckingPosts: true,

  getPosts: async () => {},
  createPost: async (data) => {
    try {
      const response = await axiosInstance.post("/affected/create", data);
      toast.success("Post created successfully");
      console.log(response.data);
    } catch (error) {
      console.log(error);
    }
  },
}));

export default useAffectedStore;
