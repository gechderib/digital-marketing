import React, { useEffect } from "react";
import Layout from "../../components/layout/Layout";
import { useDispatch, useSelector } from "react-redux";
import {
  addOrderDetail,
  getMyOffers,
  myOffers,
  orderError,
  orderStatus,
  updateOrder,
} from "./myOrdersSlice";
import OrderCard from "../../components/cards/OrderCard";
import Loading from "../../components/Loading";
import axios from "axios";

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
  if(myOffer == "ERR_BAD_REQUEST"){
   return <Layout>
   <div className="mt-16 mb-96 pt-10 ml-5">
      <p className="text-xl animate-bounce">You don't have an offer yet</p>
    </div>
   </Layout>

  }


  return (
    <Layout>
      <div className="mt-16 py-5 md:px-10">
        {offerStat == "loading" ? (
          <Loading />
        ) : offerStat == "failed" ? (
          <p>error happen</p>
        ) : offerErr ? (
          <p>error happen</p>
        ) : offerStat == "succeeded" ? (
          <div className="grid md:grid-cols-4 sm:grid-cols-2 gap-5">
            {myOffer.map((order) => (
              <OrderCard
              key={order._id}
              onDetail={()=>dispatch(addOrderDetail(order))}
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
                  dispatch(addOrderDetail(order))
                }}
                onReject={() => {
                  dispatch(
                    updateOrder({
                      newData: { accepted: "rejected" },
                      id: order._id,
                      token,
                    })
                  );
                  dispatch(addOrderDetail(order))
                }}
                onCheckout={()=>{}}
              />
            ))}
          </div>
        ) : null}
      </div>
    </Layout>
  );
};

export default MyOffers;
