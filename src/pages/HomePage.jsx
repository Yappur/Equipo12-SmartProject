import React from "react";
import HeroSection from "../components/LandingPage/HeroSection";
import CandidatoSection from "../components/LandingPage/CandidatoSection";
import ServiciosSection from "../components/LandingPage/ServiciosSection";
import SuscripcionSection from "../components/LandingPage/SuscripcionSection";
import LandingNavbar from "../components/barrasDeNavegacion/LandingNavbar";

const HomePage = () => {
  return (
    <div className="">
      <LandingNavbar />
      <HeroSection />
      <CandidatoSection />
      <ServiciosSection />
      <SuscripcionSection />
    </div>
  );
};

export default HomePage;
