import React, { useEffect } from "react";
import Layout from "../../components/layout/Layout";
import { useDispatch, useSelector } from "react-redux";
import {
  getMyOffers,
  myOffers,
  orderError,
  orderStatus,
  updateOrder,
} from "./myOrdersSlice";
import OrderCard from "../../components/cards/OrderCard";

const MyOffers = () => {
  const dispatch = useDispatch();
  const user = JSON.parse(localStorage.getItem("user"));
  const token = user.accessToken;

  const myOffer = useSelector(myOffers);
  const offerStat = useSelector(orderStatus);
  const offerErr = useSelector(orderError);

  useEffect(() => {
    dispatch(getMyOffers({ token }));
  }, [dispatch]);
  console.log(myOffer);
  return (
    <Layout>
      <div className="mt-16">
        {offerStat == "loading" ? (
          <p>loading....</p>
        ) : offerStat == "failed" ? (
          <p>error happen</p>
        ) : offerErr ? (
          <p>error happen</p>
        ) : offerStat == "succeeded" ? (
          <div className="grid md:grid-cols-4 sm:grid-cols-2 gap-5">
            {myOffer.map((order) => (
              <OrderCard
                product={order.product}
                price={order.offerPrice}
                quantity={order.quantity}
                status={order.accepted}
                onAccept={() => {
                  dispatch(
                    updateOrder({
                      newData: { accepted: "accepted" },
                      id: order._id,
                      token,
                    })
                  );
                }}
                onReject={() => {
                  dispatch(
                    updateOrder({
                      newData: { accepted: "rejected" },
                      id: order._id,
                      token,
                    })
                  );
                }}
                onCheckout={() => {}}
              />
            ))}
          </div>
        ) : null}
      </div>
    </Layout>
  );
};

export default MyOffers;
