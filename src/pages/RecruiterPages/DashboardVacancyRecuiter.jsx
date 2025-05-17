import React from "react";
import VacanciesTable from "../../components/Tables/VacanciesTable";
import useCambiarTitulo from "../../hooks/useCambiarTitulo";

const DashboardVacancyRecuiter = () => {
  useCambiarTitulo("MisVacantes");
  return (
    <>
      <div className="">
        <VacanciesTable />
      </div>
    </>
  );
};

export default DashboardVacancyRecuiter;
