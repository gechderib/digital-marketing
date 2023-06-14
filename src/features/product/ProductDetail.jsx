import React, { useContext, useEffect, useState } from "react";
import DmfsseContex from "../../app/contextStore";
import { useDispatch, useSelector } from "react-redux";
import { addProductDetail, getOneProduct, productDetail } from "./productSlice";
import { addNewMessage } from "../../components/messages/messageSlice";
import { useNavigate, useParams } from "react-router-dom";
import Modal from "../../components/Modal";
import ModalOffer from "../orders/ModalOffer";

const ProductDetail = () => {
  const detailCtx = useContext(DmfsseContex);
  const user = JSON.parse(localStorage.getItem("user"));
  const dispatch = useDispatch();
  const product = useSelector(productDetail);
  const [message, setMessage] = useState("");
  const [requestStatus, setRequestStatus] = useState("idle");
  const navigate = useNavigate("");
  const messageInfo = {
    message: message,
  };

  const addMessage = async (e) => {
    e.preventDefault();

    setRequestStatus("idle");
    if (user) {
      const token = user.accessToken;
      const canSave = [message, token].every(Boolean);
      if (canSave) {
        try {
          setRequestStatus("pending");
          const response = await dispatch(
            addNewMessage({
              initalData: messageInfo,
              token,
              id: product.postedBy._id,
            })
          ).unwrap();
          if (response == "ERR_BAD_REQUEST") {
            setRequestStatus("bad_err");
          }
          if (response == "ERR_NETWORK") {
            setRequestStatus("net_err");
          }
          if (response.message) {
            setMessage("");
            navigate("/messages");
          }
        } catch (err) {
          setRequestStatus("failed");
        }
      }
    }
  };
  const backArrow = () => {
    if (user) {
      if (user.roles[0] == "agent" || user.roles[0] == "admin") {
        return (
          <div
            onClick={() => detailCtx.setShowDetail(false)}
            className="flex cursor-pointer px-5 py-1 rounded-lg self-center items-center"
          >
            <span class="material-symbols-outlined">arrow_back_ios</span>{" "}
            <p className="text-lg">Back</p>
          </div>
        );
      }
    } else {
      return null;
    }
  };
  const startChatButton = () => {
    if (user) {
      if(detailCtx.isChatStarted ||
        product.postedBy._id == user.id){
          return null
        }else {
          return                 <button
          style={{
            background:'#054112',
         }}
          onClick={() => {
            detailCtx.setShowDetail(false);
            if (user) {
              detailCtx.setIsChatStarted(true);
            } else {
              navigate("/login");
            }
          }}
          className={`${
            user.roles[0] == "admin" || user.roles[0] == "agent"
              ? "hidden"
              : ""
          }  flex ml-auto text-white bg-green-500 border-0 py-2 px-6 focus:outline-none hover:bg-green-600 rounded`}
        >
          Start Chat
        </button>
        }
    } else {
      return (
        <button
        style={{
          background:'#054112',
       }}
          onClick={() => {
            navigate("/login");
          }}
          className={`flex ml-auto text-white bg-green-500 border-0 py-2 px-6 focus:outline-none hover:bg-green-600 rounded`}
        >
          Start Chat
        </button>
      );
    }
  };
  return (
    <section className="text-gray-700 body-font overflow-hidden bg-white">
      {detailCtx.showModal ? <Modal /> : null}
      {detailCtx.showOfferModal ? <ModalOffer /> : null}
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
    
              {backArrow()}
            </div>
            <h1 className="text-gray-900 text-3xl title-font font-medium mb-1">
              {product.name}
            </h1>
            
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
                      <span class="material-symbols-outlined text-green-800">
                        verified
                      </span>
                    ) : null}
                  </p>
                </div>
              </div>
            </div>

            <div className="flex gap-2 justify-between">
              <div className="title-font font-medium text-2xl text-gray-900">
                <p>{product.price} ETB/KG</p>
              </div>
        
              {startChatButton()}

              {user && product.postedBy._id == user.id ? (
                <div className="flex gap-2">
                  <button
                  style={{
                    background:'#054112',
                 }}
                    onClick={() => {
                      navigate(`/editproduct/${product._id}`);
                    }}
                    className="flex ml-auto text-white bg-green-500 border-0 py-2 px-6 focus:outline-none hover:bg-green-600 rounded"
                  >
                    Edit
                  </button>
                  <button
                    onClick={() => {
                      detailCtx.setShowModal(true);
                      detailCtx.setDetailData(product);
                      dispatch(addProductDetail(product));
                    }}
                    className="flex ml-auto text-white bg-red-700 border-0 py-2 px-6 focus:outline-none hover:bg-red-800 rounded"
                  >
                    Delete
                  </button>
                </div>
              ) : null}
            </div>

            {detailCtx.isChatStarted &&
            user &&
            product.postedBy._id != user.id ? (
              <div
                className={`mt-4 ${
                  user.roles[0] == "admin" || user.roles[0] == "agent"
                    ? "hidden"
                    : ""
                }`}
              >
                <form onSubmit={addMessage}>
                  <div className="w-full mb-4 border border-gray-200 rounded-lg bg-gray-50 dark:bg-gray-700 dark:border-gray-600">
                    {requestStatus == "net_err" ? (
                      <p className="text-green-600 mb-4 italic animate-bounce font-thin">
                        Pleace check your connection
                      </p>
                    ) : requestStatus == "bad_err" ? (
                      <p className="text-green-600 mb-4 italic animate-bounce font-thin">
                        You are not allowed to add product
                      </p>
                    ) : requestStatus == "failed" ? (
                      <p className="mb-4 animate-bounce font-thin">
                        error happen please try again
                      </p>
                    ) : null}
                    <div className="flex m-2  justify-between items-center">
                      <div className="flex gap-3 ">
                        <button
                        style={{
                          background:'#054112',
                          color:'white'
                       }}
                          onClick={() => detailCtx.setShowOfferModal(true)}
                          class="text-green-dark font-thin py-2 px-4 border border-green-600 cursor-pointer rounded"
                        >
                          Make An Offer
                        </button>
                        
                      </div>
                      <div
                        className="cursor-pointer"
                        onClick={() => detailCtx.setIsChatStarted(false)}
                      >
                        <span class="material-symbols-outlined">close</span>
                      </div>
                    </div>
                    <div className="px-4 py-2 bg-white rounded-t-lg dark:bg-gray-800">
                      <label for="messasge" className="sr-only">
                        Your messasge
                      </label>
                      <textarea
                        onChange={(e) => setMessage(e.target.value)}
                        id="messasge"
                        rows="4"
                        value={message}
                        className="w-full px-0 text-sm text-gray-900 bg-white border-0  focus:ring-0 pl-3 pt-3"
                        placeholder="Write a message..."
                        required
                      ></textarea>
                    </div>
                    <div className="flex items-center justify-between px-3 py-2 border-t ">
                      <button
                      style={{
                        background:'#054112',
                     }}
                        type="submit"
                        className="inline-flex items-center gap-3 py-2.5 px-4 text-xs font-medium text-center text-white bg-green-700 rounded-lg focus:ring-4 focus:ring-blue-200  hover:bg-green-800"
                      >
                        <span class="material-symbols-outlined">chat</span>{" "}
                        <span>Send</span>
                      </button>
                    </div>
                  </div>
                </form>
              </div>
            ) : null}
          </div>
        </div>
      </div>
    </section>
  );
};

export default ProductDetail;
