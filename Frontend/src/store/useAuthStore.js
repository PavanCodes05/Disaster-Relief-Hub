import { create } from "zustand";
import axiosInstance from "../api/axios.js";
import { toast } from "react-hot-toast";
import { io } from "socket.io-client";

const BASE_URL = "http://localhost:5001";

const useAuthStore = create((set, get) => ({
  authUser: null,
  isSigningUp: false,
  isLoggingIn: false,
  isLoggingOut: false,
  notifications: null,
  selectedUser: null,
  chats: [],
  isCheckingProfiles: false,
  messages: { messages: [] },
  loadingMessages: false,
  onlineUsers: [],

  socket: null,

  isCheckingAuth: true,

  checkAuth: async () => {
    try {
      const response = await axiosInstance.get("/auth/myprofile");
      set({ authUser: response.data });
      get().connectToSocket();
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
      get().connectToSocket();
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
      get().connectToSocket();
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
      get().disconnectFromSocket();
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

  getMessages: async (id) => {
    const { selectedUser } = get();
    console.log("Fetching messages for user: ", selectedUser);
    set({ loadingMessages: true });
    try {
      const response = await axiosInstance.get(
        `/chats/getmessages/${selectedUser}`
      );
      console.log("Messages response: ", response.data); // Check this!
      set({ messages: response.data });
    } catch (error) {
      console.log(error);
    } finally {
      set({ loadingMessages: false });
    }
  },

  sendMessage: async (id, data) => {
    try {
      const { selectedUser, messages } = get();
      const response = await axiosInstance.post(
        `/chats/send/${selectedUser}`,
        data
      );

      console.log("Response data:", response.data);

      const newMessage = response.data.newMessage || response.data;

      if (newMessage) {
        set({
          messages: {
            ...messages,
            messages: [...messages.messages, newMessage],
          },
        });
      }
    } catch (error) {
      console.log("Error sending message:", error);
    }
  },

  setSelectedUser: (user) => set({ selectedUser: user }),

  connectToSocket: () => {
    const { authUser } = get();
    if (!authUser || get().socket?.connected) return;

    const socket = io(BASE_URL, {
      query: {
        userId: authUser._id,
      },
    });

    socket.connect();
    set({ socket });

    socket.on("join", (users) => {
      console.log("users", users);
      set({ onlineUsers: users });
    });
  },

  disconnectFromSocket: () => {
    if (get().socket?.connected) get().socket.disconnect();
  },

  subscribeToMessages: () => {
    const { selectedUser, socket, messages } = get();
    if (!selectedUser || !socket) return;

    socket.on("message", (newMessage) => {
      if (newMessage.from !== selectedUser) return;
      set((state) => {
        const updatedMessages = [...state.messages.messages, newMessage];
        return { messages: { ...state.messages, messages: updatedMessages } };
      });
    });
  },

  unsubscribeFromMessages: () => {
    const { selectedUser, socket } = get();
    if (!selectedUser) return;
    socket.off("message");
  },
}));

export default useAuthStore;
