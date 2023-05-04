import React from "react";
import HomeNav from "../nav/HomeNav";
import SideBar from "../dashboard/SideBar";

const AdminLayout = ({ children }) => {
  return (
    <div>
      <HomeNav />
      <SideBar />
      {children}
    </div>
  );
};

export default AdminLayout;
