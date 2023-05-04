import React from "react";
import ConnectedUserList from "./ConnectedUserList";
import ChatBoxBar from "./ChatBoxBar";
import SendMessage from "./SendMessage";
import ChatBox from "./ChatBox";

const Message = () => {
  return (
    <div className="md:flex md:flex-row md:h-screen antialiased text-gray-800 mb-20">
      <ConnectedUserList />
      <div className="flex flex-col h-full w-full bg-white px-4 py-6">
        <ChatBoxBar />
        <ChatBox />
        <SendMessage />
      </div>
    </div>
  );
};

export default Message;
