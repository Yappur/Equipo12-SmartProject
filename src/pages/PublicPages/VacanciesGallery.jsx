import React from "react";
import CardVacancie from "../../components/Cards/CardVacancie";
import LandingNavbar from "../../components/Barras de navegacion/LandingNavbar";

const VacancyGallery = () => {
  return (
    <>
      <LandingNavbar />
      <div>
        <div className="text-center mt-22 mb-8">
          <h1 className="text-4xl font-bold ">Vacantes Disponibles</h1>
        </div>
        <CardVacancie />
      </div>
    </>
  );
};

export default VacancyGallery;
