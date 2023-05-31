import React, { useEffect } from "react";
import Layout from "../../components/layout/Layout";
import OrderCard from "../../components/cards/OrderCard";
import {
  getMyOrders,
  myOrders,
  orderError,
  orderStatus,
} from "./myOrdersSlice";
import { useDispatch, useSelector } from "react-redux";
import Loading from "../../components/Loading";
import axios from "axios";

const MyOrders = () => {
  const dispatch = useDispatch();
  const user = JSON.parse(localStorage.getItem("user"));
  const token = user.accessToken;

  const myOrder = useSelector(myOrders);
  const orderStat = useSelector(orderStatus);
  const orderErr = useSelector(orderError);

  useEffect(() => {
    dispatch(getMyOrders({ token }));
  }, [dispatch]);

  const chapaSecretKey = "CHASECK_TEST-inlmytxN7CFBwrf8Zm29DPgzYXnZsmrJ";

  const handleCheckOut = async (data) => {
    try {
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
      console.log(response);
    } catch (err) {
      console.log(err);
    }
  };

  return (
    <Layout>
      <div className="mt-16">
        {orderStat == "loading" ? (
          <Loading />
        ) : orderStat == "failed" ? (
          <p>error happen</p>
        ) : orderStat == "succeeded" ? (
          <div className="grid md:grid-cols-4 sm:grid-cols-2 gap-5">
            {myOrder.map((order) => (
              <OrderCard
                product={order.product}
                price={order.offerPrice}
                quantity={order.quantity}
                status={order.accepted}
                onAccept={() => {}}
                onReject={() => {}}
                onCheckout={() => {
                  handleCheckOut({
                    amount: "100",
                    currency: "ETB",
                    email: "abebech_bekele@gmail.com",
                    first_name: "Bilen",
                    last_name: "Gizachew",
                    phone_number: "0912345678",
                    tx_ref: "iohkjp-6669",
                    callback_url:
                      "https://webhook.site/077164d6-29cb-40df-ba29-8a00e59a7e60",
                    return_url: "https://www.google.com/",
                    "customization[title]": "Payment for my favourite merchant",
                    "customization[description]": "I love online payments.",
                  });
                }}
              />
            ))}
          </div>
        ) : null}
      </div>
    </Layout>
  );
};

export default MyOrders;
