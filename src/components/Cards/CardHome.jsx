import React from "react";

const CardHome = () => {
  return (
    <div className="bg-white rounded-xl shadow-lg overflow-hidden transition hover:shadow-xl duration-300 mb-5">
      <img
        src="https://www.occ.com.mx/blog/wp-content/uploads/2021/01/Home-office-OCCMundial.jpg"
        alt="Vacante Frontend"
        className="w-full h-48 object-cover"
      />
      <div className="p-6 flex flex-col  h-full">
        <h2 className="text-2xl font-semibold text-gray-800">
          Desarrollador Frontend
        </h2>
        <p className="text-gray-600 mt-2 text-sm leading-relaxed">
          Trabajo remoto, experiencia mínima de 2 años con React. Proyectos en producción, dominio de Tailwind y consumo de APIs REST.
        </p>

        <div className="mt-6 flex gap-3 flex-wrap">
          <button className="bg-transparent border border-blue-600 text-blue-600 px-5 py-2 rounded-full hover:bg-blue-50 transition text-sm">
            Ver oferta
          </button>
          <button className="bg-blue-600 text-white px-6 py-2 rounded-full hover:bg-blue-700 transition text-sm">
            Aplicar
          </button>
        </div>
      </div>
    </div>
  );
};

export default CardHome;
