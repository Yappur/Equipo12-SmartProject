import React from "react";

const CardHome = () => {
  return (
    <div className="bg-white rounded-lg shadow-lg overflow-hidden mb-6">
      <img
        src="https://www.occ.com.mx/blog/wp-content/uploads/2021/01/Home-office-OCCMundial.jpg"
        alt="Vacante 1"
        className="w-full h-48 object-cover"
      />
      <div className="p-6">
        <h2 className="text-xl font-semibold text-gray-800">
          Desarrollador Frontend
        </h2>
        <p className="text-gray-600 mt-2">
          Trabajo remoto, experiencia mínima de 2 años con React.
        </p>
        <button className="mt-4 bg-blue-600 text-white px-6 py-2 rounded-full hover:bg-blue-700">
          Apply
        </button>
      </div>
    </div>
  );
};

export default CardHome;
