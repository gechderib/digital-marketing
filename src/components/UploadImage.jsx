import React, { useContext } from "react";
import DmfsseContex from "../app/contextStore";
const UploadImage = () => {
  const dmfsseCtx = useContext(DmfsseContex);
  return (
    <div className="mt-5">
      <div className="w-full mb-2 bg-gray-200 rounded-full h-2 dark:bg-gray-700">
        <div
          className={`${dmfsseCtx.progressPercent===100?"bg-green-600":"bg-blue-600"}  h-2 rounded-full`}
          style={{ width: `${dmfsseCtx.progressPercent}%` }}
        ></div>
      </div>
      <div className="flex justify-between mt-4">
        <div className="">
          <span className="sr-only">Choose File</span>
          <input
            type="file" multiple
            onChange={(e) => dmfsseCtx.setFile(e.target.files[0])}
            className="block w-full text-sm text-gray-500 file:mr-4 file:py-2 file:px-4 file:rounded-full file:border-0 file:text-sm file:font-semibold file:bg-blue-50 file:text-gray-700 hover:file:bg-blue-100"
          />
        </div>
        <div className="cursor-pointer" onClick={dmfsseCtx.handleImageUpload}>
          {dmfsseCtx.progressPercent == 100 ? (
            <span className="material-symbols-outlined"> done</span>
          ) : (
            <span className="material-symbols-outlined"> upload</span>
          )}
        </div>
      </div>
    </div>
  );
};

export default UploadImage;
