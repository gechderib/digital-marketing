import React, { useEffect } from "react";
import Layout from "../../components/layout/Layout";
import ProductDetail from "../product/ProductDetail";
import {
  getOneProduct,
  productDetail,
  productError,
  productStatus,
} from "../product/productSlice";
import { useParams } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";

const ProductPage = () => {
  const { id } = useParams();
  
  const dispatch = useDispatch();
  const product = useSelector(productDetail);
  const status = useSelector(productStatus);
  const error = useSelector(productError);

  useEffect(() => {
    if(product.name == null){
      
        dispatch(getOneProduct(id))
    }
},[dispatch]) 
  return (
    <Layout>
      {status == "loading" ? (
        <p className="px-5 py-20">loading...</p>
      ) : status == "succeeded" ? (
        <div className="px-5 py-20">
          <ProductDetail />
        </div>
      ) : (
        <p className="px-5 py-20">error happen</p>
      )}
    </Layout>
  );
};

export default ProductPage;
