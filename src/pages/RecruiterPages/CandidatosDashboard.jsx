// src/pages/RecruiterPages/CandidatosDashboard.jsx
import React, { useState, useEffect } from "react";
import { NavLink, useParams, Navigate } from "react-router-dom";
import axiosConfig from "../../helpers/axios.config";
import ApplicationsTable from "../../components/Tables/ApplicationsTable";

const CandidatosDashboard = () => {
  const { id } = useParams();
  const [vacante, setVacante] = useState(null);
  const [loadingVac, setLoadingVac] = useState(true);
  const [errorVac, setErrorVac] = useState(null);

  useEffect(() => {
    const fetchVacante = async () => {
      try {
        setLoadingVac(true);
        const res = await axiosConfig.get(`/vacancies/${id}`);
        if (!res.data) {
          setErrorVac("Vacante no encontrada");
        } else {
          setVacante(res.data);
        }
      } catch (err) {
        console.error("Error al cargar vacante:", err);
        setErrorVac("No se pudo cargar la vacante");
      } finally {
        setLoadingVac(false);
      }
    };
    fetchVacante();
  }, [id]);

  if (loadingVac) return <p className="pt-24 text-center">Cargando vacante…</p>;
  if (errorVac)   return <p className="pt-24 text-center text-red-500">{errorVac}</p>;

  const navItems = [
    { title: "Descripción",           path: `/reclutador/Descriptionvacancy/${id}` },
    { title: "Candidatos en proceso", path: `/reclutador/ver/candidatos/${id}` },
  ];

  return (
    <div className="pt-24 px-8 min-h-screen">
      {/* Nombre de la vacante */}
      <h1 className="text-3xl font-semibold text-black mb-6">{vacante.nombre}</h1>

      {/* Navegación interna */}
      <div className="relative mb-6 pb-2">
        <div className="flex space-x-6 border-b border-gray-300 pb-2">
          {navItems.map((item) => (
            <NavLink
              key={item.title}
              to={item.path}
              className={({ isActive }) =>
                `pb-2 relative font-medium transition-colors duration-200 ${
                  isActive ? "text-black" : "text-black hover:text-[#535353]"
                }`
              }
            >
              {({ isActive }) => (
                <span className="relative">
                  {item.title}
                  {isActive && (
                    <span className="absolute -bottom-[1px] left-0 right-0 h-[3px] bg-[#366FB6] rounded-full" />
                  )}
                </span>
              )}
            </NavLink>
          ))}
        </div>
      </div>

      {/* Tabla de postulaciones */}
      <ApplicationsTable vacancyId={id} />
    </div>
  );
};

export default CandidatosDashboard;
