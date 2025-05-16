import { useState, useEffect, useRef } from "react";
import { useNavigate } from "react-router-dom";
import menuIcon from "@/assets/img/menu-tres-puntos.png";
import Editar from "@/assets/img/editar2.png";
import Eliminar from "@/assets/img/eliminar.png";
import CargarCandidato from "@/assets/img/cargar-candidato.png";
import CerrarVacante from "@/assets/img/cerrar-vacante.png";
import axiosConfig from "@/helpers/axios.config";
import { showToast } from "../../components/Modals/CustomToaster";
import ModalEditarVacante from "../Modals/ModalEditarVacante";
import Modal from "../Modals/Modal";

export default function MenuOpciones({ idVacante, estado }) {
  const [isOpen, setIsOpen] = useState(false);
  const [isEditModalOpen, setIsEditModalOpen] = useState(false);
  const menuRef = useRef(null);
  const navigate = useNavigate();
  const [isClosed, setIsClosed] = useState(false);

  const [showDeleteModal, setShowDeleteModal] = useState(false);
  const [showToggleModal, setShowToggleModal] = useState(false);

  const handleToggle = () => {
    setIsOpen(!isOpen);
  };

  const deleteVacancy = async () => {
    try {
      const response = await axiosConfig.delete(`/vacancies/${idVacante}`);
      showToast("La vacante fue eliminada correctamente", "success");
      setIsOpen(false);
      window.dispatchEvent(new Event("vacancyUpdated"));
      navigate("/reclutador/vacantes");
    } catch (error) {
      console.error("❌ Error al eliminar la vacante:", error.message);
    }
  };

  const confirmDelete = () => {
    setShowDeleteModal(true);
    setIsOpen(false);
  };

  const toggleVacancy = async () => {
    try {
      const nuevoEstado = isClosed ? "abierta" : "cerrada";

      const response = await axiosConfig.patch(`/vacancies/${idVacante}`, {
        estado: nuevoEstado,
      });

      showToast(
        `La vacante fue ${isClosed ? "abierta" : "cerrada"} correctamente`,
        "success"
      );

      setIsClosed(!isClosed);

      window.dispatchEvent(new Event("vacancyUpdated"));
    } catch (error) {
      console.error("❌ Error al actualizar la vacante:", error.message);
    }
  };

  const confirmToggleVacancy = () => {
    setShowToggleModal(true);
    setIsOpen(false);
  };

  const handleVacancyUpdated = (updatedVacancy) => {
    console.log("Vacante actualizada:", updatedVacancy);
    window.dispatchEvent(new Event("vacancyUpdated"));
  };

  const handleOpenEditModal = () => {
    setIsEditModalOpen(true);
    setIsOpen(false);
  };

  const handleClickOutside = (e) => {
    if (menuRef.current && !menuRef.current.contains(e.target)) {
      setIsOpen(false);
    }
  };

  useEffect(() => {
    document.addEventListener("mousedown", handleClickOutside);
    return () => {
      document.removeEventListener("mousedown", handleClickOutside);
    };
  }, []);

  useEffect(() => {
    if (estado === "cerrada") {
      setIsClosed(true);
    }
  }, [estado]);

  const navigateToCandidates = () => {
    navigate(`/reclutador/candidatos`, { state: { idVacante } });
  };

  return (
    <div className="" ref={menuRef}>
      <img
        src={menuIcon}
        alt="Menu opciones"
        className="cursor-pointer absolute right-5 top-10 mt-2 mr-2 "
        onClick={handleToggle}
      />
      {isOpen && (
        <div className="absolute right-10 top-10 w-56 bg-white border border-gray-200 rounded-md shadow-lg z-50">
          <ul className="py-1">
            <li
              className="flex items-center px-4 py-2 hover:bg-gray-100 cursor-pointer"
              onClick={handleOpenEditModal}
            >
              <img
                src={Editar}
                alt="Editar"
                className="w-4 h-4 mr-2 object-contain"
              />
              Editar vacante
            </li>
            <li
              className="flex items-center px-4 py-2 hover:bg-gray-100 cursor-pointer"
              onClick={confirmToggleVacancy}
            >
              <img
                src={CerrarVacante}
                alt={isClosed ? "Abrir" : "Cerrar"}
                className="w-4 h-4 mr-2 object-contain"
              />
              {isClosed ? "Abrir vacante" : "Cerrar vacante"}
            </li>

            <li
              className="flex items-center px-4 py-2 hover:bg-gray-100 cursor-pointer"
              onClick={() => {
                navigate(`/reclutador/candidatos?vacancyId=${idVacante}`);
                setIsOpen(false);
              }}
            >
              <img
                src={CargarCandidato}
                alt="Cargar"
                className="w-4 h-4 mr-2 object-contain"
              />
              Cargar candidato
            </li>
            <hr className="my-1 text-gray-200/70" />
            <li
              className="flex items-center px-4 py-2 hover:bg-gray-100 cursor-pointer "
              onClick={confirmDelete}
            >
              <img
                src={Eliminar}
                alt="Eliminar"
                className="w-4 h-4 mr-2 object-contain"
              />
              Eliminar vacante
            </li>
          </ul>
        </div>
      )}

      <Modal
        isOpen={showDeleteModal}
        onClose={() => setShowDeleteModal(false)}
        tipo="delete"
        titulo="Eliminar vacante"
        mensaje="¿Estás seguro que deseas eliminar esta vacante? Esta acción no se puede deshacer."
        btnPrimario="Eliminar"
        btnSecundario="Cancelar"
        accionPrimaria={deleteVacancy}
      />

      <Modal
        isOpen={showToggleModal}
        onClose={() => setShowToggleModal(false)}
        tipo="confirm"
        titulo={isClosed ? "Abrir vacante" : "Cerrar vacante"}
        mensaje={`¿Estás seguro que deseas ${
          isClosed ? "abrir" : "cerrar"
        } esta vacante?`}
        btnPrimario={isClosed ? "Abrir" : "Cerrar"}
        btnSecundario="Cancelar"
        accionPrimaria={toggleVacancy}
      />

      <ModalEditarVacante
        isOpen={isEditModalOpen}
        onClose={() => setIsEditModalOpen(false)}
        vacancyId={idVacante}
        onVacancyUpdated={handleVacancyUpdated}
      />
    </div>
  );
}
