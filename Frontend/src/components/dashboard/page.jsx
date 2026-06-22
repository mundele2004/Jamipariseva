import React from "react";
import Sidebar from "../Sidebar/page";
import { Outlet } from "react-router-dom";

function Dashboard() {
  return (
    <>
      <div className="flex flex-row bg-white w-full min-h-screen">
        <div className="h-[calc(100vh-5rem)] bg-richblue-300 w-[15rem] flex-shrink-0">
          <Sidebar />
        </div>
        <div className="flex-1 w-full h-[calc(100vh-5rem)] overflow-y-auto [scrollbar-width:none] p-4">
          <Outlet />
        </div>
      </div>
    </>
  );
}

export default Dashboard;
