import React from "react";
import { Link } from "react-router-dom";
import { HiOutlineUser } from "react-icons/hi";
import { FaUserPlus } from "react-icons/fa6";

const CandidatosView = () => {
  return (
    <div className="">
      <div className="flex flex-col h-screen w-full cursor-pointer">
        <h1 className="text-2xl font-medium text-[#00254B] mb-4">Candidatos</h1>
        <div className="flex flex-col items-center text-center">
          <Link
            to="/crear/candidato"
            className="flex flex-col items-center justify-center"
          >
            <FaUserPlus className="text-[100px] text-gray-500 mb-2" color="#00254B"/>
            <span className="text-lg font-medium text-[#00254B]">
              Nuevo Candidato
            </span>
          </Link>
        </div>
      </div>
      {/* <div className="flex flex-col w-full">
          <main className="flex-grow p-6 flex flex-col items-center justify-center gap-8">
            <h1 className="text-3xl sm:text-4xl font-bold text-center mt-6">
              Gestión de Candidatos
            </h1>

            <HiOutlineUser className="text-[100px] text-gray-500 mb-2" />

            <Link
              to="/crear/candidato"
              className="flex flex-col items-center justify-center bg-gray-300 border border-gray-300 rounded-xl px-6 py-4 shadow-sm hover:shadow-md transition-all hover:scale-105"
            >
              <span className="text-lg font-medium text-gray-700">
                Nuevo Candidato
              </span>
            </Link>
          </main>
        </div> */}
    </div>
  );
};

export default CandidatosView;
