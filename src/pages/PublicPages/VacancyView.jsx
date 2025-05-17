import { useEffect, useState } from "react";
import axiosConfig from "../../helpers/axios.config";
import LandingNavbar from "../../components/Navigate/LandingNavbar";
import Footer from "../../components/Navigate/Footer";
import imgVacantes from "@/assets/img/WebP/img-vacantes.webp";
import { useParams } from "react-router-dom";
import { FiMonitor } from "react-icons/fi";
import { LuClock5 } from "react-icons/lu";
import { RiMapPinLine } from "react-icons/ri";
import { FaRegClipboard, FaArrowRightArrowLeft } from "react-icons/fa6";
import FormCandidatos from "../../components/Forms/FormCandidatos";
import useCambiarTitulo from "../../hooks/useCambiarTitulo";

const VacancyView = () => {
  useCambiarTitulo("VacanteDetalle");
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
        <img
          className="w-full hidden md:block"
          src={imgVacantes || "/placeholder.svg"}
          alt=""
        />

        <div className="relative bg-gray-50 max-w-screen-xl mx-auto px-6 py-10 rounded-3xl shadow-gray-500 shadow-md md:-mt-46 mt-0">
          <h1 className="text-center text-[#F88623] font-poppins text-xl md:text-5xl mt-5 leading-relaxed font-semilight">
            Tu próximo trabajo está más cerca <br className="hidden md:block" />{" "}
            de lo que piensas
          </h1>

          <div className="flex-1 pt-12 md:pt-18 p-4 md:p-10 max-w-6xl mx-auto">
            <div className="mb-8 md:mb-12">
              <h1 className="text-3xl md:text-4xl font-medium mb-4 md:mb-7 break-words">
                {vacante.nombre || vacante.puesto || "Vacante invalida"}
              </h1>
              <p className="text-lg md:text-xl font-semilight">
                Realiza la búsqueda en nuestra bolsa de trabajo actual.
              </p>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-3 gap-6 md:gap-10">
              {/* Columna Izquierda */}
              <div className="md:col-span-2">
                <section className="rounded-lg p-4 ">
                  <h2 className="text-2xl ml-6 font-semilight mb-6">
                    Descripción
                  </h2>
                  <div className="text-sm text-gray-600 mb-10 break-words whitespace-normal overflow-hidden">
                    {vacante.descripcion ||
                      "Sin descripción, comunicate con el reclutador."}
                  </div>
                  <h2 className="text-2xl ml-5 font-semilight mb-6">
                    Responsabilidades
                  </h2>
                  <div className="text-sm text-gray-600 mb-10 break-words whitespace-normal overflow-hidden">
                    {vacante.responsabilidades ||
                      "Sin responsabilidades, comunicate con el reclutador."}
                  </div>
                </section>
              </div>

              {/* Columna Derecha */}
              <div className="space-y-7 text-md p-4 rounded-md text-gray-800 bg-white/50">
                <h2 className="text-xl md:text-2xl font-semilight">Detalles</h2>
                <div className="flex items-start space-x-2">
                  <FaRegClipboard className="w-5 h-5 mt-0.5 flex-shrink-0" />
                  <span className="break-words">Experiencia:</span>
                  <span>{vacante.experiencia || "Sin experiencia"}</span>
                </div>
                <div className="flex items-start space-x-2">
                  <FiMonitor className="w-5 h-5 mt-0.5 flex-shrink-0" />
                  <span className="break-words">Modalidad: </span>
                  <span>{vacante.modalidad || "Remoto"}</span>
                </div>

                <div className="flex items-start space-x-2">
                  <RiMapPinLine className="w-5 h-5 mt-0.5 flex-shrink-0" />
                  <span className="break-words">Ubicación:</span>
                  <span>{vacante.ubicacion || "N/A"}</span>
                </div>
                <div className="flex items-start space-x-2">
                  <LuClock5 className="w-5 h-5 mt-0.5 flex-shrink-0" />
                  <span className="break-words">Jornada:</span>
                  <span>{vacante.jornada || "Completa"}</span>
                </div>

                <div className="flex items-start space-x-2">
                  <FaArrowRightArrowLeft className="w-5 h-5 mt-0.5 flex-shrink-0" />
                  <span className="break-words">Estado:</span>
                  <span>{vacante.estado}</span>
                </div>
              </div>
            </div>
          </div>
        </div>
        <button
          onClick={handleOpenModal}
          className="w-full flex items-center justify-center max-w-screen-xl mx-auto bg-[#F88623] shadow-[#ffb778] shadow-md text-white py-3 rounded-3xl font-semibold my-12 hover:bg-[#e67b1f] transition-colors"
        >
          Aplicar Ahora
        </button>
      </div>

      {showModal && (
        <>
          <div className="fixed inset-0 z-40 bg-black/50"></div>
          <div className="fixed inset-0 z-50 flex items-center justify-center p-4">
            <div className="w-full max-w-4xl max-h-[90vh] overflow-y-auto">
              <div className="relative bg-white rounded-3xl shadow-xl border-6 border-orange-500">
                <div className="flex justify-between items-center p-4">
                  <h2 className="text-2xl font-medium break-words max-w-[80%]">
                    Postulación a {vacante.nombre || vacante.puesto}
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
