import React from "react";
import ChatBox from "../../components/messages/ChatBox";
import Message from "../../components/messages/Message";

const Inbox = () => {
  const user = JSON.parse(localStorage.getItem("user"))
  const isAdmin = user.roles[0] == "admin"
  return (
    <div className={`${isAdmin?"sm:ml-64 md:fixed":""} mt-11 `}>
      <Message />
    </div>
  );
};

export default Inbox;
