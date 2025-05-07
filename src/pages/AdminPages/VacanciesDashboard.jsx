import React from "react";
import VacanciesTable from "../../components/Tables/VacanciesTable";

const VacanciesDashboard = () => {
  return (
    <>
      <div className="flex min-h-screen">
        <VacanciesTable />
      </div>
    </>
  );
};

export default VacanciesDashboard;
