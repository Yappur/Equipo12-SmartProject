import { useEffect, useState } from "react";
import axiosConfig from "../../helpers/axios.config";
import { useParams } from "react-router-dom";
import {
  FiUser,
  FiCheckCircle,
  FiUsers,
  FiBriefcase,
  FiCalendar,
  FiClipboard,
} from "react-icons/fi";

const VacancyView = () => {
  const [vacante, setVacante] = useState({});
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const { id } = useParams();

  const obtenerVacante = async () => {
    try {
      const response = await axiosConfig.get(`/vacancies/${id}`);
      setVacante(response.data);
    } catch (error) {
      setError("No se pudo cargar la vacante");
      console.log(error);
    }
  };

  useEffect(() => {
    obtenerVacante();
  }, [id]);

  if (loading) return <p className="pt-24 text-center">Cargando...</p>;
  if (error) return <p className="pt-24 text-center">{error}</p>;

  return (
    <div className="flex min-h-screen">
      <div className="flex-1 pt-24 p-10 max-w-6xl mx-auto">
        <h1 className="text-2xl font-bold mb-6">
          {vacante.nombre || "Desarrollador"}
        </h1>

        <div className="border-b border-gray-300 mb-4">
          <nav className="flex space-x-6">
            <span className="pb-2 border-b-2 border-black font-medium">
              Descripción
            </span>
          </nav>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-10">
          {/* Columna Izquierda */}
          <div className="md:col-span-2 space-y-6">
            <section className="bg-gray-100 rounded-lg p-4">
              <h2 className="text-lg font-semibold mb-2">Resumen</h2>
              <p className="text-sm text-gray-700">
                {vacante.descripcion ||
                  "Lorem ipsum dolor sit amet consectetur..."}
              </p>
              <h2 className="text-lg font-semibold mb-2">Ubicacion</h2>
              <ul className="list-disc pl-5 text-sm text-gray-700 space-y-1">
                {(vacante.ubicacion || "Buenos Aires, Argentina").map(
                  (req, i) => (
                    <li key={i}>{req}</li>
                  )
                )}
              </ul>
              <h2 className="text-lg font-semibold mb-2">Modalidad</h2>
              <p className="text-sm text-gray-700">
                {vacante.modalidad || "Remoto"}
              </p>
            </section>
          </div>

          {/* Columna Derecha */}
          <div className="space-y-4 text-sm text-gray-700 bg-gray-50 p-4 rounded-md shadow-sm">
            <div className="flex items-center space-x-2">
              <FiBriefcase />
              <span>
                <strong>Cliente:</strong> {vacante.cliente || "Grupo Assa"}
              </span>
            </div>
            <div className="flex items-center space-x-2">
              <FiCheckCircle />
              <span>
                <strong>Estado:</strong> {vacante.status || "Abierta"}
              </span>
            </div>
            <div className="flex items-center space-x-2">
              <FiUsers />
              <span>
                <strong>Seleccionados:</strong> {vacante.seleccionados || 15}
              </span>
            </div>
            <div className="flex items-center space-x-2">
              <FiClipboard />
              <span>
                <strong>Vacantes:</strong> {vacante.cupos || 2}
              </span>
            </div>
            <div className="flex items-center space-x-2">
              <FiUser />
              <span>
                <strong>Reclutador:</strong>{" "}
                {vacante.reclutador || "Lara Tancredi"}
              </span>
            </div>
            <div className="flex items-center space-x-2">
              <FiCalendar />
              <span>
                <strong>Contratación:</strong> {vacante.fecha || "15/10/26"}
              </span>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default VacancyView;
