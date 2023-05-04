import React from "react";
import DashboardCard from "../../components/cards/DashboardCard";
import BlackCard from "../../components/cards/BlackCard";
import TableOrders from "../../components/dashboard/TableOrders";
import RecentSaleUsers from "../../components/dashboard/RecentSaleUsers";

const DashboardHome = () => {
  return (
    <div className="p-4 mt-11 sm:ml-64">
      <div className="p-4 rounded-lg dark:border-gray-700">
        <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-4 gap-10 mb-4">
          <DashboardCard
            name={"Total Users"}
            amount={5738}
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
