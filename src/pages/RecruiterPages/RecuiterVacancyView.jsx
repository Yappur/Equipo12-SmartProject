import React, { useState, useEffect } from "react";
import { NavLink, useParams } from "react-router-dom";
import axiosConfig from "../../helpers/axios.config";
import { FiMonitor } from "react-icons/fi";
import { LuClock5 } from "react-icons/lu";
import { RiMapPinLine } from "react-icons/ri";
import { FaRegClipboard, FaArrowRightArrowLeft } from "react-icons/fa6";
import MenuOpciones from "../../components/Navigate/MenuOpciones";
import ModalEditarVacante from "../../components/Modals/ModalEditarVacante";

const isAuthenticated = true;

const RecuiterVacancyView = () => {
  const { id } = useParams();
  const [vacante, setVacante] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [selectedVacancy, setSelectedVacancy] = useState(null);

  const handleEditVacancy = (vacancy) => {
    setSelectedVacancy(vacancy);
    setIsModalOpen(true);
  };

  const obtenerVacante = async () => {
    try {
      console.log("Renderizó la vista del reclutador");

      const response = await axiosConfig.get(`/vacancies/${id}`);
      console.log("Vacantes obtenidas:", response.data);

      if (!response.data) {
        console.warn("Vacante no encontrada con ID:", id);
        setError("No se encontró la vacante con ese ID.");
      } else {
        console.log("Vacante encontrada:", response.data);
        setVacante(response.data);
      }
    } catch (error) {
      console.error(
        "Error al obtener vacantes:",
        error.response?.data || error.message
      );
      setError("No se pudo cargar la vacante");
    } finally {
      setLoading(false);
    }
  };

  const eliminarVacante = async () => {
    const confirmDelete = window.confirm(
      "¿Estás seguro de que deseas eliminar esta vacante?"
    );
    if (!confirmDelete) return;

    try {
      if (!id) {
        console.error("❌ No se encontró un ID para eliminar.");
        return;
      }

      await axiosConfig.delete(`/vacancies/${id}`);
      alert("✅ La vacante se eliminó correctamente.");

      // Redireccionar a la lista de vacantes después de eliminar
      window.location.href = "/reclutador/vacantes";
    } catch (error) {
      console.error("❌ Error al eliminar la vacante:", error.message);
      alert("Hubo un error al eliminar la vacante.");
    }
  };

  useEffect(() => {
    obtenerVacante();
  }, [id]);

  if (loading) return <p className="pt-24 text-center">Cargando...</p>;
  if (error) return <p className="pt-24 text-center text-red-500">{error}</p>;
  if (!vacante)
    return <p className="pt-24 text-center">Vacante no encontrada.</p>;

  const navItems = [
    { title: "Descripción", path: "#" },
    {
      title: "Candidatos en proceso",
      path: `/reclutador/ver/candidatos/${id}`,
    },
  ];

  return (
    <div className="container mx-auto py-10 px-4 sm:px-8 relative">
      <MenuOpciones
        onEdit={() => handleEditVacancy(vacante)}
        onClose={() => console.log("Cerrar vacante")}
        onLoadCandidate={() => console.log("Cargar candidato")}
        onDelete={eliminarVacante}
        estado={vacante.estado}
        idVacante={id} // ✅ Aquí le pasamos el ID
        className="absolute top-20 right-4"
      />
      <h1 className="text-3xl font-medium text-[#152D53] mb-10">
        {vacante.nombre} {vacante.puesto}
      </h1>

      <div className="relative mb-6 pb-2">
        <div className="flex space-x-6 border-b border-gray-300">
          {navItems.map((item) => (
            <NavLink
              key={item.title}
              to={item.path}
              className={({ isActive }) =>
                `pb-2 relative font-semibold transition-colors duration-200 ${
                  isActive ? "text-black" : "text-black hover:text-[#535353]"
                }`
              }
            >
              {({ isActive }) => (
                <span className="relative">
                  {item.title}
                  {isActive && (
                    <span className="absolute -bottom-[1px] left-0 right-0 h-[3px] bg-[#366FB6] rounded-full"></span>
                  )}
                </span>
              )}
            </NavLink>
          ))}
        </div>
        <h2 className="text-2xl mt-10 text-black">Sobre el puesto</h2>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-3 gap-6 md:gap-10">
        {/* Columna Izquierda */}
        <div className="md:col-span-2">
          <section className="rounded-lg p-4 ">
            <h2 className="text-2xl ml-6 font-semilight mb-6">Descripción</h2>
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
      <ModalEditarVacante
        isOpen={isModalOpen}
        onClose={() => setIsModalOpen(false)}
        vacancy={selectedVacancy}
        refreshVacancies={() => obtenerVacante()}
      />
    </div>
  );
};

export default RecuiterVacancyView;
