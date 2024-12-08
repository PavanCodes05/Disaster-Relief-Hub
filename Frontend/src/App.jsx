import { Routes, Route, Navigate } from "react-router-dom";
import { useEffect } from "react";
import { Toaster } from "react-hot-toast";
import { Loader } from "lucide-react";

import useAuthStore from "./store/useAuthStore";

import Navbar from "./components/Navbar";

import HomePage from "./pages/Common/HomePage";
import SignupPage from "./pages/Common/SignupPage";
import LoginPage from "./pages/Common/LoginPage";
import ProfilePage from "./pages/Common/ProfilePage";
import InventoryPage from "./pages/Donor/InventoryPage";
import CreatePost from "./pages/Affected/CreatePost";
import MyPosts from "./pages/Affected/MyPosts";
import RecommendedPosts from "./pages/Donor/RecommendedPosts";
import NotificationPage from "./pages/Common/NotificationPage";
import ChatProfiles from "./pages/Common/ChatProfiles";

const App = () => {
  const { authUser, isCheckingAuth, checkAuth } = useAuthStore();

  useEffect(() => {
    checkAuth();
  }, [checkAuth]);

  if (isCheckingAuth && !authUser)
    return (
      <div className="flex items-center justify-center h-screen">
        <Loader className="size-10 animate-spin" />
      </div>
    );

  return (
    <div>
      <Navbar />
      <Routes>
        <Route
          path="/"
          element={
            authUser && authUser?.role === "affected" ? (
              <CreatePost />
            ) : (
              <Navigate to="/donors/recommendedposts" />
            )
          }
        />
        <Route
          path="/signup"
          element={!authUser ? <SignupPage /> : <Navigate to="/" />}
        />
        <Route
          path="/login"
          element={!authUser ? <LoginPage /> : <Navigate to="/" />}
        />
        <Route
          path="/myprofile/"
          element={authUser ? <ProfilePage /> : <Navigate to="/login" />}
        />
        <Route
          path="/notifications"
          element={authUser ? <NotificationPage /> : <Navigate to="/login" />}
        />
        <Route
          path="/chatprofiles"
          element={authUser ? <ChatProfiles /> : <Navigate to="/login" />}
        />
        {/* Donor Routes */}
        <Route
          path="/donor/inventory"
          element={authUser ? <InventoryPage /> : <Navigate to="/" />}
        />
        <Route
          path="/donors/recommendedposts"
          element={authUser ? <RecommendedPosts /> : <Navigate to="/login" />}
        />

        {/* Affected Routes */}
        <Route
          path="/affected/createpost"
          element={
            authUser?.role === "affected" ? <CreatePost /> : <Navigate to="/" />
          }
        />
        <Route
          path="/affected/myposts"
          element={
            authUser?.role === "affected" ? <MyPosts /> : <Navigate to="/" />
          }
        />
      </Routes>
      <Toaster />
    </div>
  );
};

export default App;
