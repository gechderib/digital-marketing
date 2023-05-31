import React, { useContext } from "react";
import DmfsseContex from "../../app/contextStore";
const SingleItem = ({
  img,
  name,
  phoneNumber,
  status,
  prop1,
  prop2,
  onDetailClick,
  onEdite,
  onDelete,
}) => {
  const tableCtx = useContext(DmfsseContex);
  return (
    <tr className="hover:bg-gray-50">
      <th
        onClick={onDetailClick}
        className="cursor-pointer flex gap-3 px-6 py-4 font-normal text-gray-900"
      >
        <div className="relative h-10 w-10">
          {/* <img
            className={`h-full w-full ${
              tableCtx.dashboardTab === "users" ? "rounded-full" : null
            } object-cover object-center`}
            src={`${img}`}
            alt="."
          /> */}

          <div>
            {img.indexOf(".mp4") > -1 ? (
              <video controls>
                <source src={img} type="video/mp4" />
              </video>
            ) : null}

            {img.indexOf(".mp3") > -1 || img.indexOf(".MP3") > -1 ? (
              <audio controls className="w-44">
                <source src={img} type="audio/mp3"></source>
              </audio>
            ) : null}

            {img.indexOf(".jpg") > -1 ||
            img.indexOf(".JPG") > -1 ||
            img.indexOf(".png") > -1 ||
            img.indexOf(".PNG") > -1 ? (
              <img className="w-full" src={img} alt="Training media file"></img>
            ) : null}
          </div>

          {tableCtx.dashboardTab != "users" ? null : (
            <span className="absolute right-0 bottom-0 h-2 w-2 rounded-full bg-green-400 ring ring-white"></span>
          )}
        </div>
        <div className="text-sm">
          <div className="font-medium text-gray-700">{name}</div>
          <div className="text-gray-400">{phoneNumber}</div>
        </div>
      </th>
      <td className="px-6 py-4">
        <span className="inline-flex items-center gap-1 rounded-full bg-green-50 px-2 py-1 text-xs font-semibold text-green-600">
          <span className="h-1.5 w-1.5 rounded-full bg-green-600"></span>
          {status}
        </span>
      </td>
      <td className="px-6 py-4">{prop1}</td>
      <td className="px-6 py-4">{prop2}</td>
      <td className="px-6 py-4">
        <div className="flex justify-end gap-4">
          <div className="cursor-pointer" onClick={onDelete}>
            <span className="material-symbols-outlined">delete</span>
          </div>
          <div onClick={onEdite} className="cursor-pointer">
            <span className="material-symbols-outlined">edit</span>
          </div>
        </div>
      </td>
    </tr>
  );
};

export default SingleItem;
