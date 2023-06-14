import React, { useContext, useState } from "react";
import DmfsseContex from "../../app/contextStore";
import { useNavigate } from "react-router-dom";
import logoimg from "../../assets/images/flogo22.png";


const HomeNav = () => {
  const user = JSON.parse(localStorage.getItem("user"));
  const navigate = useNavigate();
  const [showDropdown, setShowDropDown] = useState(false);
  const toggleDropDown = () => {
    setShowDropDown(!showDropdown);
  };
  const sideBarCtx = useContext(DmfsseContex);
  const logo = logoimg;
  const forCustomer = () => {
    if (user) {
      if (user.roles[0] == "customer") {
        return (
          <div className="flex mr-5">
            <div onClick={()=> navigate("/messages")} className="flex items-center gap-2 cursor-pointer hover:bg-gray-100 py-1 px-3 rounded-full">
              <p className="font-thin">Messages</p>
              <span className="bg-blue-200 font-thin text-green-800  p-1 rounded-full w-5 h-5 items-center flex justify-center">
                3
              </span>
            </div>
            <div onClick={()=>navigate("/myorders")} className="flex items-center cursor-pointer hover:bg-gray-100 py-1 px-3 rounded-full">
              <p className="font-thin">Orders</p>
            </div>
            <div onClick={()=>navigate("/trainings")} className="flex items-center cursor-pointer hover:bg-gray-100 py-1 px-3 rounded-full">
              <p className="font-thin">Trainings</p>
            </div>
          </div>
        );
      }
      if (user.roles[0] == "sse" || user.roles[0] == "farmer") {
        return (
          <div className="flex mr-5">
            <div onClick={()=>navigate("/messages")} className="flex items-center gap-2 cursor-pointer hover:bg-gray-100 py-1 px-3 rounded-full">
              <p className="font-thin">Messages</p>
              <span className="bg-blue-200 font-thin text-green-800  p-1 rounded-full w-5 h-5 items-center flex justify-center">
                3
              </span>
            </div>
            <div onClick={()=>navigate("/myproducts")} className="flex items-center cursor-pointer hover:bg-gray-100 py-1 px-3 rounded-full">
              <p className="font-thin">My Items</p>
            </div>
            <div onClick={()=>navigate("/myorders")} className="flex items-center cursor-pointer hover:bg-gray-100 py-1 px-3 rounded-full">
              <p className="font-thin">Orders</p>
            </div>
            <div onClick={()=>navigate("/myoffers")} className="flex items-center cursor-pointer hover:bg-gray-100 py-1 px-3 rounded-full">
              <p className="font-thin">Offers</p>
            </div>
            <div onClick={()=>navigate("/trainings")} className="flex items-center cursor-pointer hover:bg-gray-100 py-1 px-3 rounded-full">
              <p className="font-thin">Trainings</p>
            </div>
            <div onClick={() =>navigate("/sellproduct")} className="flex items-center cursor-pointer hover:bg-gray-100 py-1 px-3 rounded-full">
              <p className="font-thin">Sell</p>
            </div>
          </div>
        );
      }
    }else {
      return null
    }
  };

  return (
    <nav className="h-14 fixed top-0 z-50 w-full bg-white border-b border-gray-100">
      <div className="px-3 py-3 lg:px-3 lg:pl-3">
        <div className="flex items-center justify-between">
          <div className="flex items-center justify-start">
            <button
              onClick={sideBarCtx.toggleSideBar}
              type="button"
              className="inline-flex items-center p-2 text-sm text-gray-500 rounded-lg sm:hidden hover:bg-gray-100 focus:outline-none focus:ring-2 focus:ring-gray-200 dark:text-gray-400 dark:hover:bg-gray-700 dark:focus:ring-gray-600"
            >
              <span className="sr-only">Open sidebar</span>
              <svg
                className="w-6 h-6"
                aria-hidden="true"
                fill="currentColor"
                viewBox="0 0 20 20"
                xmlns="http://www.w3.org/2000/svg"
              >
                <path
                  clipRule="evenodd"
                  fillRule="evenodd"
                  d="M2 4.75A.75.75 0 012.75 4h14.5a.75.75 0 010 1.5H2.75A.75.75 0 012 4.75zm0 10.5a.75.75 0 01.75-.75h7.5a.75.75 0 010 1.5h-7.5a.75.75 0 01-.75-.75zM2 10a.75.75 0 01.75-.75h14.5a.75.75 0 010 1.5H2.75A.75.75 0 012 10z"
                ></path>
              </svg>
            </button>

            <div  onClick={()=>{navigate("/")}} className="flex ml-2 md:mr-24 cursor-pointer">
              <img
                className="h-8 w-28 mr-3"
                src= {logo}
                alt="logo"
              />
              <span className="self-center text-xl font-semibold sm:text-2xl whitespace-nowrap dark:text-white">
              
              </span>
            </div>
          </div>

          <div className="flex items-center">
          {forCustomer()}

            {user ? (
              <div className="flex items-center ml-3">
                <div>
                  <button
                    type="button"
                    className="flex text-sm bg-gray-800 rounded-full focus:ring-4 focus:ring-gray-300 dark:focus:ring-gray-600"
                    onClick={toggleDropDown}
                  >
                    <span className="sr-only">Open user menu</span>
                    <img
                      className="w-8 h-8 rounded-full"
                      src={user.profilePicture || null}
                      alt="user photo"
                    ></img>
                  </button>
                </div>
                <div
                  className={`z-50 absolute right-0 top-10 ${
                    showDropdown ? "" : "hidden"
                  } my-4 text-base list-none bg-white divide-y divide-gray-100 rounded shadow dark:bg-gray-700 dark:divide-gray-600`}
                >
                  <div className="px-4 py-3" role="none">
                    <p
                      className="text-sm text-gray-900 dark:text-white"
                      role="none"
                    >
                      {user.firstName} {user.lastName}
                    </p>
                    <p
                      className="text-sm font-medium text-gray-900 truncate dark:text-gray-300"
                      role="none"
                    >
                      {user.phoneNumber}
                    </p>
                  </div>
                  <ul className="py-1" role="none">
                    {user.roles[0] == "admin" || user.roles[0] == "agent" ? (
                      <li onClick={()=>navigate("/dashboard")} className="cursor-pointer">
                        <a
                          className="block px-4 py-2 text-sm text-gray-700 hover:bg-gray-100 dark:text-gray-300 dark:hover:bg-gray-600 dark:hover:text-white"
                          role="menuitem"
                        >
                          Dashboard
                        </a>
                      </li>
                    ) : null}

                    <li>
                      <a
                        onClick={()=>navigate(`/profile/${user.id}`)}
                        className="block cursor-pointer px-4 py-2 text-sm text-gray-700 hover:bg-gray-100 dark:text-gray-300 dark:hover:bg-gray-600 dark:hover:text-white"
                        role="menuitem"
                      >
                        Settings
                      </a>
                    </li>
                    {user.roles[0] == "sse" || user.roles[0] == "farmer"?       <li>
                      <a
                        onClick={()=>navigate("/user_earning")}
                        className="block px-4 py-2 text-sm text-gray-700 cursor-pointer hover:bg-gray-100 dark:text-gray-300 dark:hover:bg-gray-600 dark:hover:text-white"
                        role="menuitem"
                      >
                        Earnings
                      </a>
                    </li>:null}
             
                    <li>
                      <a
                        onClick={() => {
                          localStorage.removeItem("user");
                          navigate("/");
                        }}
                        className="block px-4 py-2 text-sm text-gray-700 hover:bg-gray-100 cursor-pointer"
                        role="menuitem"
                      >
                        Sign out
                      </a>
                    </li>
                  </ul>
                </div>
              </div>
            ) : (
              <div className="flex gap-2 text-gray-500">
                <div
                  onClick={() => {
                    navigate("/login");
                  }}
                  className="font-thin hover:underline cursor-pointer"
                >
                  Sign In
                </div>
                <div className="font-thin italic">|</div>
                <div
                  onClick={() => {
                    navigate("/signup");
                  }}
                  className="font-thin hover:underline cursor-pointer"
                >
                  Sign Up
                </div>
              </div>
            )}
          </div>
        </div>
      </div>
    </nav>
  );
};

export default HomeNav;
