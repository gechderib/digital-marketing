import React from "react";
import { useSelector } from "react-redux";
import { activeuser, messageFromOneUser } from "./messageSlice";
import { messageStatus } from "./messageSlice";
import LoadingMessageBar from "../loading/LoadingMessageBar";

const ChatBoxBar = () => {
  const messageStat = useSelector(messageStatus);
  const currentUser = useSelector(activeuser)

  if (messageStat == "loading") {
    return <LoadingMessageBar/>
  }
  if (messageStat == "failed") {
    return <p>error happen please refrash your window</p>;
  }
  if (messageStat == "succeeded") {
  
    return (
      <div className="flex flex-row items-center py-4 px-6 rounded-2xl shadow">
        <div className="flex items-center justify-center h-10 w-10 rounded-full bg-green-500 text-green-100">
        {currentUser.firstName.substring(0,1)}
            
        </div>
        <div className="flex flex-col ml-3">
          <div className="font-semibold text-sm">
          {currentUser.firstName}
          </div>
          {/* <div className="text-xs text-gray-500">Active</div> */}
        </div>
        {/* <div className="ml-auto">
          <div className="flex flex-row items-center space-x-2">
            <a
              href="#"
              className="flex items-center justify-center bg-gray-100 hover:bg-gray-200 text-gray-400 h-10 w-10 rounded-full"
            >
              <span className="material-symbols-outlined">more_vert</span>
            </a>
          </div>
        </div> */}
      </div>
    );
  }
};

export default ChatBoxBar;
