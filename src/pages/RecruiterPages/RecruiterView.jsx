import React from "react";
import { Link } from "react-router-dom";
import Sidebar from "@/components/barrasDeNavegacion/Sidebar";
import AdminNavbar from "@/components/barrasDeNavegacion/Navbar";
import { FaUserGear, FaMagnifyingGlass, FaUserPlus } from "react-icons/fa6";

const RecruiterView = () => {
  return (
    <div className="flex ">
      {/* Sidebar fijo a la izquierda */}
      <Sidebar />

      <div className="pt-16 flex flex-col items-center justify-center w-full px-4 sm:px-6 py-8 sm:py-12 gap-8 sm:gap-12 md:gap-16">
        <AdminNavbar />
        <section className="flex flex-col items-center mt-10 justify-center gap-3 sm:gap-4 max-w-4xl mx-auto">
          <h1 className="text-3xl sm:text-4xl md:text-5xl lg:text-6xl text-center font-bold">
            ¡Bienvenido a Talent Match!
          </h1>
          <p className="text-lg sm:text-xl md:text-2xl text-center text-gray-500">
            ¿Qué vas a hacer hoy? Puedes dar estos primeros pasos:
          </p>
        </section>

        <section className="flex flex-col sm:flex-row gap-6 sm:gap-12 md:gap-16 lg:gap-28 text-gray-500">
          <Link
            to="/crear/vacante"
            className="flex flex-col items-center justify-center gap-2 p-4 sm:p-6 rounded-xl transition-all hover:bg-slate-50 duration-300 transform hover:scale-[1.02]"
          >
            <FaMagnifyingGlass className="text-5xl sm:text-6xl md:text-7xl lg:text-8xl" />
            <p className="sm:text-lg md:text-xl font-medium mt-2 text-center text-black">
              Nueva Vacante
            </p>
          </Link>

          <Link
            to="/reclutador/vacantes/:id"
            className="flex flex-col items-center justify-center gap-2 p-4 sm:p-6 rounded-xl hover:bg-slate-50 transition-all duration-300 transform hover:scale-[1.02]"
          >
            <FaUserGear className="text-5xl sm:text-6xl md:text-7xl lg:text-8xl" />
            <p className="sm:text-lg md:text-xl font-medium mt-2 text-center text-black">
              Ver mis Vacantes
            </p>
          </Link>

          {/* Nuevo botón para agregar candidatos */}
          <Link
            to="/reclutador/candidatos"
            className="flex flex-col items-center justify-center gap-2 p-4 sm:p-6 rounded-xl transition-all hover:bg-slate-50 duration-300 transform hover:scale-[1.02]"
          >
            <FaUserPlus className="text-5xl sm:text-6xl md:text-7xl lg:text-8xl" />
            <p className="sm:text-lg md:text-xl font-medium mt-2 text-center text-black">
              Agregar Candidato
            </p>
          </Link>
        </section>
      </div>
    </div>
  );
};

export default RecruiterView;
