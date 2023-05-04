import React from "react";
import SenderMessage from "./SenderMessage";
import RecieverMessage from "./RecieverMessage";

const ChatBox = () => {
  return (
    <div className="h-full overflow-hidden py-4">
      <div className="h-full overflow-y-auto">
        <div className="grid grid-cols-12 gap-y-2">
          <SenderMessage />
          <RecieverMessage/>
        </div>
      </div>
    </div>
  );
};

export default ChatBox;
