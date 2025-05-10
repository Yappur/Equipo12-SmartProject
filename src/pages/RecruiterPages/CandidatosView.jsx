import React, { useState } from "react";
import crearUser from "../../assets/img/DesingExports/crearUser.svg";
import FormCandidatos from "../../components/Forms/FormCandidatos";

const CandidatosView = () => {
  const [showForm, setShowForm] = useState(false);

  const handleShowForm = () => {
    setShowForm(true);
  };

  const handleHideForm = () => {
    setShowForm(false);
  };

  return (
    <div className="p-4">
      <h1 className="text-2xl font-medium text-[#00254B] mb-4">
        Candidatos/Nuevos Candidatos
      </h1>

      {!showForm ? (
        <div
          className="flex flex-col items-center justify-center cursor-pointer py-16"
          onClick={handleShowForm}
        >
          <div className="mb-2">
            <img
              src={crearUser || "/placeholder.svg"}
              alt="crearUser"
              className="ml-8"
            />
          </div>
          <span className="text-lg font-medium ">Nuevo Candidato</span>
        </div>
      ) : (
        <div className="w-full">
          <FormCandidatos onCancel={handleHideForm} />
        </div>
      )}
    </div>
  );
};

export default CandidatosView;
