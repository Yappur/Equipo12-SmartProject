import { useState, useEffect, useRef } from 'react';
import { useNavigate } from 'react-router-dom';
import menuIcon from '@/assets/img/menu-tres-puntos.png';
import Editar from '@/assets/img/editar2.png';
import Eliminar from '@/assets/img/eliminar.png';
import CargarCandidato from '@/assets/img/cargar-candidato.png';
import CerrarVacante from '@/assets/img/cerrar-vacante.png';
import axiosConfig from '@/helpers/axios.config';

export default function MenuOpciones({ onEdit, onDelete, onView, onClose, onLoadCandidate, idVacante,estado }) {
  const [isOpen, setIsOpen] = useState(false);
  const menuRef = useRef(null);
  const navigate = useNavigate();
  const [isClosed, setIsClosed] = useState(false);

  const handleToggle = () => {
    setIsOpen(!isOpen);
  };

  const handleDelete = async (id) => {
    try {
      const response = await axiosConfig.delete(`/vacancies/${id}`);
      console.log(`✅ Vacante con ID ${id} eliminada correctamente.`);
      alert(`La vacante fue eliminada correctamente.`);
      setIsOpen(false);
    } catch (error) {
      console.error("❌ Error al eliminar la vacante:", error.message);
      alert("Hubo un error al eliminar la vacante.");
    }
  };

  const handleToggleVacancy = async () => {
    try {
      const nuevoEstado = isClosed ? "abierta" : "cerrada";

      // 🔄 Actualización del estado en el backend
      const response = await axiosConfig.patch(`/vacancies/${idVacante}`, {
        estado: nuevoEstado,
      });

      console.log(`✅ Vacante actualizada correctamente a ${nuevoEstado}:`, response.data);

      // ✅ Mensaje de éxito
      alert(`La vacante fue ${isClosed ? "abierta" : "cerrada"} correctamente.`);

      // 🔄 Cambiar el estado local para reflejar el cambio
      setIsClosed(!isClosed);

      // 🔄 Opcional: lanzar un evento global para actualizar la lista
      window.dispatchEvent(new Event("vacancyUpdated"));

      setIsOpen(false);
    } catch (error) {
      console.error("❌ Error al actualizar la vacante:", error.message);
      alert("Hubo un error al actualizar la vacante.");
    }
  };



  const handleClickOutside = (e) => {
    if (menuRef.current && !menuRef.current.contains(e.target)) {
      setIsOpen(false);
    }
  };

  useEffect(() => {
    document.addEventListener('mousedown', handleClickOutside);
    return () => {
      document.removeEventListener('mousedown', handleClickOutside);
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
              onClick={() => { onEdit(); setIsOpen(false); }}
            >
              <img src={Editar} alt="Editar" className="w-4 h-4 mr-2 object-contain" />
              Editar vacante
            </li>
            <li
              className="flex items-center px-4 py-2 hover:bg-gray-100 cursor-pointer"
              onClick={handleToggleVacancy}
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
              <img src={CargarCandidato} alt="Cargar" className="w-4 h-4 mr-2 object-contain" />
              Cargar candidato
            </li>
            <hr className="my-1 text-gray-200/70" />
            <li
              className="flex items-center px-4 py-2 hover:bg-gray-100 cursor-pointer "
              onClick={onDelete}
            >
              <img src={Eliminar} alt="Eliminar" className="w-4 h-4 mr-2 object-contain" />
              Eliminar vacante
            </li>
          </ul>
        </div>
      )}
    </div>
  );
}
