import React from "react";
const ProductCard = ({ prodImg, name, price, description ,postedBy, onDetail}) => {
  return (
    <div onClick={onDetail}  className="w-full cursor-pointer shadow-xl hover:opacity-80  border border-gray-200 rounded-lg pb-3  hover:border-2">
      <div className="relative">
        <img
          className="w-full h-64 rounded-tl-lg rounded-tr-lg"
          src={prodImg}
          alt="product img"
        ></img>
        
      </div>

      <div className="mt-3 mx-3">
        <div className="flex justify-between text-xl">
          <p className="font-thin">{name}</p>
          <p className="font-bold italic">{price} ETB</p>
        </div>
        <div className="mt-4">
          <p className="font-thin  ">{`${description.substring(0,100)}...`}</p>
        </div>

        <div className="flex items-center justify-between mt-2">
          <p className="hover:underline cursor-pointer">By- {postedBy}</p>
        </div>
        {/* <div className="inline-flex gap-2 rounded-2xl border-gray-300 mt-4 border-2 py-1 px-4 text-gray-500 cursor-pointer font-bold self-center">
          <p>Add to cart</p>
        </div> */}
      </div>
    </div>
  );
};

export default ProductCard;
