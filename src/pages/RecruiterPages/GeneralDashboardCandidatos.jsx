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
    <div className=" px-8 min-h-screen">
      <div className="relative mb-6 pb-2">
        <div className="flex space-x-6 border-b border-gray-300"></div>
      </div>

      <div>
        <GeneralApplicationsTable />
      </div>
    </div>
  );
};

export default GeneralCandidatosDashboard;
