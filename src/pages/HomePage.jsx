import React from "react";
import CardHome from "../components/Cards/CardHome";

const HomePage = () => {
  return (
    <>
      {/* Imagen de fondo */}
      <div className="relative w-full h-96">
        <img
          src="https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcTulH1GG7mifCTeQSEZG14ibVVm2zuktCGxkg&s" // Aquí puedes usar la URL de tu imagen
          alt="Background"
          className="object-cover w-full h-full"
        />
        <div className="absolute top-0 left-0 w-full h-full bg-black opacity-50"></div>
      </div>

      {/* Título */}
      <h1 className="text-4xl font-bold text-center text-gray-800 mt-8">
        Vacantes Disponibles
      </h1>
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6 mt-8 mx-4">
        <CardHome />
        <CardHome />
        <CardHome />
        <CardHome />
        <CardHome />
        <CardHome />
      </div>
    </>
  );
};

export default HomePage;
