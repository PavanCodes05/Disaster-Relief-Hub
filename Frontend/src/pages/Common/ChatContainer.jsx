import React, { useEffect, useState } from "react";
import useAuthStore from "../../store/useAuthStore";
import { useParams } from "react-router-dom";

const ChatContainer = () => {
  const receiverId = useParams();
  const { messages, getMessages, authUser, loadingMessages, sendMessage } =
    useAuthStore();

  useEffect(() => {
    getMessages(receiverId.id);
  }, [getMessages]);

  const [message, setMessage] = useState("");
  const handleSubmit = async (e) => {
    e.preventDefault();
    await sendMessage(receiverId.id, { message: message });
    setMessage("");
  };

  if (!messages) return <div>Loading...</div>;
  if (loadingMessages) {
    return (
      <div className="flex items-center justify-center h-screen text-2xl">
        Loading...
      </div>
    );
  }

  return (
    <div className="fixed bottom-0 left-0 right-0 p-4 bg-transparent">
      <div className="w-full h-full overflow-y-auto">
        {messages?.messages?.map((message) => (
          <div
            key={message._id}
            className={
              message.from == authUser._id
                ? "chat chat-end items-end"
                : "chat chat-start items-start"
            }
          >
            <div className="chat-bubble">{message.message}</div>
          </div>
        ))}
        <div className="flex items-center mt-8 space-x-4">
          <input
            type="text"
            className="flex-1 px-4 py-2 border-2 rounded-lg"
            placeholder="Type a message"
            value={message}
            onChange={(e) => setMessage(e.target.value)}
          />
          <button
            className="bg-primary p-2 rounded-lg text-white"
            type="submit"
            onClick={handleSubmit}
          >
            Send
          </button>
        </div>
      </div>
    </div>
  );
};

export default ChatContainer;
