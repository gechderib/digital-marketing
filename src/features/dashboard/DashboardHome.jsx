import React, { useEffect } from "react";
import DashboardCard from "../../components/cards/DashboardCard";
import BlackCard from "../../components/cards/BlackCard";
import TableOrders from "../../components/dashboard/TableOrders";
import RecentSaleUsers from "../../components/dashboard/RecentSaleUsers";
import { useDispatch, useSelector } from "react-redux";
import { allUsers, getAllUsers } from "../signup/signupSlice";

const DashboardHome = () => {
  const user = JSON.parse(localStorage.getItem("user"));
  const token = user.accessToken;
  const dispatch = useDispatch();
  const users = useSelector(allUsers);

  useEffect(() => {
    dispatch(getAllUsers({ token }));
  }, [dispatch]);
  
  return (
    <div className="p-4 mt-11 sm:ml-64">
      <div className="p-4 rounded-lg dark:border-gray-700">
        <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-4 gap-10 mb-4">
          <DashboardCard
            name={"Total Users"}
            amount={users.length}
            percent={4.7}
            icon={"group"}
          />
          <DashboardCard
            name={"Total Sale"}
            amount={"Br.34590"}
            percent={3.2}
            icon={"paid"}
          />
          <DashboardCard
            name={"Today Sessions"}
            amount={567}
            percent={1.2}
            icon={"auto_graph"}
          />
          <BlackCard />
        </div>

        <div className="md:flex justify-between mb-4 gap-10 items-start">
          <TableOrders />
          <RecentSaleUsers />
        </div>
      </div>
    </div>
  );
};

export default DashboardHome;
