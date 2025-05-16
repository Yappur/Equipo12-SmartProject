import React, { useState, useEffect } from "react";
import axiosConfig from "../../helpers/axios.config";
import { showToast } from "./CustomToaster";
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
        showToast("No se pudo cargar la información de la vacante", "error");
      }
    } catch (error) {
      console.error("Error al obtener vacante:", error);
      setError(`Error: ${error.message || "Error desconocido"}`);
      showToast("Error al cargar la vacante", "error");
    } finally {
      setIsLoading(false);
    }
  };

  const handleSubmit = async (updatedVacancy) => {
    setIsSubmitting(true);

    try {
      // Cambiado de PUT a PATCH según la especificación del endpoint
      const response = await axiosConfig.patch(
        `/vacancies/${vacancyId}`,
        updatedVacancy
      );

      if (response.status === 200) {
        showToast("Vacante actualizada con éxito", "success");
        if (onVacancyUpdated) {
          onVacancyUpdated(response.data);
        }
        onClose();
      } else {
        showToast(
          `Error al actualizar la vacante: ${response.statusText}`,
          "error"
        );
      }
    } catch (error) {
      console.error("Error al actualizar vacante:", error);
      showToast(
        `Error al actualizar la vacante: ${
          error.message || "Error desconocido"
        }`,
        "error"
      );
    } finally {
      setIsSubmitting(false);
    }
  };

  if (!isOpen) return null;

  return (
    <>
      <div className="fixed inset-0 z-50 bg-black/50"></div>
      <div className="fixed inset-0 flex items-center justify-center z-50 p-4">
        <div className="bg-white rounded-xl w-full max-w-4xl max-h-[90vh] overflow-y-auto">
          <div className="p-6 flex justify-between items-center">
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
    </>
  );
};

export default ModalEditarVacante;
