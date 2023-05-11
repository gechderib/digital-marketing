import React, { useEffect } from "react";
import BuyNowCard from "../../components/cards/BuyNowCard";
import HomeNav from "../../components/nav/HomeNav";
import SortedBy from "../../components/SortedBy";
import ProductCard from "../../components/cards/ProductCard";
import Pagination from "../../components/Pagination";
import Footer from "../../components/Footer";
import Layout from "../../components/layout/Layout";
import { useDispatch, useSelector } from "react-redux";
import {
  addProductDetail,
  allProducts,
  getAllProducts,
  productError,
  productStatus,
} from "../product/productSlice";
import Loading from "../../components/Loading";
import { useNavigate } from "react-router-dom";

const Home = () => {
  const dispatch = useDispatch();
  const navigate = useNavigate()

  const products = useSelector(allProducts);
  const prodStatus = useSelector(productStatus);
  const prodError = useSelector(productError);


  useEffect(() => {
    dispatch(getAllProducts({ page: 0 }));
  }, [dispatch]);

  return (
    <Layout>
      <div className="h-24"></div>
      <BuyNowCard />
      {/* <SortedBy /> */}

      {prodError ? (
        <p>error happen</p>
      ) : prodStatus === "loading" ? (
        <Loading />
      ) : prodStatus === "succeeded" ? (
        <div className="grid grid-cols-1 gap-5 px-10 my-10 sm:grid-cols-2 md:grid-cols-4">
          {products.map((product) => (
            <ProductCard
              name={product.name}
              description={product.description}
              price={product.price}
              prodImg={product.photo}
              postedBy={product.postedBy.firstName}
              onDetail={()=>{
                dispatch(addProductDetail(product))
                navigate("/product")
              }}
            />
          ))}
        </div>
      ) : null}

      <Pagination />
    </Layout>
  );
};

export default Home;
