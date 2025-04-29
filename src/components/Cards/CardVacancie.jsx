import React, { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import axiosConfig from "../../helpers/axios.config";

const CardVacancie = () => {
  const [cargarVacantes, setCargarVacantes] = useState([]);
  const navigate = useNavigate();

  const obtenerVacantes = async () => {
    try {
      const response = await axiosConfig.get("/vacancies");
      setCargarVacantes(response.data);
    } catch (error) {
      console.error(error);
    }
  };

  useEffect(() => {
    obtenerVacantes();
  }, []);

  const handleVerVacante = (id) => {
    navigate(`/ver/vacante/${id}`);
  };

  return (
    <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-8 px-4 sm:px-6 max-w-7xl mx-auto">
      {cargarVacantes.map((vacante) => {
        return (
          <div key={vacante.id} className="h-full ">
            <div className="bg-white rounded-2xl shadow-lg hover:shadow-xl transition-all duration-300 h-full flex flex-col overflow-hidden transform hover:-translate-y-2">
              <div className="h-52 w-full overflow-hidden relative">
                <img
                  src={vacante.image}
                  alt={`Vacante ${vacante.nombre}`}
                  className="w-full h-full object-cover object-center rounded-t-2xl"
                />
              </div>
              <div className="card-body text-black p-4 flex flex-col flex-grow">
                <h2 className="text-2xl font-semibold text-gray-800">
                  {vacante.nombre}
                </h2>
                <p className="text-gray-600 my-2 text-sm leading-relaxed">
                  {vacante.descripcion}
                </p>

                <div className="mt-auto">
                  <button
                    onClick={() => handleVerVacante(vacante.id)}
                    className="bg-transparent border border-blue-600 text-blue-600 px-5 py-2 rounded-full hover:bg-blue-50 transition text-sm"
                  >
                    Ver oferta
                  </button>
                </div>
              </div>
            </div>
          </div>
        );
      })}
    </div>
  );
};

export default CardVacancie;
