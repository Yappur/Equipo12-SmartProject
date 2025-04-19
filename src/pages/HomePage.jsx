import React from "react";
import CardHome from "@/components/Cards/CardHome";
import homeDesktop from "@/assets/img/home-desktop.png";
import homeMovil from "@/assets/img/home-movil.png";

const HomePage = () => {
  return (
    <div className="pt-16">
      {/* Imagen de fondo con texto centrado */}
      <div className="relative w-full h-[85vh] sm:h-[90vh] lg:h-[100vh] ">
        <picture>
          <source srcSet={homeDesktop} media="(min-width: 640px)" />
          <img
            src={homeMovil}
            alt="Fondo Home"
            className="object-cover w-full h-full"
          />
        </picture>

        {/* Overlay y título centrado */}
        <div className="absolute inset-0 bg-black/60 flex items-center justify-center px-4 sm:px-8">
          <h1 className="text-white text-3xl sm:text-5xl lg:text-6xl font-bold text-center leading-snug drop-shadow-md">
            Gestión de Ofertas
          </h1>
        </div>
      </div>

      {/* Sección de Vacantes */}
      <section className="my-12 px-4 sm:px-6 lg:px-8">
        <h2 className="text-2xl sm:text-3xl md:text-4xl font-bold text-center text-gray-800">
          Vacantes Disponibles
        </h2>

        <div className="mt-10 grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6 max-w-screen-xl mx-auto">
          <CardHome />
          <CardHome />
          <CardHome />
          <CardHome />
          <CardHome />
          <CardHome />
        </div>
      </section>
    </div>
  );
};

export default HomePage;
