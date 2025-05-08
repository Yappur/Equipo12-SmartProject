import { useEffect, useState } from "react";
import axiosConfig from "../../helpers/axios.config";
import LandingNavbar from "../../components/Navigate/LandingNavbar";
import { useParams } from "react-router-dom";
import {
  FiUser,
  FiCheckCircle,
  FiUsers,
  FiBriefcase,
  FiCalendar,
  FiClipboard,
  FiUserPlus,
} from "react-icons/fi";
import FormCandidatos from "../../components/Forms/FormCandidatos";

const VacancyView = () => {
  const [vacante, setVacante] = useState({});
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [showModal, setShowModal] = useState(false);
  const { id } = useParams();

  const obtenerVacante = async () => {
    try {
      const response = await axiosConfig.get(`/vacancies/${id}`);
      setVacante(response.data);
      setLoading(false);
    } catch (error) {
      setError("No se pudo cargar la vacante");
      setLoading(false);
      console.log(error);
    }
  };

  useEffect(() => {
    obtenerVacante();
  }, [id]);

  const handleOpenModal = () => {
    setShowModal(true);
  };

  const handleCloseModal = () => {
    setShowModal(false);
  };

  if (loading) return <p className="pt-24 text-center">Cargando...</p>;
  if (error) return <p className="pt-24 text-center">{error}</p>;

  return (
    <>
      <LandingNavbar />
      <div className="flex min-h-screen">
        <div className="flex-1 pt-24 p-10 max-w-6xl mx-auto">
          <div className="flex justify-between items-center mb-6">
            <h1 className="text-2xl font-bold">
              {vacante.nombre || "Desarrollador"}
            </h1>
            <button
              onClick={handleOpenModal}
              className="flex items-center bg-blue-900 text-white px-4 py-2 rounded hover:bg-blue-800 transition-colors"
            >
              <FiUserPlus className="mr-2" />
              Nuevo Candidato
            </button>
          </div>

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
                  {vacante.ubicacion || "Buenos Aires, Argentina"}
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
                  {/* <strong>Cliente:</strong> {vacante.cliente || "Grupo Assa"} */}
                </span>
              </div>
              <div className="flex items-center space-x-2">
                <FiCheckCircle />
                <span>
                  <strong>Estado:</strong> {vacante.estado || "Abierta"}
                </span>
              </div>
              <div className="flex items-center space-x-2">
                <FiUsers />
                <span>
                  {/* <strong>Seleccionados:</strong> {vacante.seleccionados || 15} */}
                </span>
              </div>
              <div className="flex items-center space-x-2">
                <FiClipboard />
                <span>
                  {/* <strong>Vacantes:</strong> {vacante.cupos || 2} */}
                </span>
              </div>
              <div className="flex items-center space-x-2">
                <FiUser />
                <span>
                  <strong>Reclutador:</strong>{" "}
                  {/* {vacante.reclutador || "Lara Tancredi"} */}
                </span>
              </div>
              <div className="flex items-center space-x-2">
                <FiCalendar />
                <span>
                  {/* <strong>Contratación:</strong> {vacante.fecha || "15/10/26"} */}
                </span>
              </div>
            </div>
          </div>
        </div>
        {showModal && (
          <>
            <div className="fixed inset-0 z-40 bg-black/50"></div>
            <div className="fixed inset-0 z-50 flex items-center justify-center">
              <div className="w-full max-w-6xl max-h-[90vh] overflow-y-auto">
                <div className="relative bg-white rounded-lg shadow-xl">
                  <div className="flex justify-between items-center p-4 border-b">
                    <h2 className="text-xl font-semibold">Postularme</h2>
                    <button
                      onClick={handleCloseModal}
                      className="text-gray-500 hover:text-gray-700"
                    >
                      <svg
                        className="w-6 h-6"
                        fill="none"
                        stroke="currentColor"
                        viewBox="0 0 24 24"
                      >
                        <path
                          strokeLinecap="round"
                          strokeLinejoin="round"
                          strokeWidth="2"
                          d="M6 18L18 6M6 6l12 12"
                        />
                      </svg>
                    </button>
                  </div>
                  <div>
                    <FormCandidatos onClose={handleCloseModal} vacancyId={id} />
                  </div>
                </div>
              </div>
            </div>
          </>
        )}
      </div>
    </>
  );
};

export default VacancyView;
