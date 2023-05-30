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
  console.log(myOrder);

  return (
    <Layout>
      <div className="mt-16">
        {orderStat == "loading" ? (
          <p>loading....</p>
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
                onCheckout={() => {}}
                onReject={() => {}}
              />
            ))}
          </div>
        ) : null}
      </div>
    </Layout>
  );
};

export default MyOrders;
