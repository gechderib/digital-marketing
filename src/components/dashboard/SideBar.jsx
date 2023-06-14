import React, { useContext } from "react";
import DmfsseContex from "../../app/contextStore";
import { useNavigate } from "react-router-dom";
import { useDispatch } from "react-redux";
import { changePage } from "../../features/training/trainingSlice";

const SideBar = () => {
  const dispatch = useDispatch()
  const sideBarCtx = useContext(DmfsseContex);
  const navigate = useNavigate()
  const user = JSON.parse(localStorage.getItem("user"))
  return (
    <aside
    onClick={()=>{
      sideBarCtx.setShowModal(false)
      sideBarCtx.setIsAdding(false)
      sideBarCtx.setIsEditing(false)
      sideBarCtx.setShowDetail(false)
      sideBarCtx.setUserPage(0)
      sideBarCtx.setOrderPage(0)
      dispatch(changePage(0))
    }}
      className={`fixed top-0 left-0 z-40 w-64 h-screen pt-20 transition-transform ${
        sideBarCtx.showSidebar ? null : "-translate-x-full"
      } border-r border-gray-50 sm:translate-x-0 bg-gray-50`}
    >
      <div className="h-full px-3 pb-4 overflow-y-auto ">
        <ul className="space-y-2 font-medium">
          <li>
            <button
              onClick={()=> {
                sideBarCtx.setIsAdding(false)
                sideBarCtx.setDasboardTab("dashboard")}}
              className="flex w-full items-center p-2 text-gray-900 rounded-lg hover:bg-white"
            >
              <span className="material-symbols-outlined text-gray-500 hover:animate-bounce">
                dashboard
              </span>

              <span className="ml-3">Dashboard</span>
            </button>
          </li>

          <li>
            <button
              onClick={()=> sideBarCtx.setDasboardTab("training")}
              className="flex w-full items-center p-2 text-gray-900 rounded-lg hover:bg-white"
            >
              <span className="material-symbols-outlined text-gray-500 hover:animate-bounce">
                cast_for_education
              </span>
              <span className="ml-3">Training</span>
            </button>
          </li>
          <li>
            <button
              onClick={()=> sideBarCtx.setDasboardTab("inbox")}
              className="flex w-full items-center p-2 text-gray-900 rounded-lg hover:bg-white"
            >
              
              <span className="material-symbols-outlined text-gray-500 hover:animate-bounce">
                move_to_inbox
              </span>
              <span className="ml-3">Messages</span>
              
              <span className="inline-flex items-center justify-center w-3 h-3 p-3 ml-3 text-sm font-medium text-blue-800 bg-blue-100 rounded-full">
                3
              </span>
            </button>
          </li>
          <li>
            <button
              onClick={()=> sideBarCtx.setDasboardTab("users")}
              className="flex w-full items-center p-2 text-gray-900 rounded-lg hover:bg-white"
            >
              <span className="material-symbols-outlined text-gray-500 hover:animate-bounce">
                person
              </span>
              <span className="ml-3">Users</span>
            </button>
          </li>
          <li>
            <button
              onClick={()=> sideBarCtx.setDasboardTab("products")}
              className="flex w-full items-center p-2 text-gray-900 rounded-lg hover:bg-white dark:hover:bg-gray-700"
            >
              <span className="material-symbols-outlined text-gray-500 hover:animate-bounce">
                category
              </span>
              <span className="ml-3">Products</span>
            </button>
          </li>
          {user.roles[0]=="agent"? <li>
            <button
              onClick={()=> sideBarCtx.setDasboardTab("register")}
              className="flex w-full items-center p-2 text-gray-900 rounded-lg hover:bg-white"
            >
              <span className="material-symbols-outlined text-gray-500 hover:animate-bounce">
                app_registration
              </span>
              <span className="ml-3">Offers</span>
            </button>
          </li>:null}
         
          <li>
            <button
              onClick={()=> navigate("/login")}
              className="flex w-full items-center p-2 text-gray-900 rounded-lg hover:bg-white"
            >
              <span className="material-symbols-outlined text-gray-500 hover:animate-bounce">
                login
              </span>
              <span className="ml-3">Sign In</span>
            </button>
          </li>

        </ul>
      </div>
    </aside>
  );
};

export default SideBar;
