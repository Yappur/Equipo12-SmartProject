import React from "react";
import VacanciesTable from "../../components/Tables/VacanciesTable";

const VacanciesDashboard = () => {
  return (
    <>
      <div className="">
        <VacanciesTable isAdmin/>
      </div>
    </>
  );
};

export default VacanciesDashboard;
