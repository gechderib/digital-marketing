import React, { useEffect } from "react";
import Layout from "../../components/layout/Layout";
import { useDispatch, useSelector } from "react-redux";
import { useNavigate } from "react-router-dom";
import { addProductDetail, getMyProducts, myProducts, productError, productStatus } from "./productSlice";
import Loading from "../../components/Loading";
import ProductCard from "../../components/cards/ProductCard";

const MyProducts = () => {
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const user = JSON.parse(localStorage.getItem("user"));
  const token = user.accessToken

  const products = useSelector(myProducts);
  const prodStatus = useSelector(productStatus);
  const prodError = useSelector(productError);

  useEffect(() => {
    dispatch(getMyProducts({ token }));
  }, [dispatch]);
console.log(prodStatus)
  return (
    <Layout>
      <div className="h-24"></div>
      {prodError ? (
        <p>error happen </p>
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
              onDetail={() => {
                dispatch(addProductDetail(product));
                navigate(`/product/${product._id}`);
              }}
            />
          ))}
        </div>
      ) : null}

      {/* <Pagination /> */}
    </Layout>
  );
};

export default MyProducts;
