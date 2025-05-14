import { useEffect, useState } from "react";
import axiosConfig from "../../helpers/axios.config";
import LandingNavbar from "../../components/Navigate/LandingNavbar";
import Footer from "../../components/Navigate/Footer";
import imgVacantes from "@/assets/img/img-vacantes.png";
import { useParams } from "react-router-dom";
import {
  FiCheckCircle,
  FiUsers,
  FiBriefcase,
  FiCalendar,
} from "react-icons/fi";
import { FaRegClipboard } from "react-icons/fa6";
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
      <div className="relative pt-16 md:pt-0">
        {/* Imagen visible solo en tablets y desktop */}
        <img
          className="w-full hidden md:block"
          src={imgVacantes || "/placeholder.svg"}
          alt=""
        />

        {/* Contenedor con ajustes responsive */}
        <div className="relative bg-[#F9F9F9] max-w-screen-xl mx-auto px-6 py-10 rounded-xl shadow-lg md:-mt-46 mt-0">
          <h1 className="text-center text-[#F88623] font-poppins text-3xl md:text-4xl mt-5 leading-relaxed font-semibold">
            Tu próximo trabajo está más cerca <br className="hidden md:block" />{" "}
            de lo que piensas
          </h1>

          <div className="flex-1 pt-12 md:pt-24 p-4 md:p-10 max-w-6xl mx-auto">
            <div className="mb-8 md:mb-12">
              <h1 className="text-3xl md:text-4xl font-semibold mb-4 md:mb-7 break-words">
                {vacante.nombre || vacante.puesto || "Vacante invalida"}
              </h1>
              <p className="text-lg md:text-xl font-semibold">
                Realiza la búsqueda en nuestra bolsa de trabajo actual.
              </p>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-3 gap-6 md:gap-10">
              {/* Columna Izquierda */}
              <div className="md:col-span-2">
                <section className="rounded-lg p-4">
                  <h2 className="text-lg font-semibold mb-2">Descripcion</h2>
                  <div className="text-sm text-gray-700 mb-4 break-words whitespace-normal overflow-hidden">
                    {vacante.descripcion ||
                      "Lorem ipsum dolor sit amet consectetur..."}
                  </div>
                  <h2 className="text-lg font-semibold mb-2">
                    Responsabilidades
                  </h2>
                  <div className="text-sm text-gray-700 break-words whitespace-normal overflow-hidden">
                    {vacante.responsabilidades || "Remoto"}
                  </div>
                </section>
              </div>

              {/* Columna Derecha */}
              <div className="space-y-4 text-sm p-4 rounded-md bg-white/50">
                <h2 className="text-xl md:text-2xl font-semibold">Detalles</h2>
                <div className="flex items-start space-x-2">
                  <FaRegClipboard className="w-5 h-5 mt-0.5 flex-shrink-0" />
                  <span className="font-medium break-words">Experiencia:</span>
                  <span>{vacante.experiencia || "Sin experiencia"}</span>
                </div>
                <div className="flex items-start space-x-2">
                  <FiBriefcase className="w-5 h-5 mt-0.5 flex-shrink-0" />
                  <span className="font-medium break-words">Modalidad: </span>
                  <span>{vacante.modalidad || "Remoto"}</span>
                </div>

                <div className="flex items-start space-x-2">
                  <FiUsers className="w-5 h-5 mt-0.5 flex-shrink-0" />
                  <span className="font-medium break-words">Ubicación:</span>
                  <span>{vacante.ubicacion || "N/A"}</span>
                </div>
                <div className="flex items-start space-x-2">
                  <FiCalendar className="w-5 h-5 mt-0.5 flex-shrink-0" />
                  <span className="font-medium break-words">Jornada:</span>
                  <span>{vacante.jornada || "Completa"}</span>
                </div>

                <div className="flex items-start space-x-2">
                  <FiCheckCircle className="w-5 h-5 mt-0.5 flex-shrink-0" />
                  <span className="font-medium break-words">Estado:</span>
                  <span>{vacante.estado}</span>
                </div>
              </div>
            </div>

            <button
              onClick={handleOpenModal}
              className="w-full bg-[#F88623] text-white py-3 rounded-lg font-semibold mt-8 hover:bg-[#e67b1f] transition-colors"
            >
              Aplicar Ahora
            </button>
          </div>
        </div>
      </div>

      {showModal && (
        <>
          <div className="fixed inset-0 z-40 bg-black/50"></div>
          <div className="fixed inset-0 z-50 flex items-center justify-center p-4">
            <div className="w-full max-w-4xl max-h-[90vh] overflow-y-auto">
              <div className="relative bg-white rounded-3xl shadow-xl border-6 border-orange-500">
                <div className="flex justify-between items-center p-4">
                  <h2 className="text-2xl font-medium break-words max-w-[80%]">
                    Postulación a {vacante.nombre}
                  </h2>
                  <button
                    onClick={handleCloseModal}
                    className="text-gray-500 hover:text-gray-700"
                  >
                    ✕
                  </button>
                </div>
                <div className="px-5">
                  <FormCandidatos onClose={handleCloseModal} vacancyId={id} />
                </div>
              </div>
            </div>
          </div>
        </>
      )}

      <Footer />
    </>
  );
};

export default VacancyView;
