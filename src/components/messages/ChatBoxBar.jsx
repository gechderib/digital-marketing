import React from "react";
import { useSelector } from "react-redux";
import { messageFromOneUser } from "./messageSlice";
import { messageStatus } from "./messageSlice";

const ChatBoxBar = () => {
  const user = JSON.parse(localStorage.getItem("user"));
  const userMessage = useSelector(messageFromOneUser);
  const messageStat = useSelector(messageStatus);
  console.log(userMessage)
  {
    messageStat == "loading" ? (
      <p>loading...</p>
    ) : messageStat == "failed" ? (
      <p>failed</p>
    ) : messageStat == "succeeded" ? (
      <div className="flex flex-row items-center py-4 px-6 rounded-2xl shadow">
        <div className="flex items-center justify-center h-10 w-10 rounded-full bg-pink-500 text-pink-100">
          G
        </div>
        <div className="flex flex-col ml-3">
          <div className="font-semibold text-sm">
            {" "}
            {userMessage[0].reciever._id == user._id
              ? userMessage[0].sender._id
              : userMessage[0].reciever._id}
            Getachew
          </div>
          <div className="text-xs text-gray-500">Active</div>
        </div>
        <div className="ml-auto">
          <div className="flex flex-row items-center space-x-2">
            <a
              href="#"
              className="flex items-center justify-center bg-gray-100 hover:bg-gray-200 text-gray-400 h-10 w-10 rounded-full"
            >
              <span className="material-symbols-outlined">more_vert</span>
            </a>
          </div>
        </div>
      </div>
    ) : null;
  }
};

export default ChatBoxBar;
