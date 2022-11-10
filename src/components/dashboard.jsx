import React, { useEffect } from "react";
import { useSelector } from "react-redux";
import { Outlet } from "react-router-dom";
import Navbar from "./common/navbar";

function Dashboard() {
  return (
    <div
      className="grid h-screen"
      style={{
        gridTemplateRows: "12% 88%",
      }}
    >
      <Navbar />
      <Outlet />
    </div>
  );
}

export default Dashboard;
