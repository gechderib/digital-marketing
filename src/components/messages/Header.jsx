import React from "react";

const Header = () => {
  return (
    <div className="flex flex-row items-center">
      <div className="flex flex-row items-center">
        <div className="text-xl font-semibold">Messages</div>
        <div className="flex items-center justify-center ml-2 text-xs h-5 w-5 text-white bg-green-500 rounded-full font-medium">
          5
        </div>
      </div>
      <div className="ml-auto">
        <button className="flex items-center justify-center h-7 w-7 bg-gray-200 text-gray-500 rounded-full">
          <span className="material-symbols-outlined ">search</span>
        </button>
      </div>
    </div>
  );
};

export default Header;
