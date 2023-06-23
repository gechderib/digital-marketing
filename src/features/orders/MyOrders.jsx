import React, { useEffect, useState } from "react";
import Layout from "../../components/layout/Layout";
import OrderCard from "../../components/cards/OrderCard";
import {
  addOrderDetail,
  getMyOrders,
  myOrders,
  orderError,
  orderStatus,
} from "./myOrdersSlice";
import { useDispatch, useSelector } from "react-redux";
import Loading from "../../components/Loading";
import axios from "axios";
import { useNavigate } from "react-router-dom";
import PaymentModal from "../../components/PaymentModal";

const MyOrders = () => {
  const navigate = useNavigate();
  const dispatch = useDispatch();
  const user = JSON.parse(localStorage.getItem("user"));
  const token = user.accessToken;

  const myOrder = useSelector(myOrders);
  const orderStat = useSelector(orderStatus);
  const orderErr = useSelector(orderError);
  const [paymentStatus, setPaymentStatus] = useState("idle");
  const mainUrl =
    "https://digital-marketing-for-farmers-and-sse.onrender.com/api/dmfsse";

  useEffect(() => {
    dispatch(getMyOrders({ token }));
  }, [dispatch]);

  const chapaSecretKey = "CHASECK_TEST-inlmytxN7CFBwrf8Zm29DPgzYXnZsmrJ";

  const handleCheckOut = async (data) => {
    setPaymentStatus("idle");
    try {
      setPaymentStatus("pending");

      // const response = await axios.post(`${mainUrl}/chapapay`,data,{headers:{'x-access-token':token}})
      // console.log(response)
      // console.log("kkkkkkkkkkk")
      // if (response.data.status == "success") {

      //   window.open(`${response.data.data.checkout_url}`,'_blank', 'rel=noopener noreferrer')
      //   setPaymentStatus("idle");
      // } else if (response.data.status == "failed") {
      //   setPaymentStatus("failed");
      // }

      const response = await axios.post(
        "https://api.chapa.co/v1/transaction/initialize",
        data,
        {
          headers: {
            Authorization: `Bearer ${chapaSecretKey}`,
            "Content-Type": "application/json",
            "Access-Control-Allow-Origin": `*`,
          },
        }
      );
      if (response.data.status == "success") {
        window.open(
          `${response.data.data.checkout_url}`,
          "_blank",
          "rel=noopener noreferrer"
        );
        setPaymentStatus("idle");
      } else if (response.data.status == "failed") {
        setPaymentStatus("failed");
      }
    } catch (err) {
      setPaymentStatus("failed");
    }
  };

  return (
    <Layout>
      <div className="mt-16 py-5 md:px-10">
        {orderStat == "loading" ? (
          <Loading />
        ) : orderStat == "failed" ? (
          <p>error happen</p>
        ) : orderStat == "succeeded" ? (
          <div className="">
            {paymentStatus == "pending" ? (
              <PaymentModal
                message={"Wait a minute your payment is processing"}
                title={"Redirecting to Payment..."}
                ontryAgain={""}
                status={"pending"}
              />
            ) : paymentStatus == "failed" ? (
              <PaymentModal
                message={"Please try again your payment is not done!!"}
                title={"Failed..."}
                ontryAgain={() => setPaymentStatus("idle")}
                status={"failed"}
              />
            ) : null}
            <div className="grid md:grid-cols-4 sm:grid-cols-2 gap-5">
              {myOrder.map((order) => (
                <OrderCard
                  key={order._id}
                  onDetail={() => {
                    dispatch(addOrderDetail(order));
                    navigate(`/order/${order._id}`);
                  }}
                  product={order.product}
                  price={order.offerPrice}
                  quantity={order.quantity}
                  status={order.accepted}
                  onAccept={() => {
                    dispatch(addOrderDetail(order));
                  }}
                  onReject={() => {
                    dispatch(addOrderDetail(order));
                  }}
                  onCheckout={() => {
                    handleCheckOut({
                      amount: `${order.offerPrice}`,
                      currency: "ETB",
                      email: "abebech_bekele@gmail.com",
                      first_name: `${order.orderBy.firstName}`,
                      last_name: `${order.orderBy.lastName}`,
                      phone_number: `${order.orderBy.phoneNumber}`,
                      tx_ref: `${order._id}`,
                      callback_url:
                        "https://webhook.site/077164d6-29cb-40df-ba29-8a00e59a7e60",
                      return_url: "https://shemeta.netlify.app/payment_succeessful",
                      "customization[title]":
                        "Payment for my favourite merchant",
                      "customization[description]": "I love online payments.",
                    });
                    localStorage.setItem("order", JSON.stringify(order));
                    dispatch(addOrderDetail(order));
                  }}
                />
              ))}
            </div>
          </div>
        ) : null}
      </div>
    </Layout>
  );
};

export default MyOrders;
