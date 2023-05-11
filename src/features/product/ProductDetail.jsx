import React, { useContext } from "react";
import DmfsseContex from "../../app/contextStore";
import { useDispatch, useSelector } from "react-redux";
import { productDetail } from "./productSlice";

const ProductDetail = () => {
  const detailCtx = useContext(DmfsseContex);
  const dispatch = useDispatch();
  const product = useSelector(productDetail);
  return (
    <section className="text-gray-700 body-font overflow-hidden bg-white">
      <div className="container">
        <div className="lg:w-11/12 flex flex-wrap">
          <img
            alt="ecommerce"
            className="lg:w-1/2 w-full object-cover object-center rounded border border-gray-200"
            src={product.photo}
          ></img>
          <div className="lg:w-1/2 w-full lg:pl-10 lg:py-6 mt-6 lg:mt-0">
            <div className="flex justify-between">
              <h2 className="text-sm title-font text-gray-500 tracking-widest uppercase">
                {product.postedBy.phoneNumber}
              </h2>
              <div
                onClick={() => detailCtx.setShowDetail(false)}
                className="flex cursor-pointer px-5 py-1 rounded-lg self-center items-center"
              >
                <span class="material-symbols-outlined">arrow_back_ios</span>{" "}
                <p className="text-lg">Back</p>
              </div>
            </div>
            <h1 className="text-gray-900 text-3xl title-font font-medium mb-1">
              {product.name}
            </h1>
            <div className="flex mb-4">
              <span className="flex items-center">
                <span className="material-symbols-outlined text-red-500">
                  star
                </span>
                <span className="material-symbols-outlined text-red-500">
                  star
                </span>
                <span className="material-symbols-outlined text-red-500">
                  star
                </span>
                <span className="material-symbols-outlined text-red-500">
                  star
                </span>
                <span className="material-symbols-outlined text-red-500">
                  star
                </span>
                <span className="text-gray-600 ml-3">4 Reviews</span>
              </span>
            </div>
            <p className="leading-relaxed">{product.description} </p>
            <div className="flex mt-6 items-center pb-5 border-b-2 border-gray-200 mb-5">
              <div>
                <p className="mb-5">
                  Amount <span>{product.amount} KG</span>
                </p>
                <div className="flex gap-2">
                  <p>
                    By -
                    <span className="cursor-pointer ml-1 hover:underline">
                      {product.postedBy.firstName} {product.postedBy.lastName}
                    </span>
                  </p>
                  <p>
                    {product.postedBy.verified ? (
                      <span class="material-symbols-outlined text-green-800">verified</span>
                    ) : null}
                  </p>
                </div>
              </div>
            </div>
            <div className="flex">
              <div className="title-font font-medium text-2xl text-gray-900">
                <p>{product.price} ETB/KG</p>
              </div>
              <button
                onClick={() => detailCtx.setShowDetail(false)}
                className="flex ml-auto text-white bg-red-500 border-0 py-2 px-6 focus:outline-none hover:bg-red-600 rounded"
              >
                Add To Cart
              </button>
            </div>
            <div>
              
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default ProductDetail;
