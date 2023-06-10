import React from "react";
import SenderMessage from "./SenderMessage";
import RecieverMessage from "./RecieverMessage";
import { messageFromOneUser, messageStatus } from "./messageSlice";
import { useSelector } from "react-redux";
import LoadingChatList from "../loading/LoadingChatList";

const ChatBox = () => {
  const user = JSON.parse(localStorage.getItem("user"));
  const userMessage = useSelector(messageFromOneUser);
  const messageStat = useSelector(messageStatus);

  if (messageStat == "loading") {
    return <LoadingChatList/>
  }
  if (messageStat == "failed") {
    return <p>error happen please refrash your window</p>;
  }
  if (messageStat == "succeeded") {
    return (
      <div className="h-full overflow-hidden py-4">
        <div className="h-full overflow-y-auto">
          <div className="grid grid-cols-12 gap-y-2">
            {userMessage.map((message) => {
              if (message.sender._id == user.id) {
                return (
                  <RecieverMessage
                    firstLetter={message.sender.firstName.substring(0,1)}
                    message={message.message}
                  />
                );
              }
              if (message.reciever._id == user.id) {
                return (
                  <SenderMessage
                    firstLetter={message.sender.firstName.substring(0,1)}
                    message={message.message}
                  />
                );
              }
            })}
          </div>
        </div>
      </div>
    );
  }
};

export default ChatBox;
