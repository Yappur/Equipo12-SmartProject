import React from "react";
import { NavLink, useParams } from "react-router-dom";
import ApplicationsTable from "../../components/Tables/ApplicationsTable";

const CandidatosDashboard = () => {
  const { id } = useParams();

  const navItems = [
    { title: "Descripción", path: `/reclutador/Descriptionvacancy/${id}` },
    { title: "Candidatos en proceso", path: `/reclutador/ver/candidatos/${id}` },
  ];

  return (
    <div className="pt-24 px-8 min-h-screen">
      <div className="relative mb-6 pb-2">
  <div className="flex space-x-6 border-b border-gray-300">
    {navItems.map((item) => (
      <NavLink
        key={item.title}
        to={item.path}
        className={({ isActive }) =>
          `pb-2 relative font-semibold transition-colors duration-200 ${
            isActive ? "text-black" : "text-black hover:text-[#535353]"
          }`
        }
      >
        {({ isActive }) => (
          <span className="relative">
            {item.title}
            {isActive && (
              <span className="absolute -bottom-[1px] left-0 right-0 h-[3px] bg-[#366FB6] rounded-full"></span>
            )}
          </span>
        )}
      </NavLink>
    ))}
  </div>
</div>

      <div>
        <ApplicationsTable />
      </div>
    </div>
  );
};

export default CandidatosDashboard;
