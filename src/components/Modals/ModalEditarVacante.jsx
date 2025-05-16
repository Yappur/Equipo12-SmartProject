import React, { useState, useEffect } from "react";
import axiosConfig from "../../helpers/axios.config";
import toast from "react-hot-toast";
import { X } from "lucide-react";
import FormCreateVacancy from "../Forms/FormCreateVacancy";

const ModalEditarVacante = ({
  isOpen,
  onClose,
  vacancyId,
  onVacancyUpdated,
}) => {
  const [isLoading, setIsLoading] = useState(true);
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [vacancyData, setVacancyData] = useState(null);
  const [error, setError] = useState(null);

  useEffect(() => {
    // Solo cargar datos cuando el modal esté abierto y exista un ID de vacante
    if (isOpen && vacancyId) {
      fetchVacancyData();
    }
  }, [isOpen, vacancyId]);

  const fetchVacancyData = async () => {
    setIsLoading(true);
    setError(null);

    try {
      const response = await axiosConfig.get(`/vacancies/${vacancyId}`);
      if (response.status === 200) {
        setVacancyData(response.data);
      } else {
        setError("Error al cargar los datos de la vacante");
        toast.error("No se pudo cargar la información de la vacante");
      }
    } catch (error) {
      console.error("Error al obtener vacante:", error);
      setError(`Error: ${error.message || "Error desconocido"}`);
      toast.error("Error al cargar la vacante");
    } finally {
      setIsLoading(false);
    }
  };

  const handleSubmit = async (updatedVacancy) => {
    setIsSubmitting(true);

    try {
      const response = await axiosConfig.put(
        `/vacancies/${vacancyId}`,
        updatedVacancy
      );

      if (response.status === 200) {
        toast.success("Vacante actualizada con éxito");
        if (onVacancyUpdated) {
          onVacancyUpdated(response.data);
        }
        onClose();
      } else {
        toast.error(`Error al actualizar la vacante: ${response.statusText}`);
      }
    } catch (error) {
      console.error("Error al actualizar vacante:", error);
      toast.error(
        `Error al actualizar la vacante: ${
          error.message || "Error desconocido"
        }`
      );
    } finally {
      setIsSubmitting(false);
    }
  };

  // Si el modal no está abierto, no renderizar nada
  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50 p-4">
      <div className="bg-white rounded-lg w-full max-w-4xl max-h-[90vh] overflow-y-auto">
        <div className="p-6 border-b flex justify-between items-center">
          <h2 className="text-xl font-semibold text-[#00254B]">
            Editar Vacante
          </h2>
          <button
            onClick={onClose}
            className="p-1 rounded-full hover:bg-gray-100"
          >
            <X className="h-6 w-6" />
          </button>
        </div>

        <div className="p-6">
          {isLoading ? (
            <div className="flex justify-center p-8">
              <div className="animate-spin rounded-full h-12 w-12 border-t-2 border-b-2 border-[#00254B]"></div>
            </div>
          ) : error ? (
            <div className="text-red-500 p-4 text-center">
              {error}
              <button
                onClick={fetchVacancyData}
                className="block mx-auto mt-4 px-4 py-2 bg-[#00254B] text-white rounded hover:bg-[#001a38]"
              >
                Reintentar
              </button>
            </div>
          ) : (
            <FormCreateVacancy
              initialValues={vacancyData}
              onSubmit={handleSubmit}
              onCancel={onClose}
              isSubmitting={isSubmitting}
            />
          )}
        </div>
      </div>
    </div>
  );
};

export default ModalEditarVacante;
