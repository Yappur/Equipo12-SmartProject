import React from "react";
import { Link } from "react-router-dom";
import Sidebar from "@/components/Barras de Navegacion/Sidebar";
import { HiOutlineUser } from "react-icons/hi"; 
//import Nav from "../../components/Nav";
//import Footer from "../../components/Footer";
import { FaUser } from "react-icons/fa6";

const CandidatosView = () => {
  return (
    <div className="flex min-h-screen">
      {/* Sidebar a la izquierda */}
      <Sidebar />

      {/* Contenido principal */}
      <div className="flex flex-col w-full">
        {/* Nav arriba */}
        

        {/* Contenido de la página */}
        <main className="flex-grow p-6 flex flex-col items-center justify-center gap-8">
          <h1 className="text-3xl sm:text-4xl font-bold text-center mt-6">
            Gestión de Candidatos
          </h1>

          {/*Icono de Candidato */}
         <HiOutlineUser className="text-[100px] text-gray-500 mb-2" />

          {/* Botón Nuevo Candidato */}
          <Link
            to="/crear/candidato"
            className="flex flex-col items-center justify-center bg-gray-300 border border-gray-300 rounded-xl px-6 py-4 shadow-sm hover:shadow-md transition-all hover:scale-105"
          >
            
            <span className="text-lg font-medium text-gray-700">Nuevo Candidato</span>
          </Link>
        </main>

        {/* Footer abajo */}
     
      </div>
    </div>
  );
};

export default CandidatosView;
