import React, { useState, useEffect } from "react";
import { NavLink, useParams } from "react-router-dom";

import axiosConfig from "../../helpers/axios.config";


// Suponiendo que tienes un estado global o un contexto para manejar si el usuario está logueado
const isAuthenticated = true; // Aquí deberías revisar el estado real de autenticación

const RecuiterVacancyView = () => {
  const { id } = useParams(); // Obtener el ID de la vacante desde la URL
  const [vacante, setVacante] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    const obtenerVacante = async () => {
      try {
        console.log("Renderizó la vista del reclutador");

        const response = await axiosConfig.get(`/vacancies/${id}`); // Obtener la vacante usando el ID dinámico
        console.log("Vacantes obtenidas:", response.data);

        if (!response.data) {
          console.warn("Vacante no encontrada con ID:", id);
          setError("No se encontró la vacante con ese ID.");
        } else {
          console.log("Vacante encontrada:", response.data);
          setVacante(response.data);
        }
      } catch (error) {
        console.error("Error al obtener vacantes:", error.response?.data || error.message);
        setError("No se pudo cargar la vacante");
      } finally {
        setLoading(false);
      }
    };

    obtenerVacante();
  }, [id]); // El hook se ejecutará cada vez que el ID cambie

  if (loading) return <p className="pt-24 text-center">Cargando...</p>;
  if (error) return <p className="pt-24 text-center text-red-500">{error}</p>;
  if (!vacante) return <p className="pt-24 text-center">Vacante no encontrada.</p>;

  const navItems = [
    { title: "Descripción", path: "#" },
    { title: "Candidatos en proceso", path: `/reclutador/ver/candidatos/${id}` },
  ];

  return (
    <div className="pt-24 px-8 min-h-screen">
         <h1 className="text-3xl font-bold text-black mb-10">{vacante.nombre}</h1>
         <h1 className="text-2xl  text-black mb-10">Sobre el puesto</h1>

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



      {/* Contenido principal */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-10 w-full">
        {/* Columna Izquierda */}
        <div className="md:col-span-2 space-y-6">
          <section className="bg-gray-100 rounded-lg p-6">
            <h2 className="text-lg font-semibold mb-2">Descripción</h2>
            <p className="text-sm text-[#535353]">
              {vacante.resumen || "Sin resumen disponible."}
            </p>
            <h2 className="text-lg font-semibold mb-2 mt-4">Requisitos</h2>
            <ul className="list-disc pl-5 text-sm text-[#535353] space-y-1">
              {(vacante.requisitos || []).map((req, i) => (
                <li key={i}>{req}</li>
              ))}
            </ul>
            <h2 className="text-lg font-semibold mb-2 mt-4"></h2>
            <p className="text-sm text-gray-700">
              {vacante.responsabilidades || "Sin responsabilidades disponibles."}
            </p>
          </section>
        </div>

        {/* Columna Derecha */}
        <div className="space-y-4 text-sm text-[#2C2C2B] bg-gray-50 p-6 rounded-md shadow-sm">
          <div>
             <h1 className="text-lg  mb-2 mt-4 mb-4">Detalles</h1>
            <div className="flex items-center space-x-2 mb-4">
                <img src="../../src/assets/img/candidatos.png" alt="Candidatos Icon" className="w-3 h-3 self-start mt-1" />
                <span>
                Candidatos seleccionados: {vacante.seleccionados ?? "N/A"}
              </span>
             
            </div>
             <div className="flex items-center space-x-2 mb-4">
                <img src="../../src/assets/img/experiencia.png" alt="Experiencia Icon" className="w-3 h-3 self-start mt-1" />
                <span>
                Experiencia: {vacante.experiencia ?? "N/A"}
              </span>
             
            </div>
            <div className="flex items-center space-x-2 mb-4">
                <img src="../../src/assets/img/modalidad.png" alt="Modalidad Icon" className="w-3 h-3 self-start mt-1" />
                <span>
                Modalidad:{vacante.modalidad ?? "N/A"}
              </span>
             
            </div>
            <div className="flex items-center space-x-2 mb-4">
                <img src="../../src/assets/img/ubicacion.png" alt="Ubicación Icon" className="w-3 h-3 self-start mt-1" />
                <span>
                Ubicación: {vacante.ubicacion ?? "N/A"}
              </span>
             
            </div>
             <div className="flex items-center space-x-2 mb-4">
                <img src="../../src/assets/img/jornada.png" alt="Jornada Icon" className="w-3 h-3 self-start mt-1" />
                <span>
                Jornada: {vacante.jornada ?? "N/A"}
              </span>
             
            </div>
            <div className="flex items-center space-x-2 mb-4">
            <img src="../../src/assets/img/estado.png" alt="Estado Icon" className="w-3 h-3 self-start mt-1" />
              <span>
               Estado: {vacante.estado || "No especificado"}
              </span>
            </div>
            <div className="flex items-center space-x-2 mb-4">
             
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default RecuiterVacancyView;
