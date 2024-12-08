import React, { useEffect } from "react";
import { useNavigate } from "react-router-dom";

import useAuthStore from "../../store/useAuthStore";

const Notification = ({ notification }) => {
  const navigate = useNavigate();

  if (!notification) {
    return (
      <div className="flex items-center justify-center h-screen text-2xl">
        Loading...
      </div>
    );
  }
  return (
    <div className="lg:w-1/2 mx-auto grid grid-cols-1 mt-2">
      <div className="card bg-base-100 w-full shadow-xl">
        <div className="card-body">
          <h2 className="card-title text-4xl">{notification.title}</h2>
          <p className="card-normal">{notification.description}</p>
          <p className="card-side">From: {notification.from.name}</p>
          <p className="card-side">To: {notification.to.name}</p>
          <div className="card-actions justify-end">
            <button
              className="btn"
              onClick={() => {
                navigate(`/chat/${notification.from._id}`);
              }}
            >
              Chat
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};

const NotificationPage = () => {
  const { notifications, getNotifications } = useAuthStore();
  useEffect(() => {
    getNotifications();
    console.log(notifications);
  }, [getNotifications]);

  return (
    <div>
      {notifications?.notifications
        ?.slice()
        .reverse()
        .map((notification) => (
          <Notification key={notification._id} notification={notification} />
        ))}
    </div>
  );
};

export default NotificationPage;
