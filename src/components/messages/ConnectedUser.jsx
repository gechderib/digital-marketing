import React from "react";

const ConnectedUser = () => {
  return (
    <div className="flex flex-row items-center p-4 relative">
      <div className="absolute text-xs text-gray-500 right-0 top-0 mr-4 mt-3">
        2 hours ago
      </div>
      <div className="flex items-center justify-center h-10 w-10 rounded-full bg-pink-500 text-pink-300 font-bold flex-shrink-0">
        T
      </div>
      <div className="flex flex-col flex-grow ml-3">
        <div className="text-sm font-medium">Flo Steinle</div>
        <div className="text-xs truncate w-40">
          Good after noon! how can i help you?
        </div>
      </div>
      <div className="flex-shrink-0 ml-2 self-end mb-1">
        <span className="flex items-center justify-center h-5 w-5 bg-red-500 text-white text-xs rounded-full">
          3
        </span>
      </div>
    </div>
  );
};

export default ConnectedUser;

{
  /* <div class="flex flex-row items-center p-4">
              <div class="flex items-center justify-center h-10 w-10 rounded-full bg-pink-500 text-pink-300 font-bold flex-shrink-0">
                T
              </div>
              <div class="flex flex-col flex-grow ml-3">
                <div class="flex items-center">
                  <div class="text-sm font-medium">Sarah D</div>
                  <div class="h-2 w-2 rounded-full bg-green-500 ml-2"></div>
                </div>
                <div class="text-xs truncate w-40">
                  Lorem ipsum dolor sit amet, consectetur adipisicing elit.
                  Debitis, doloribus?
                </div>
              </div>
            </div> */
}
