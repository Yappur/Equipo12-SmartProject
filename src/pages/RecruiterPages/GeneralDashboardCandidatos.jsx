import React, { use } from "react";
import { useParams } from "react-router-dom";
import GeneralApplicationsTable from "../../components/Tables/GeneralAplicationTable";
import useCambiarTitulo from "../../hooks/useCambiarTitulo";

const GeneralCandidatosDashboard = () => {
  useCambiarTitulo("Candidatos");
  const { id } = useParams();

  const navItems = [
    { title: "Descripción", path: `/reclutador/Descriptionvacancy/${id}` },
    {
      title: "Candidatos en proceso",
      path: `/reclutador/ver/candidatos/${id}`,
    },
  ];

  return (
    <div className="p-1 ">
      <div>
        <GeneralApplicationsTable />
      </div>
    </div>
  );
};

export default GeneralCandidatosDashboard;
