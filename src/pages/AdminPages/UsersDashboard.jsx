import React from "react";
import UserTable from "../../components/Tables/UserTable";
import Sidebar from "@/components/barrasDeNavegacion/Sidebar";

const UsersDashboard = () => {
  return (
    <>
      <div className="flex min-h-screen">
        <Sidebar />
        <div className="flex-1 ml-0 md:ml-64 pt-16 flex flex-col items-center justify-center w-full px-4 sm:px-6 py-8 sm:py-12 gap-8 sm:gap-12 md:gap-16">
          <UserTable />
        </div>
      </div>
    </>
  );
};

export default UsersDashboard;
