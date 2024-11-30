import React, { useEffect } from "react";
import { Link } from "react-router-dom";
import useAuthStore from "../store/useAuthStore";
import {
  UserPen,
  Refrigerator,
  Repeat2,
  Loader,
  Milestone,
  MessageCircleCode,
} from "lucide-react";

const Navbar = () => {
  const { authUser, isCheckingAuth, checkAuth, logout } = useAuthStore();

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
    <div className="navbar bg-base-100 shadow z-50 sticky top-0 left-0 right-0 block">
      <div className="flex justify-between items-center w-full px-4 lg:px-8">
        <div className="navbar-start">
          {authUser && (
            <div className="dropdown">
              <div
                tabIndex={0}
                role="button"
                className="btn btn-ghost btn-circle"
              >
                <svg
                  xmlns="http://www.w3.org/2000/svg"
                  className="h-5 w-5"
                  fill="none"
                  viewBox="0 0 24 24"
                  stroke="currentColor"
                >
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    strokeWidth="2"
                    d="M4 6h16M4 12h16M4 18h7"
                  />
                </svg>
              </div>
              <ul
                tabIndex={0}
                className="menu menu-sm dropdown-content bg-base-100 rounded-box z-[1] mt-3 w-52 p-2 shadow"
              >
                {authUser.role === "donor" && (
                  <>
                    <li>
                      <Link to="/inventory">
                        {/* <HiOutlineHome className="w-5 h-5" /> */}
                        <Refrigerator />
                        <span className="ml-2">Inventory</span>
                      </Link>
                    </li>
                  </>
                )}
                {authUser.role === "affected" && (
                  <>
                    <li>
                      <Link to="/createpost">
                        {/* <HiOutlineHome className="w-5 h-5" /> */}
                        <Repeat2 />
                        <span className="ml-2">Create Post</span>
                      </Link>
                    </li>
                    <li>
                      <Link to="/myPosts">
                        {/* <HiOutlineHome className="w-5 h-5" /> */}
                        <Milestone />
                        <span className="ml-2">My Posts</span>
                      </Link>
                    </li>
                  </>
                )}
                <li>
                  <Link to="/chats">
                    {/* <HiOutlineHome className="w-5 h-5" /> */}
                    <MessageCircleCode />
                    <span className="ml-2">Chats</span>
                  </Link>
                </li>
                <li>
                  <Link to="/myprofile">
                    <UserPen />
                    <span className="ml-2">Profile</span>
                  </Link>
                </li>
              </ul>
            </div>
          )}
        </div>
        <div className="navbar-center">
          <a className="btn btn-ghost text-xl">Disaster Relief Hub</a>
        </div>
        <div className="navbar-end flex items-center">
          {authUser && (
            <>
              <button className="btn btn-ghost btn-circle">
                <div className="indicator">
                  <svg
                    xmlns="http://www.w3.org/2000/svg"
                    className="h-5 w-5"
                    fill="none"
                    viewBox="0 0 24 24"
                    stroke="currentColor"
                  >
                    <path
                      strokeLinecap="round"
                      strokeLinejoin="round"
                      strokeWidth="2"
                      d="M15 17h5l-1.405-1.405A2.032 2.032 0 0118 14.158V11a6.002 6.002 0 00-4-5.659V5a2 2 0 10-4 0v.341C7.67 6.165 6 8.388 6 11v3.159c0 .538-.214 1.055-.595 1.436L4 17h5m6 0v1a3 3 0 11-6 0v-1m6 0H9"
                    />
                  </svg>
                  <span className="badge badge-xs badge-primary indicator-item"></span>
                </div>
              </button>
              <button className="btn btn-ghost ml-2" onClick={logout}>
                Logout
              </button>
            </>
          )}
        </div>
      </div>
    </div>
  );
};

export default Navbar;
