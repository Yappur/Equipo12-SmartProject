import React from "react";
import { useState } from "react";
import LandingNavbar from "../../components/Navigate/LandingNavbar";
import imgVacantes from "@/assets/img/img-vacantes.png";
import VacancieTable from "../../components/Tables/VacancieTable";
import Footer from "../../components/Footer";
import VacancieCards from "../../components/Cards/VacancieCards";

const VacancyGallery = () => {




  return (
    <>
      <LandingNavbar />
      <div className="relative">
        {/* Imagen de fondo */}
        <img className="w-full" src={imgVacantes} alt="" />

        {/* Contenedor flotante con margen negativo */}
        <section
          className="relative bg-[#F9F9F9] max-w-screen-xl mx-auto px-6 py-10 rounded-xl shadow-lg -mt-16"
        >
          <h1 className="text-center text-[#F88623] font-poppins text-4xl mt-5 leading-relaxed font-semibold">
            Tu próximo trabajo está más cerca <br className="hidden md:block" /> de lo que piensas
          </h1>

          {/* Tabla de vacantes */}
          <div className="mt-8 md:px-10 mb-10">
            <h3 className="text-2xl font-semibold text-[#F88623] mb-4">
              Vacantes disponibles
            </h3>
            <p className="text-black mb-6">
              Realiza la búsqueda en nuestra bolsa de trabajo actual.
            </p>
            <VacancieTable className="hidden lg:block" />
            <VacancieCards className="" />
           
          </div>
        </section>
      </div>
      <Footer />

    </>
  );
};

export default VacancyGallery;
