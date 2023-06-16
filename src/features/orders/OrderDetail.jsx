import React, { useContext, useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import OrderDetailModal from "./OrderDetailModal";
import DmfsseContex from "../../app/contextStore";
import Layout from "../../components/layout/Layout";
import {
  getOneOrder,
  orderDetail,
  orderError,
  orderStatus,
} from "./myOrdersSlice";
import Modal from "../../components/Modal";
import { useParams } from "react-router-dom";

const OrderDetail = () => {
  const myOrd = useSelector(orderDetail);
  const detailCtx = useContext(DmfsseContex);
  const user = JSON.parse(localStorage.getItem("user"));
  const token = user.accessToken;
  const { id } = useParams();

  const dispatch = useDispatch();
  const status = useSelector(orderStatus);
  const error = useSelector(orderError);

  useEffect(() => {
    if (myOrd.offerPrice == null) {
      dispatch(getOneOrder({ id, token }));
    }
  }, [dispatch]);



  return (
    <Layout>
      {status == "loading" ? (
        <p className="mt-11 p-5">Loading...</p>
      ) : status == "succeeded" ? (
        <section className="text-gray-700 body-font overflow-hidden bg-white">
          {detailCtx.showModal ? <Modal /> : null}
          {detailCtx.showOfferModal ? <OrderDetailModal /> : null}
          <div className="container">
            <div className="lg:w-11/12 flex flex-wrap">
              <img
                alt="ecommerce"
                className="lg:w-1/2 w-full object-cover object-center rounded border border-gray-200"
                src={myOrd.product.photo}
              ></img>
              <div className="lg:w-1/2 w-full lg:pl-10 lg:py-6 mt-6 lg:mt-0">
                <div className="flex justify-between">
                  <h2 className="text-sm title-font text-gray-500 tracking-widest uppercase">
                    {myOrd.orderBy.phoneNumber}
                  </h2>
                </div>
                <h1 className="text-gray-900 text-3xl title-font font-medium mb-1">
                  {myOrd.product.name}
                </h1>

                <p className="leading-relaxed">{myOrd.product.description} </p>
                <div className="flex mt-6 items-center pb-5 border-b-2 border-gray-200 mb-5">
                  <div>
                    <p className="mb-5">
                      Amount <span>{myOrd.product.amount} KG</span>
                    </p>
                  </div>
                </div>

                <div className="flex gap-2 justify-between">
                  <div className="title-font font-medium text-2xl text-gray-900">
                    <p>{myOrd.product.price} ETB/KG</p>
                  </div>

                  <div className="flex gap-2" disabled>
                    <button
                      disabled={myOrd.accepted != "completed" ? false : true}
                      style={{
                        background: "#054112",
                      }}
                      onClick={() => {
                        detailCtx.setShowOfferModal(true);
                      }}
                      className="flex ml-auto text-white bg-green-500 border-0 py-2 px-6 focus:outline-none hover:bg-green-600 rounded"
                    >
                      Edit
                    </button>
                    <button
                      //   disabled={myOrd.accepted == "completed"?false:true}
                      onClick={() => {
                        detailCtx.setShowModal(true);
                      }}
                      className="flex ml-auto text-white bg-red-700 border-0 py-2 px-6 focus:outline-none hover:bg-red-800 rounded"
                    >
                      Delete
                    </button>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </section>
      ) : (
        <p>error</p>
      )}
    </Layout>
  );
};

export default OrderDetail;
