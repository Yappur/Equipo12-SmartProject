import { useEffect, useRef, useLayoutEffect } from "react";
import { useState } from "react";
import LandingNavbar from "../../components/Navigate/LandingNavbar";
import imgVacantes from "@/assets/img/WebP/img-vacantes.webp";
import VacancieTable from "../../components/Tables/VacancieTable";
import Footer from "../../components/Navigate/Footer";
import VacancieCards from "../../components/Cards/VacancieCards";
import useCambiarTitulo from "../../hooks/useCambiarTitulo";

const VacancyGallery = () => {
  useCambiarTitulo("VacantesGaleria");

  return (
    <>
      <LandingNavbar />
      <div className="relative pt-16 md:pt-0">
        <img
          className="w-full hidden md:block"
          src={imgVacantes || "/placeholder.svg"}
          alt=""
        />
        <div className="relative bg-gray-50 max-w-screen-xl mx-auto px-6 py-10 rounded-3xl shadow-gray-500 shadow-md md:-mt-46 mt-0">
          <h1 className="text-center text-[#F88623] font-poppins text-xl md:text-5xl mt-5 leading-relaxed font-semilight">
            Tu próximo trabajo está más cerca <br className="hidden md:block" />{" "}
            de lo que piensas
          </h1>

          <div className="max-w-5xl mx-auto mt-12">
            <h3 className="text-lg md:text-3xl font-medium  text-[#F88623] mb-4">
              Vacantes disponibles
            </h3>
            <p className="mb-6">
              Realiza la búsqueda en nuestra bolsa de trabajo actual.
            </p>
          </div>
          <div>
            <div className="hidden md:block">
              <VacancieTable isPublic />
            </div>
            <div className="block md:hidden">
              <VacancieCards />
            </div>
          </div>
        </div>
      </div>
      <Footer />
    </>
  );
};

export default VacancyGallery;
