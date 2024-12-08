import React, { useEffect } from "react";
import { useNavigate } from "react-router-dom";
import useAuthStore from "../../store/useAuthStore";
import { Loader } from "lucide-react";
import { Link } from "react-router-dom";

const ChatProfiles = () => {
  const navigate = useNavigate();
  const { getChats, chats, isCheckingProfiles, getMessages, messages } =
    useAuthStore();
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
                    <button
                      onClick={() => {
                        navigate(`/chat/${chat._id}`);
                        console.log(chat._id);
                      }}
                    >
                      {chat.name}
                    </button>
                    {console.log(typeof chat._id)}
                  </li>
                ))}
            </ul>
          </li>
        </ul>
        {}
      </div>
    </div>
  );
};

export default ChatProfiles;
