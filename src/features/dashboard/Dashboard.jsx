import React, { useContext, useEffect } from "react";
import DashboardHome from "./DashboardHome";
import DmfsseContex from "../../app/contextStore";
import Inbox from "./Inbox";
import Training from "./Training";
import Users from "./Users";
import Products from "./Products";
import { useNavigate } from "react-router-dom";
import AdminLayout from "../../components/layout/AdminLayout";
import Forbidden from "../../components/error page/Forbidden";
import FarmerOfferes from "./FarmerOffer";

const Dashboard = () => {
  const dashboardCtx = useContext(DmfsseContex);
  const user = JSON.parse(localStorage.getItem("user"));
  const navigate = useNavigate();
  useEffect(() => {
    if (!user) {
      navigate("/login");
    }
  }, []);

  if (user && (user.roles[0] == "admin" || user.roles[0] == "agent")) {
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
          <FarmerOfferes />
        ) : null}
      </AdminLayout>
    );
  }
  return <Forbidden/>;
};

export default Dashboard;
