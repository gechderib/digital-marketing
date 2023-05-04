import React from "react";
import ConnectedUser from "./ConnectedUser";
import Header from "./Header";

const ConnectedUserList = () => {
  return (
    <div className="flex flex-row w-96 flex-shrink-0 bg-gray-100 p-4 mb-16">
      <div className="flex flex-col w-full h-full pl-4 pr-4 py-4 -mr-4">
        <Header/>
        <div className="h-full overflow-hidden relative pt-2">
          <div className="flex flex-col divide-y h-full overflow-y-auto -mx-4">
            <ConnectedUser/>
          </div>
          <div className="absolute bottom-0 right-0 mr-2">
            <button className="flex items-center justify-center shadow-sm h-10 w-10 bg-red-500 text-white rounded-full">
              <span className="material-symbols-outlined">add</span>
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};

export default ConnectedUserList;
