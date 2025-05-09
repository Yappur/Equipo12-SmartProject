import { useEffect, useState } from "react";
import axiosConfig from "../../helpers/axios.config";
import LandingNavbar from "../../components/Navigate/LandingNavbar";
import Footer from "../../components/Footer";
import imgVacantes from "@/assets/img/img-vacantes.png";
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
      <div className="flex flex-col justify-center items-center">
        <div className="relative">
          <img className="w-full" src={imgVacantes} alt="" />

          {/* Contenedor flotante con margen negativo */}
          <div className="relative bg-[#F9F9F9] max-w-screen-xl mx-auto px-6 py-10 rounded-4xl shadow-lg -mt-16">
            <h1 className="text-center text-[#F88623] font-poppins text-4xl mt-5 leading-relaxed font-semibold">
              Tu próximo trabajo está más cerca{" "}
              <br className="hidden md:block" /> de lo que piensas
            </h1>
            <div className="flex-1 pt-24 p-10 max-w-6xl mx-auto">
              <div className="mb-12">
                <h1 className="text-4xl font-semibold mb-7">
                  {vacante.nombre || "Vacante invalida"}
                </h1>
                <p className="text-xl font-semibold">
                  Realiza la búsqueda en nuestra bolsa de trabajo actual.
                </p>
              </div>

              <div className="grid grid-cols-1 md:grid-cols-3 gap-10">
                {/* Columna Izquierda */}
                <div className="md:col-span-2 +">
                  <section className="bg-gray-100 rounded-lg p-4 ">
                    <h2 className="text-lg font-semibold ">Descripcion</h2>
                    <p className="text-sm text-gray-700">
                      {vacante.descripcion ||
                        "Lorem ipsum dolor sit amet consectetur..."}
                    </p>
                    <h2 className="text-lg font-semibold mb-2 ">
                      Responsabilidades
                    </h2>
                    <p className="text-sm text-gray-700 ">
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
          </div>

          <button
            onClick={handleOpenModal}
            className="flex w-full max-w-screen-xl mx-auto px-6 py-4 md:w-auto justify-center items-center bg-orange-500 text-white rounded-4xl hover:bg-blue-800 transition-colors"
          >
            Aplicar Ahora
          </button>
        </div>

        {showModal && (
          <>
            <div className="fixed inset-0 z-40 bg-black/50"></div>
            <div className="fixed inset-0 z-50 flex items-center justify-center">
              <div className="w-full max-w-4xl max-h-[90vh] overflow-y-auto">
                <div className="relative bg-white rounded-3xl shadow-xl border-6 border-orange-500">
                  <div className="flex justify-between items-center p-4">
                    <h2 className="text-2xl font-medium">
                      Postulación a {vacante.nombre}
                    </h2>
                    <button
                      onClick={handleCloseModal}
                      className="text-gray-500 hover:text-gray-700"
                    ></button>
                  </div>
                  <div className="px-5">
                    <FormCandidatos onClose={handleCloseModal} vacancyId={id} />
                  </div>
                </div>
              </div>
            </div>
          </>
        )}
      </div>

      <Footer />
    </>
  );
};

export default VacancyView;
