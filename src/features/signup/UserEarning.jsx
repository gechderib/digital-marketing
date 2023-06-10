import React, { useEffect } from "react";
import Layout from "../../components/layout/Layout";
import {
  getMyOffers,
  getMyOrders,
  myOffers,
  myOrders,
  orderStatus,
} from "../orders/myOrdersSlice";
import { useDispatch, useSelector } from "react-redux";

const UserEarning = () => {
  const user = JSON.parse(localStorage.getItem("user"));
  const token = user.accessToken;
  const myOrder = useSelector(myOffers);
  const orderStat = useSelector(orderStatus);
  const dispatch = useDispatch();

  useEffect(() => {
    dispatch(getMyOffers({ token }));
  }, [dispatch]);

  const totalSale = () => {
    let total = 0;
    let pending = 0;
    let accepted = 0;

    for (let i = 0; i < myOrder.length; i++) {
      const order = myOrder[i];
      console.log(order);
      if (order.accepted == "completed") {
        total += order.offerPrice * order.quantity;
      }
      if (order.accepted == "pending") {
        pending += order.offerPrice * order.quantity;
      }
      if (order.accepted == "accepted") {
        accepted += order.offerPrice * order.quantity;
      }
    }
    return [total, pending, accepted];
  };

  return (
    <Layout>
      <div className="mt-16 p-10 mb-24 ">
        {orderStat=="loading"?<p>loading</p>:orderStat=="succeeded"?  <div className="grid grid-cols-3 gap-5">
          <div className="p-10 cursor-pointer border border-gray-100 rounded-lg hover:bg-gray-50 text-slate-800 text-lg">
           <p className="underline text-slate-900 font-bold">Paid</p>
            <p>
              <span>Total-</span> {totalSale()[0]}ETB
            </p>
            <p>
              <span>Current Balance-</span> {totalSale()[0] * 0.98}ETB
            </p>
            <p>
              <span>Transaction Fee-</span> {totalSale()[0] * 0.2}ETB
            </p>
          </div>
          <div className="p-10 cursor-pointer border border-gray-100 rounded-lg hover:bg-gray-50 text-slate-800 text-lg">
           <p className="underline text-slate-900 font-bold">Pending...</p>
            <p>
              <span>Total</span> {totalSale()[1]}ETB
            </p>
            <p>
              <span>You Will Get</span> {totalSale()[1] * 0.98}ETB
            </p>
            <p>
              <span>Transaction Fee</span> {totalSale()[1] * 0.2}ETB
            </p>
          </div>
          <div className="p-10 cursor-pointer border border-gray-100 rounded-lg hover:bg-gray-50 text-slate-800 text-lg">
           <p className="underline text-slate-900 font-bold">Accepted</p>
            <p>
              <span>Total</span> {totalSale()[2]}ETB
            </p>
            <p>
              <span>You Will Get</span> {totalSale()[2] * 0.98}ETB
            </p>
            <p>
              <span>Transaction Fee</span> {totalSale()[2] * 0.2}ETB
            </p>
          </div>
        </div>:null}
      
      </div>
    </Layout>
  );
};

export default UserEarning;
