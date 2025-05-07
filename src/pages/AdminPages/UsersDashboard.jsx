import React from "react";
import UserTable from "../../components/Tables/UserTable";
import Sidebar from "../../components/Navigate/Sidebar";

const UsersDashboard = () => {
  return (
    <>
      <div className="flex min-h-screen">
        <UserTable />
      </div>
    </>
  );
};

export default UsersDashboard;
