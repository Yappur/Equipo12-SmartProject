import { useEffect, useRef, useLayoutEffect } from "react";
import { useState } from "react";
import LandingNavbar from "../../components/Navigate/LandingNavbar";
import imgVacantes from "@/assets/img/img-vacantes.png";
import VacancieTable from "../../components/Tables/VacancieTable";
import Footer from "../../components/Navigate/Footer";
import VacancieCards from "../../components/Cards/VacancieCards";
import { cambiarTitulo } from "../../hooks/useCambiarTitulo";

const VacancyGallery = () => {
  cambiarTitulo("VacantesGaleria");

  return (
    <>
      <LandingNavbar />
      <div className="relative pt-16 md:pt-0">
        <img
          className="w-full hidden md:block"
          src={imgVacantes || "/placeholder.svg"}
          alt=""
        />
        <section className="relative bg-[#F9F9F9] max-w-screen-xl mx-auto px-6 py-10 rounded-xl shadow-lg md:-mt-32 mt-0">
          <h1 className="text-center text-[#F88623] font-poppins text-3xl md:text-4xl mt-5 leading-relaxed font-semibold">
            Tu próximo trabajo está más cerca <br className="hidden md:block" />{" "}
            de lo que piensas
          </h1>

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
