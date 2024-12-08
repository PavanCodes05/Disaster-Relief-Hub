import React, { useEffect } from "react";
import useAuthStore from "../../store/useAuthStore";
import { Loader } from "lucide-react";

const ChatProfiles = () => {
  const { getChats, chats, isCheckingProfiles } = useAuthStore();
  useEffect(() => {
    getChats();
    console.log(chats);
  }, [getChats]);

  if (!chats || isCheckingProfiles) {
    return (
      <div className="flex items-center justify-center h-screen">
        <Loader className="size-10 animate-spin" />
      </div>
    );
  }

  return (
    <div className="flex flex-col items-center w-full">
      <div className="mx-auto flex flex-col items-center w-full md:w-1/2 lg:w-1/3">
        <ul className="menu bg-base-200 rounded-box w-full">
          <li>
            <h2 className="menu-title">Chats</h2>
            <ul>
              {console.log(chats)}
              {chats &&
                chats?.map((chat) => (
                  <li key={chat._id}>
                    <a>{chat.name}</a>
                  </li>
                ))}
            </ul>
          </li>
        </ul>
      </div>
    </div>
  );
};

export default ChatProfiles;
