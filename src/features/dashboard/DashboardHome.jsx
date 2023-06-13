import React, { useEffect, useState } from "react";
import DashboardCard from "../../components/cards/DashboardCard";
import BlackCard from "../../components/cards/BlackCard";
import TableOrders from "../../components/dashboard/TableOrders";
import RecentSaleUsers from "../../components/dashboard/RecentSaleUsers";
import { useDispatch, useSelector } from "react-redux";
import { allFarmers, allUsers, getAllFarmers, getAllUsers } from "../signup/signupSlice";
import { allOrders, getAllOrders } from "../orders/myOrdersSlice";
import GraphDashboard from "../../components/dashboard/GraphDashboard";

const DashboardHome = () => {
  const user = JSON.parse(localStorage.getItem("user"));
  const token = user.accessToken;
  const dispatch = useDispatch();
  const users = useSelector(allUsers);
  const farmers = useSelector(allFarmers)
  const orders = useSelector(allOrders);

  useEffect(() => {
    const getAll = async () => {
      if(user.roles[0] == "admin"){
        dispatch(getAllUsers({ token }));

      }
      if(user.roles[0] == "agent"){
      dispatch(getAllFarmers({ token }));

      }
      dispatch(getAllOrders({ token }));
    };
    getAll();
  }, []);

  const totalSale = () => {
    let total = 0;
    for (let i = 0; i < orders.length; i++) {
      const order = orders[i];
      if (order.accepted == "completed") {
        total += order.offerPrice * order.quantity;
      }
     
    }
    return total;
  };

  return (
    <div className="p-4 mt-11 sm:ml-64">
      <div className="p-4 rounded-lg dark:border-gray-700">
        <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-4 gap-10 mb-4">
          <DashboardCard
            name={"Total Users"}
            amount={user.roles[0] =="admin"?users.length: farmers.length}
            percent={4.7}
            icon={"group"}
          />
          <DashboardCard
            name={"Total Sale"}
            amount={`${totalSale()} ETB`}
            percent={3.2}
            icon={"paid"}
          />
          <DashboardCard
            name={"Today Sessions"}
            amount={orders.length}
            percent={1.2}
            icon={"auto_graph"}
          />
          <DashboardCard
            name={"Total Revenue"}
            amount={`${(totalSale() * 0.02).toFixed(2)}`}
            percent={1.2}
            icon={"auto_graph"}
          />
        </div>

        <div className="">
          <div className="md:flex justify-between mb-4 items-start my-10">
            <GraphDashboard />
            <RecentSaleUsers />
          </div>
          <TableOrders />
        </div>
      </div>
    </div>
  );
};

export default DashboardHome;
