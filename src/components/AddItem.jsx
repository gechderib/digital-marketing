import React, { useContext } from "react";
import DmfsseContex from "../app/contextStore";

const AddItem = () => {
  const addCtx = useContext(DmfsseContex)
  const user = JSON.parse(localStorage.getItem("user"))
  return (
    <div className="flex justify-between gap-2 p-2 items-center rounded-lg border border-gray-50 shadow-md m-5">
      <div className="w-full md:w-1/3 flex items-center relative">
        <input
          className="w-full border border-gray-300 p-2 outline-none rounded-lg"
          placeholder="search..."
        ></input>
        <span className="material-symbols-outlined absolute right-5 cursor-pointer">
          search
        </span>
      </div>

      <button 
      style={{
        background:'#054112',
     }}
      onClick={()=> addCtx.setIsAdding(true)} className="flex h-10 md:gap-2 cursor-pointer text-white py-2 px-2 md:px-2 rounded-lg hover:bg-gray-950">
        <p>Add</p>
        <span className="material-symbols-outlined">add</span>
      </button>

      {user.roles[0]=="agent"?   <div onClick={()=> addCtx.setIsAdding(true)} className="bg-gray-800 flex gap-1 md:gap-2 cursor-pointer text-white py-2 px-2 md:px-5 rounded-lg hover:bg-gray-950">
        <p>Add</p>
        <span className="material-symbols-outlined">add</span>
      </div>:null}
   

    </div>
  );
};

export default AddItem;
