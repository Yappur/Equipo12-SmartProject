import React from "react";
import VacanciesTable from "../../components/Tables/VacanciesTable";
import useCambiarTitulo from "../../hooks/useCambiarTitulo";

const VacanciesDashboard = () => {
  useCambiarTitulo("PanelVacantess");
  return (
    <>
      <div className="">
        <VacanciesTable />
      </div>
    </>
  );
};

export default VacanciesDashboard;
