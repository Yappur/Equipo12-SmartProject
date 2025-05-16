import React, { useState } from "react";
import axiosConfig from "../../helpers/axios.config";
import bagIcon from "../../assets/img/DesingExports/bag.svg";
import toast from "react-hot-toast";
import { useNavigate } from "react-router-dom";
import FormCreateVacancy from "../../components/Forms/FormCreateVacancy";

const ViewCreateVacancy = () => {
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [isFirstStep, setIsFirstStep] = useState(true);
  const navigate = useNavigate();

  const handleSubmit = async (nuevaVacante) => {
    setIsSubmitting(true);

    try {
      const response = await axiosConfig.post("/vacancies", nuevaVacante);

      if (response.status === 200 || response.status === 201) {
        toast.success("Vacante creada con éxito");

        const id = response.data?.id || response.data?._id;

        if (id) {
          navigate(`/reclutador/Descriptionvacancy/${id}`);
        } else {
          toast.error("No se pudo redirigir: ID no encontrado en la respuesta");
        }
      } else {
        toast.error(`Error al crear la vacante: ${response.statusText}`);
      }
    } catch (error) {
      console.error("Error al crear vacante:", error);
      toast.error(
        `Error al crear la vacante: ${error.message || "Error desconocido"}`
      );
    } finally {
      setIsSubmitting(false);
    }
  };

  const handleCancel = () => {
    setIsFirstStep(true);
  };

  return (
    <>
      <div className="p-8 max-w-4xl mx-auto">
        <h1 className="text-2xl font-semibold text-[#00254B] mb-6">
          Vacantes/Nueva vacante
        </h1>

        {!isFirstStep ? (
          <FormCreateVacancy
            onSubmit={handleSubmit}
            onCancel={handleCancel}
            isSubmitting={isSubmitting}
            initialValues={{}}
          />
        ) : (
          <div
            className="flex flex-col items-center justify-center cursor-pointer py-16 px-4 sm:px-6 transition-all duration-300 transform hover:scale-[1.02]"
            onClick={() => setIsFirstStep(false)}
          >
            <img src={bagIcon} alt="Crear vacante" className="ml-8 mb-2" />

            <h2 className="text-xl font-medium text-center">Nueva vacante</h2>
          </div>
        )}
      </div>
    </>
  );
};

export default ViewCreateVacancy;
