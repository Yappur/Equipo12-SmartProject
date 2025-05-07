import React from "react";
import ApplicationsTable from "../../components/Tables/ApplicationsTable";
import Sidebar from "../../components/Navigate/Sidebar";

const CandidatosDashboard = () => {
  return (
    <>
      <div className="flex min-h-screen">
        <Sidebar />
        <div className="flex-1 ml-0 md:ml-64 pt-16 flex flex-col items-center justify-center w-full px-4 sm:px-6 py-8 sm:py-12 gap-8 sm:gap-12 md:gap-16">
          <ApplicationsTable />
        </div>
      </div>
    </>
  );
};

export default CandidatosDashboard;
