import React, { useState, useEffect } from "react";
import { NavLink, useParams } from "react-router-dom";
import axiosConfig from "../../helpers/axios.config";
import {
  FiCheckCircle,
  FiUsers,
  FiBriefcase,
  FiCalendar,
} from "react-icons/fi";
import { FaRegClipboard } from "react-icons/fa6";

const isAuthenticated = true;

const RecuiterVacancyView = () => {
  const { id } = useParams();
  const [vacante, setVacante] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    const obtenerVacante = async () => {
      try {
        console.log("Renderizó la vista del reclutador");

        const response = await axiosConfig.get(`/vacancies/${id}`);
        console.log("Vacantes obtenidas:", response.data);

        if (!response.data) {
          console.warn("Vacante no encontrada con ID:", id);
          setError("No se encontró la vacante con ese ID.");
        } else {
          console.log("Vacante encontrada:", response.data);
          setVacante(response.data);
        }
      } catch (error) {
        console.error(
          "Error al obtener vacantes:",
          error.response?.data || error.message
        );
        setError("No se pudo cargar la vacante");
      } finally {
        setLoading(false);
      }
    };

    obtenerVacante();
  }, [id]);

  if (loading) return <p className="pt-24 text-center">Cargando...</p>;
  if (error) return <p className="pt-24 text-center text-red-500">{error}</p>;
  if (!vacante)
    return <p className="pt-24 text-center">Vacante no encontrada.</p>;

  const navItems = [
    { title: "Descripción", path: "#" },
    {
      title: "Candidatos en proceso",
      path: `/reclutador/ver/candidatos/${id}`,
    },
  ];

  return (
    <div className="container mx-auto py-10 px-4 sm:px-8">
      <h1 className="text-3xl font-medium text-[#152D53] mb-10">
        {vacante.nombre} {vacante.puesto}
      </h1>

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
        <h2 className="text-2xl mt-10 text-black">Sobre el puesto</h2>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-3 gap-10 w-full">
        <div className="md:col-span-2 space-y-6 bg-gray-100">
          <section className=" rounded-lg p-6">
            <h2 className="text-lg font-medium mb-2">Descripción</h2>
            <p className="text-sm text-[#535353]">
              {vacante.descripcion || "Sin resumen descripcion."}
            </p>
            <h2 className="text-lg font-medium mb-2 mt-4">Requisitos</h2>
            <ul className="list-disc pl-5 text-sm text-[#535353] space-y-1">
              {(vacante.requisitos || []).map((req, i) => (
                <li key={i}>{req}</li>
              ))}
            </ul>
            <h2 className="text-lg font-semibold mb-2 mt-4"></h2>
            <p className="text-sm text-gray-700">
              {vacante.responsabilidades ||
                "Sin responsabilidades disponibles."}
            </p>
          </section>
        </div>

        {/* Columna Derecha */}
        <div className="space-y-4 text-sm p-4 rounded-md bg-white/50">
          <h2 className="text-xl md:text-2xl font-semibold">Detalles</h2>
          <div className="flex items-start space-x-2">
            <FaRegClipboard className="w-5 h-5 mt-0.5 flex-shrink-0" />
            <span className="font-medium break-words">Experiencia:</span>
            <span>{vacante.experiencia || "Sin experiencia"}</span>
          </div>
          <div className="flex items-start space-x-2">
            <FiBriefcase className="w-5 h-5 mt-0.5 flex-shrink-0" />
            <span className="font-medium break-words">Modalidad: </span>
            <span>{vacante.modalidad || "Remoto"}</span>
          </div>

          <div className="flex items-start space-x-2">
            <FiUsers className="w-5 h-5 mt-0.5 flex-shrink-0" />
            <span className="font-medium break-words">Ubicación:</span>
            <span>{vacante.ubicacion || "N/A"}</span>
          </div>
          <div className="flex items-start space-x-2">
            <FiCalendar className="w-5 h-5 mt-0.5 flex-shrink-0" />
            <span className="font-medium break-words">Jornada:</span>
            <span>{vacante.jornada || "Completa"}</span>
          </div>

          <div className="flex items-start space-x-2">
            <FiCheckCircle className="w-5 h-5 mt-0.5 flex-shrink-0" />
            <span className="font-medium break-words">Estado:</span>
            <span>{vacante.estado}</span>
          </div>
        </div>
      </div>
    </div>
  );
};

export default RecuiterVacancyView;
