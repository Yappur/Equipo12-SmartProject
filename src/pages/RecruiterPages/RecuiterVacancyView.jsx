import React from "react";
import { Link } from "react-router-dom";
import Sidebar from "../../components/Navigate/Sidebar";
import AdminNavbar from "../../components/Navigate/Navbar";
import { FaUserGear, FaMagnifyingGlass, FaUserPlus } from "react-icons/fa6";
import { useEffect, useState } from "react";
import axiosConfig from "../../helpers/axios.config";


// Suponiendo que tienes un estado global o un contexto para manejar si el usuario está logueado
const isAuthenticated = true; // Aquí deberías revisar el estado real de autenticación

const RecuiterVacancyView = () => {
  const [vacante, setVacante] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

 useEffect(() => {
  const obtenerVacante = async () => {
    try {
      console.log("Renderizó la vista del reclutador");

      const response = await axiosConfig.get("/vacancies");
      console.log("Vacantes obtenidas:", response.data);

      const vacanteFiltrada = response.data.find(
        (v) => v.id === "S6BsokuPPgFMQZhbQYLG"
      );

      if (!vacanteFiltrada) {
        console.warn("Vacante no encontrada con ID: S6BsokuPPgFMQZhbQYLG");
        setError("No se encontró la vacante con ID 'S6BsokuPPgFMQZhbQYLG'");
      } else {
        console.log("Vacante encontrada:", vacanteFiltrada);
        setVacante(vacanteFiltrada);
      }
    } catch (error) {
      console.error("Error al obtener vacantes:", error.response?.data || error.message);
      setError("No se pudo cargar la vacante");
    } finally {
      setLoading(false);
    }
  };

  obtenerVacante();
}, []);


  if (loading) return <p className="pt-24 text-center">Cargando...</p>;
  if (error) return <p className="pt-24 text-center text-red-500">{error}</p>;
  if (!vacante) return <p className="pt-24 text-center">Vacante no encontrada.</p>;

  const navItems = [
    { title: "Descripción", path: "#" },
    { title: "Candidatos", path: "/reclutador/ver/candidatos/:id" },
  ];

  return (
    <div className="pt-24 px-8 min-h-screen">
      <div className="border-b border-gray-300 mb-6 pb-2 flex space-x-6">
        {navItems.map((item) => (
          <Link
            key={item.title}
            to={item.path}
            className="text-gray-600 hover:text-black font-semibold"
          >
            {item.title}
          </Link>
        ))}
      </div>

      {/* Contenido principal */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-10 w-full">
        {/* Columna Izquierda */}
        <div className="md:col-span-2 space-y-6">
          <section className="bg-gray-100 rounded-lg p-6">
            <h2 className="text-lg font-semibold mb-2">Resumen</h2>
            <p className="text-sm text-gray-700">
              {vacante.resumen || "Sin resumen disponible."}
            </p>
            <h2 className="text-lg font-semibold mb-2 mt-4">Requisitos</h2>
            <ul className="list-disc pl-5 text-sm text-gray-700 space-y-1">
              {(vacante.requisitos || []).map((req, i) => (
                <li key={i}>{req}</li>
              ))}
            </ul>
            <h2 className="text-lg font-semibold mb-2 mt-4">Responsabilidades</h2>
            <p className="text-sm text-gray-700">
              {vacante.responsabilidades || "Sin responsabilidades disponibles."}
            </p>
          </section>
        </div>

        {/* Columna Derecha */}
        <div className="space-y-4 text-sm text-gray-700 bg-gray-50 p-6 rounded-md shadow-sm">
          <div>
            <div className="flex items-center space-x-2">
              <span>
                <strong>Cliente:</strong> {vacante.cliente || "No especificado"}
              </span>
            </div>
            <div className="flex items-center space-x-2">
              <span>
                <strong>Estado:</strong> {vacante.estado || "No especificado"}
              </span>
            </div>
            <div className="flex items-center space-x-2">
              <span>
                <strong>Seleccionados:</strong> {vacante.seleccionados ?? "N/A"}
              </span>
            </div>
            <div className="flex items-center space-x-2">
              <span>
                <strong>Vacantes:</strong> {vacante.cupos ?? "N/A"}
              </span>
            </div>
            <div className="flex items-center space-x-2">
              <span>
                <strong>Reclutador:</strong> {vacante.reclutador || "No asignado"}
              </span>
            </div>
            <div className="flex items-center space-x-2">
              <span>
                <strong>Contratación:</strong> {vacante.fecha || "No definida"}
              </span>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default RecuiterVacancyView;

