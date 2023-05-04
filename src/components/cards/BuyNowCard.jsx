import React from "react";
import img1 from "../../assets/images/2.png"
import { useNavigate } from "react-router-dom";
const BuyNowCard = () => {
  const navigate = useNavigate()
  return (
    <div  style={{
      background:
        "linear-gradient(to right, #ee7724, #d8363a, #dd3675, #b44593)",
    }} className="sm:flex justify-between  py-8 px-16 sm:mx-10 mx-2 rounded-3xl">
      <div className="flex flex-col justify-evenly">
        <p className="text-xl w-72 font-thin">here some text about the ... here some text about the ...</p>
        <a href="/login" className="group my-5 flex w-44 cursor-pointer select-none items-center justify-center rounded-md bg-black px-6 py-2 text-white transition">
        <span className="group flex w-full items-center justify-center rounded py-1 text-center font-bold"> Shop now </span>
        <svg className="flex-0 group-hover:w-6 ml-4 h-6 w-0 transition-all" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth="2">
          <path strokeLinecap="round" strokeLinejoin="round" d="M14 5l7 7m0 0l-7 7m7-7H3" />
        </svg>
      </a>
      </div>
      <div className="self-center h-full">
        <img src={img1} alt="something" className="h-full self-center"></img>
      </div>
      
    </div>
  );
};

export default BuyNowCard;
