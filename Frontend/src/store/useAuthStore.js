import { create } from "zustand";
import axiosInstance from "../api/axios.js";
import { toast } from "react-hot-toast";

const useAuthStore = create((set) => ({
  authUser: null,
  isSigningUp: false,
  isLoggingIn: false,
  isLoggingOut: false,
  notifications: null,
  chats: [],
  isCheckingProfiles: false,

  isCheckingAuth: true,

  checkAuth: async () => {
    try {
      const response = await axiosInstance.get("/auth/myprofile");
      set({ authUser: response.data });
      console.log("authUser: ", response.data);
    } catch (error) {
      set({ authUser: null });
    } finally {
      set({ isCheckingAuth: false });
    }
  },

  signup: async (data) => {
    set({ isSigningUp: true });

    try {
      const response = await axiosInstance.post("/auth/signup", data);
      set({ authUser: response.data });
      toast.success("Signed up successfully");
    } catch (error) {
      console.log(error);
      toast.error(error.response.data.message);
    } finally {
      set({ isSigningUp: false });
    }
  },

  login: async (data) => {
    set({ isLoggingIn: true });

    try {
      const response = await axiosInstance.post("/auth/login", data);
      set({ authUser: response.data });
      toast.success("Logged in successfully");
    } catch (error) {
      console.log(error);
      toast.error(error.response.data.message);
    } finally {
      set({ isLoggingIn: false });
    }
  },

  logout: async () => {
    set({ isLoggingOut: true });

    try {
      // localStorage.removeItem("jwt");
      await axiosInstance.post("/auth/logout");
      set({ authUser: null });
      toast.success("Logged out successfully");
    } catch (error) {
      console.log(error);
    } finally {
      set({ isLoggingOut: false });
    }
  },

  getNotifications: async () => {
    try {
      const response = await axiosInstance.get("/notifications/all");
      set({ notifications: response.data });
    } catch (error) {
      console.log(error);
    }
  },

  getChats: async () => {
    set({ isCheckingProfiles: true });
    try {
      const response = await axiosInstance.get("/chats/all");
      set({ chats: response.data.chats });
      console.log(response.data.chats);
    } catch (error) {
      console.log(error);
    } finally {
      set({ isCheckingProfiles: false });
    }
  },
}));

export default useAuthStore;
