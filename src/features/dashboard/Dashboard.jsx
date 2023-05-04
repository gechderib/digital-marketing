import React, { useContext } from "react";
import SideBar from "../../components/dashboard/SideBar";
import HomeNav from "../../components/nav/HomeNav";
import DashboardHome from "./DashboardHome";
import DmfsseContex from "../../app/contextStore";
import Inbox from "./Inbox";
import Training from "./Training";
import Users from "./Users";
import Register from "./Register";
import Products from "./Products";
import { useNavigate } from "react-router-dom";
import AdminLayout from "../../components/layout/AdminLayout";

const Dashboard = () => {
  const dashboardCtx = useContext(DmfsseContex);
  return (
    <AdminLayout>
      {dashboardCtx.dashboardTab == "dashboard" ? (
        <DashboardHome />
      ) : dashboardCtx.dashboardTab == "training" ? (
        <Training />
      ) : dashboardCtx.dashboardTab == "inbox" ? (
        <Inbox />
      ) : dashboardCtx.dashboardTab == "users" ? (
        <Users />
      ) : dashboardCtx.dashboardTab == "products" ? (
        <Products />
      ) : dashboardCtx.dashboardTab == "register" ? (
        <Register />
      ) : null}
    </AdminLayout>
  );
};

export default Dashboard;
