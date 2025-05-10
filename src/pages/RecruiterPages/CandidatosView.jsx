import React, { useState } from "react";
import { Link } from "react-router-dom";
import crearUser from "../../assets/img/DesingExports/crearUser.svg";
import FormCandidatos from "../../components/Forms/FormCandidatos";

const CandidatosView = () => {
  // Estado para controlar la visibilidad del formulario
  const [showForm, setShowForm] = useState(false);

  // Función para mostrar el formulario
  const handleShowForm = () => {
    setShowForm(true);
  };

  // Función para ocultar el formulario (para usar en el botón Cancelar del formulario)
  const handleHideForm = () => {
    setShowForm(false);
  };

  return (
    <div className="p-4">
      <h1 className="text-2xl font-medium text-[#00254B] mb-4">
        Candidatos/Nuevos Candidatos
      </h1>

      {!showForm ? (
        // Mostrar el botón cuando showForm es false
        <div
          className="flex flex-col items-center justify-center cursor-pointer py-16"
          onClick={handleShowForm}
        >
          <div className="mb-2">
            <img
              src={crearUser || "/placeholder.svg"}
              alt="crearUser"
              className="w-24 h-24"
            />
          </div>
          <span className="text-lg font-medium text-[#00254B]">
            Nuevo Candidato
          </span>
        </div>
      ) : (
        // Mostrar el formulario cuando showForm es true
        <div className="w-full">
          {/* Pasamos la función handleHideForm como prop al formulario para que pueda cerrarse */}
          <FormCandidatos onCancel={handleHideForm} />
        </div>
      )}
    </div>
  );
};

export default CandidatosView;
