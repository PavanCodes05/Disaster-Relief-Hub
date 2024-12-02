import React, { useEffect } from "react";
import { Loader } from "lucide-react";
import useAuthStore from "../../store/useAuthStore";

const ProfilePage = () => {
  const { authUser, isCheckingAuth, checkAuth } = useAuthStore();

  // checkAuth();
  console.log(authUser);

  if (isCheckingAuth && !authUser)
    return (
      <div className="flex items-center justify-center h-screen">
        <Loader className="size-10 animate-spin" />
      </div>
    );

  return (
    <div className="h-screen w-full flex items-center justify-center">
      <div className="mockup-window bg-base-300 border h-full w-full md:w-4/6 flex items-center justify-center">
        <div className="bg-base-200 flex flex-col items-center justify-center text-center px-4 py-16 w-full h-full text-lg md:text-2xl">
          <div className="mb-6">
            <span className="font-bold">Profile Page</span>
          </div>
          <div className="space-y-4">
            <div>Name: {authUser?.name}</div>
            <div>Email: {authUser?.email}</div>
            <div>Role: {authUser?.role}</div>
            {console.log(authUser)}
            {authUser?.role === "affected" && (
              <div>Number Of Posts: {authUser?.affectedPosts?.length || 0}</div>
            )}
            {authUser?.role === "donor" && <div>Number Of Donations: 2</div>}
          </div>
        </div>
      </div>
    </div>
  );
};

export default ProfilePage;
