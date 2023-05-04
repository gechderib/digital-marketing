import React from "react";
import ChatBox from "../../components/messages/ChatBox";
import Message from "../../components/messages/Message";

const Inbox = () => {
  return (
    <div className="mt-11 sm:ml-64 md:fixed">
      <Message />
    </div>
  );
};

export default Inbox;
