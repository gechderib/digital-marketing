import React from "react";

const DashboardCard = ({name, amount,percent, icon}) => {
  return (
      <div className="flex justify-center h-24 gap-5 border-l-2">
        <div className="self-center">
          <div className="uppercase text-sm text-gray-400">{name}</div>
          <div className="mt-1">
            <div className="flex space-x-2 items-center">
              <div className="text-2xl">{amount}</div>
              <div className="text-xs text-green-800 bg-green-200 rounded-md p-1">
                +{percent}%
              </div>
            </div>
          </div>
        </div>
        <div className="self-center">
          <span className="material-symbols-outlined animate-bounce">{icon}</span>
        </div>
      </div>
  );
};

export default DashboardCard;
