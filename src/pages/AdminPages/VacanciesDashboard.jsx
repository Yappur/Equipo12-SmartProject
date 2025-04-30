import React from "react";
import VacanciesTable from "../../components/Tables/VacanciesTable";
import { Link } from "react-router-dom";
import { ChevronRight } from "lucide-react";

const VacanciesDashboard = () => {
  return (
    <div className="container mx-auto my-20">
      <Link to="/admin" className="mt-5 text-blue-500 flex">
        Volver atras <ChevronRight />
      </Link>
      <VacanciesTable />
    </div>
  );
};

export default VacanciesDashboard;
