import React, { useEffect } from "react";
import BuyNowCard from "../../components/cards/BuyNowCard";
import HomeNav from "../../components/nav/HomeNav";
import SortedBy from "../../components/SortedBy";
import ProductCard from "../../components/cards/ProductCard";
import Pagination from "../../components/Pagination";
import Footer from "../../components/Footer";
import Layout from "../../components/layout/Layout";
import WhatWeDo from "../../components/cards/whatwedo";

import { useDispatch, useSelector } from "react-redux";
import {
  addProductDetail,
  allProducts,
  getAllProducts,
  isProductSearching,
  onSearchProduct,
  productError,
  productStatus,
  searchedproduct,
  setIsProductSearching,
} from "../product/productSlice";
import Loading from "../../components/Loading";
import { useNavigate } from "react-router-dom";
import { pagination } from "../training/trainingSlice";
import Contactus from "../../components/Contactus";

const Home = () => {
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const user = JSON.parse(localStorage.getItem("user"));

  const products = useSelector(allProducts);
  const prodStatus = useSelector(productStatus);
  const prodError = useSelector(productError);
  const searchResult = useSelector(searchedproduct);
  const isProdSeach = useSelector(isProductSearching);
  const page = useSelector(pagination);

  useEffect(() => {
    dispatch(getAllProducts({ page: page }));
  }, [dispatch, page]);

  return (
    <Layout>
      <div className="h-24"></div>
      {user ? null : <BuyNowCard />}
      {user ? (
        <div className="pt-2 relative text-gray-600 px-10">
          <input
        onChange={(e)=>{
          if(e.target.value != null || e.target.value !== ""){
            dispatch(setIsProductSearching(true))
            dispatch(onSearchProduct(e.target.value))
            
        
          }if(e.target.value == null || e.target.value == ""){
            dispatch(setIsProductSearching(false))
  
          }
        }}
            className="border-2 border-green-600 w-full bg-white h-10 px-5 pr-16 rounded-lg text-sm focus:outline-none"
            type="search"
            name="search"
            placeholder="Search"
          ></input>

        </div>
      ) : null}

      {/* <SortedBy /> */}

      {prodError ? (
        <p>error happen</p>
      ) : prodStatus === "loading" ? (
        <Loading />
      ) : prodStatus === "succeeded" && !isProdSeach ? (
        <div className="grid grid-cols-1 gap-5 px-10 my-10 sm:grid-cols-2 md:grid-cols-4">
          {products.map((product) => (
            <ProductCard
              name={product.name}
              description={product.description}
              price={product.price}
              prodImg={product.photo}
              postedBy={product.postedBy.firstName}
              onDetail={() => {
                dispatch(addProductDetail(product));
                navigate(`/product/${product._id}`);
              }}
            />
          ))}
        </div>
      ) :prodStatus === "succeeded" && isProdSeach?(
        <div className="grid grid-cols-1 gap-5 px-10 my-10 sm:grid-cols-2 md:grid-cols-4">
          {searchResult.map((product) => (
            <ProductCard
              name={product.name}
              description={product.description}
              price={product.price}
              prodImg={product.photo}
              postedBy={product.postedBy.firstName}
              onDetail={() => {
                dispatch(addProductDetail(product));
                navigate(`/product/${product._id}`);
              }}
            />
          ))}
        </div>
      ): null}
      <div className="mb-10">
        <Pagination />
        {user ? null : <WhatWeDo />}
        {/* {user ? null : <Contactus /> } */}
      </div>
    </Layout>
  );
};

export default Home;
