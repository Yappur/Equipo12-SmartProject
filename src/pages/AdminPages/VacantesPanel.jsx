import React from "react";
import VacantesTable from "../../components/Tables/VacantesTable";
import { Link } from "react-router-dom";
import { ChevronRight } from "lucide-react";

const VacantesPanel = () => {
  return (
    <div className="container mx-auto my-20">
      <Link to="/admin" className="mt-5 text-blue-500 flex">
        Volver atras <ChevronRight />
      </Link>
      <VacantesTable />
    </div>
  );
};

export default VacantesPanel;
