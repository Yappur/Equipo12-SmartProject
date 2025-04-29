import { useEffect, useState } from "react";
import axiosConfig from "../../helpers/axios.config";
import { useParams } from "react-router-dom";

const VacancyView = () => {
  const [vacante, setVacante] = useState({});
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const { id } = useParams();

  const obtenerVacante = async () => {
    try {
      setLoading(true);
      const response = await axiosConfig.get(`/vacancies/${id}`);
      setVacante(response.data);
      setLoading(false);
    } catch (error) {
      setError("No se pudo cargar la vacante");
      setLoading(false);
    }
  };

  useEffect(() => {
    obtenerVacante();
  }, [id]);

  return (
    //Maqueta de prueba
    <div>
      <div key={vacante.id} className="flex items-center mt-25 flex-col">
        <div>
          <h1>{vacante.nombre}</h1>
          <p>{vacante.descripcion}</p>
          <span>Vacante: {vacante.estado}</span>
        </div>

        <img
          src={vacante.image}
          alt="imagen de vacante"
          className="w-44 h-44 object-cover rounded"
        />

        <div className="mt-4 ">
          <button className="bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded cursor-pointer">
            Inscribirme
          </button>
        </div>
      </div>
    </div>
  );
};

export default VacancyView;
