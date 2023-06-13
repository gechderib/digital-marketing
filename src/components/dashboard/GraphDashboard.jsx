import React, { useEffect, useState } from "react";
import { useSelector } from "react-redux";
import { allOrders } from "../../features/orders/myOrdersSlice";

const GraphDashboard = () => {
  const orders = useSelector(allOrders);

  const getDailySale = () => {
    const currentMonth = new Date().getMonth();
    const currentDate = new Date().getDate();
    var dailySale = [0, 0, 0, 0, 0, 0, 0];

    for (let i = 0; i < orders.length; i++) {
      const order = orders[i];
      const orderMon = new Date(order.updatedAt).getMonth();
      const orderDate = new Date(order.updatedAt).getDay();


      if (order.accepted == "completed") {
        dailySale[orderDate] += order.offerPrice*order.quantity;

      }
    }
    return dailySale;
  };
  const day = ["Sun","Mon", "Tue", "Wed", "Thu", "Fri", "Sat"];
  const maxSale = Math.max(...getDailySale());
  return (
    <div class="flex flex-col items-center md:w-2/3 p-6 pb-6 bg-light-grey rounded-lg shadow-xl sm:p-8">
      <h2 class="text-xl font-bold">Daily Sale</h2>
      <span class="text-sm font-semibold text-gray-500">2023</span>
      <div class="flex items-end flex-grow w-full mt-5 space-x-2 sm:space-x-3">
        {getDailySale().map((sale, index) => {
          return (
            <div class="relative flex flex-col items-center flex-grow pb-5 group">
              <span class="absolute top-0 hidden -mt-6 text-xs font-bold group-hover:block">
                {sale}ETB
              </span>
              <div class={`relative flex justify-center w-full animate-pulse bg-indigo-400`} style={{"height":`${sale/maxSale *100}px`}}></div>
              <span class="absolute bottom-0 text-xs font-bold">{day[index]}</span>
            </div>
          );
        })}
      </div>
    </div>
  );
};

export default GraphDashboard;
