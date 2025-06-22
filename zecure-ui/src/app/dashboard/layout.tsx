import React from "react";
import Sidebar from "@/components/Sidebar";
import Navbar from "@/components/Navbar";
import "@/styles/globals.scss";

export default function DashboardLayout({ children }: { children: React.ReactNode }) {
  return (
    <div className="zecure-dashboard-layout">
      <Sidebar />
      <div className="zecure-dashboard-main">
        <Navbar />
        <div className="zecure-dashboard-content">{children}</div>
      </div>
    </div>
  );
}