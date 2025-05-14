import React from "react";
import Sidebar from "./Sidebar";
import AdminNavbar from "./Navbar";
import { Outlet } from "react-router-dom";

export default function CompleteNavbarLayout() {
  return (
    <div className="flex flex-col md:flex-row min-h-screen bg-gray-50">
      <Sidebar />

      <div className="flex-1 flex flex-col md:ml-64">
        <AdminNavbar />
        <main className="p-4 md:p-6 flex-1 overflow-auto">
          <Outlet />
        </main>
      </div>
    </div>
  );
}
