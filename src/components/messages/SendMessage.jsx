import React from "react";

const SendMessage = () => {
  return (
    <div className="flex flex-row items-center mb-16">
      <div className="flex flex-row items-center w-full border rounded-3xl h-12 px-2">
        <div className="w-full">
          <input
            type="text"
            className="border border-transparent w-full focus:outline-none text-sm h-10 flex items-center px-3"
            placeholder="Type your message...."
          ></input>
        </div>
      </div>
      <div className="ml-6">
        <button className="flex items-center justify-center h-10 w-10 rounded-full bg-gray-200 hover:bg-gray-300 text-indigo-800">
          <span className="material-symbols-outlined">send</span>
        </button>
      </div>
    </div>
  );
};

export default SendMessage;
