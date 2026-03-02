import React from "react";
import { Outlet } from "react-router-dom";
import Sidebar from "./Sidebar";
import Topbar from "./Topbar";
import BottomBar from "./BottomBar";

export default function AppLayout() {
  return (
    <div>
      <div className="w-full top">
        <Topbar />
      </div>
      <div className="flex">
        <Sidebar />
        <div className="flex-1  w-full h-[90vh] overflow-y-auto flex-wrap bg-[#E8EBF9] font-sans [&::-webkit-scrollbar]:hidden [-ms-overflow-style:'none'] [scrollbar-width:'none']">
          <Outlet />
          <div>
            <BottomBar />
          </div>
        </div>
      </div>
    </div>
  );
}
