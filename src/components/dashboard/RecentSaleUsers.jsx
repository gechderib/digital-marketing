import React from "react";
import User from "../cards/User";
import { useDispatch, useSelector } from "react-redux";
import { allOrders } from "../../features/orders/myOrdersSlice";
import { EthDateTime, limits } from "ethiopian-calendar-date-converter";
const RecentSaleUsers = () => {
  const orders = useSelector(allOrders);

  const recentSale = () => {
    let recentSales = [];
    for (let i = 0; i < orders.length; i++) {
      const order = orders[i];
      if (order.accepted == "completed") {
        recentSales.push(order);
      }
    }
    return recentSales;
  };

  return (
    <div className="flex flex-col gap-6 w-98 border border-green-100 pl-5 ml-3">
      <div className="flex justify-between">
        <p className="font-bold">Recent Sales</p>
        <p className="cursor-pointer hover:underline p-2">See All</p>
      </div>
      <div className="flex flex-col gap-6 p-2">
        {recentSale().map((sale) => { 
          const time = new Date(sale.updatedAt)
          const ethio = EthDateTime.fromEuropeanDate(time)
          return (
          <User
            amount={sale.offerPrice * sale.quantity}
            imgUrl={sale.product.photo}
            name={`${sale.orderBy.firstName} ${sale.orderBy.lastName}`}
            timeAgo={`${ethio}`}
            // .substring(0,25)
          />
        )})}
      </div>
    </div>
  );
};

export default RecentSaleUsers;
