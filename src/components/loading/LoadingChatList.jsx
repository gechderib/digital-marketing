import React from "react";

const LoadingChatList = () => {
  return (
    <div role="status" class="animate-pulse h-full mt-5">
      <div className="flex justify-start gap-5 items-center mb-5 w-1/3">
        <div className="h-10 w-10 bg bg-gray-300 rounded-full"></div>
        <div class="h-6 bg-gray-200 rounded-full w-full"></div>
      </div>

      <div className="flex justify-start gap-5 items-center mb-5 w-1/3 float-right">
        <div class="h-6 bg-gray-200 rounded-full w-full"></div>
        <div className="h-10 w-10 bg bg-gray-300 rounded-full"></div>
      </div>

      <div className="flex justify-start gap-5 items-center mb-5 w-1/3">
        <div className="h-10 w-10 bg bg-gray-300 rounded-full"></div>
        <div class="h-6 bg-gray-200 rounded-full w-full"></div>
      </div>

      <div className="flex justify-start gap-5 items-center mb-5 w-1/3 float-right">
        <div class="h-6 bg-gray-200 rounded-full w-full"></div>
        <div className="h-10 w-10 bg bg-gray-300 rounded-full"></div>
      </div>
      <div className="flex justify-start gap-5 items-center mb-5 w-1/3">
        <div className="h-10 w-10 bg bg-gray-300 rounded-full"></div>
        <div class="h-6 bg-gray-200 rounded-full w-full"></div>
      </div>

      <div className="flex justify-start gap-5 items-center mb-5 w-1/3 float-right">
        <div class="h-6 bg-gray-200 rounded-full w-full"></div>
        <div className="h-10 w-10 bg bg-gray-300 rounded-full"></div>
      </div>
      <span class="sr-only">Loading...</span>
    </div>
  );
};

export default LoadingChatList;
