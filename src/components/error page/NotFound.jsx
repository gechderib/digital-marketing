import React from "react";
import { useNavigate } from "react-router-dom";

const NotFound = () => {
    const navigate = useNavigate()
  return (
    <div class="flex items-center justify-center min-h-screen bg-gray-500 hover:bg-gray-800  bg-fixed bg-cover bg-bottom error-bg">
      <div class="container">
        <div class="row">
          <div class="col-sm-8 offset-sm-2 text-gray-50 text-center -mt-52">
            <div class="relative ">
              <h1 class="relative text-9xl tracking-tighter-less text-shadow font-sans font-bold">
                <span>4</span>
                <span>0</span>
                <span>4</span>
              </h1>
              <span class="absolute  top-0   -ml-12  text-gray-300 font-semibold">
                Oops!
              </span>
            </div>
            <h5 class="text-gray-300 font-semibold -mr-10 -mt-3">
              Page not found
            </h5>
            <p class="text-gray-100 mt-2 mb-6">
              we are sorry, but the page you requested was not found
            </p>
            <a onClick={()=>{navigate("/")}}  class="bg-green-400 cursor-pointer  px-5 py-3 text-sm shadow-sm font-medium tracking-wider text-gray-50 rounded-full hover:shadow-lg">
              Got to Home
            </a>
          </div>
        </div>
      </div>
    </div>
  );
};

export default NotFound;
