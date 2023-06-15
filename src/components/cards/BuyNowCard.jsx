import React, { useState } from "react";
import SimpleImageSlider from "react-simple-image-slider";
import img1 from "../../assets/prodimg/home2.jpg"
import img2 from "../../assets/prodimg/15121A.jpg"
import img3 from "../../assets/prodimg/collage-fruit-textures-square-image-strawberries-pears-apples-apricots-plums-oranges-cherries-bananas-nectarines-141751617.jpg"
import img4 from "../../assets/prodimg/download.jpg"
import img5 from "../../assets/prodimg/ILRI,_Stevie_Mann_-_Ploughing_with_cattle_in_southwestern_Ethiopia.jpg"
import img6 from "../../assets/prodimg/istockphoto-862687952-612x612.jpg"
import img7 from "../../assets/prodimg/vegetables-greens-22031737.jpg"
import { useNavigate } from "react-router-dom";
const BuyNowCard = () => {
  const navigate = useNavigate()

  const sliderImages = [
    img1,img2,img3, img4, img5, img6, img7

  ];
  const [image, setImageNum] = useState()
  return (
    <div  style={{
      background:
        "linear-gradient(to right, #24ee50, #448a24, #0C521B, #054012)",
    }} className="sm:flex justify-between  py-8 px-16 sm:mx-10 mx-2 rounded-3xl">
      <div className="flex flex-col justify-evenly">
        <h1 style={{
          fontSize:'48px',
          color:'white'
      }}>WELCOME TO <span  style={{color:'#054012',border:'white'}}>SHEMETA</span></h1>
        <h3 style={{fontSize:'24px',  color:'white'}}>THE FUTURE OF <span style={{color:'#054012',fontWeight:'bold'}}>AGRO</span> INNOVATION</h3>
        <a href="/login"  
        style={{
          color:'white',
          background:'#13591C',
        hover:'#3DA12E'}}
        className="group my-5 flex w-44 cursor-pointer select-none items-center justify-center rounded-md bg-black px-6 py-2 text-white transition">
        <span className="group flex w-full items-center justify-center rounded py-1 text-center font-bold"> Shop now </span>
        <svg className="flex-0 group-hover:w-6 ml-4 h-6 w-0 transition-all" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth="2">
          <path strokeLinecap="round" strokeLinejoin="round" d="M14 5l7 7m0 0l-7 7m7-7H3" />
        </svg>
      </a>
      </div>
     {/*  <div className="self-center h-full">
        <img src={img1} alt="something" className="h-full self-center"></img>
  </div>*/}

<div className="self-center h-full rounded-2xl">
<SimpleImageSlider
            width={500}
            height={250}
            images={sliderImages}
            showBullets={true}
            showNavs={true}
            autoPlay={true} 
            onStartSlide = {(index, length) => {
               setImageNum(index);
            }}
               autoPlayDelay = {3}
         />
      </div>
    </div>
  );
};

export default BuyNowCard;
