import React, { useState, useEffect } from "react";
import crearUser from "../../assets/img/DesingExports/crearUser.svg";
import FormCandidatos from "../../components/Forms/FormCandidatos";
import axiosConfig from "../../helpers/axios.config";
import { useAuth } from "../../context/AuthContext";

const CandidatosView = () => {
  const { idUser } = useAuth();
  const [showForm, setShowForm] = useState(false);
  const [vacancies, setVacancies] = useState([]);
  const [selectedVacancy, setSelectedVacancy] = useState(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchVacancies = async () => {
      try {
        const response = await axiosConfig.get("/vacancies");
        // Filtrar solo las vacantes del reclutador actual
        const recruiterVacancies = response.data.filter(
          (vacancy) => vacancy.createdBy === idUser?.id
        );
        setVacancies(recruiterVacancies);
        setLoading(false);
      } catch (error) {
        console.error("Error al cargar vacantes:", error);
        setLoading(false);
      }
    };

    if (idUser?.id) {
      fetchVacancies();
    }
  }, [idUser]);

  const handleShowForm = (vacancyId = null) => {
    setSelectedVacancy(vacancyId);
    setShowForm(true);
  };

  const handleHideForm = () => {
    setShowForm(false);
    setSelectedVacancy(null);
  };

  if (loading && idUser) {
    return <div className="p-4">Cargando vacantes...</div>;
  }

  return (
    <div className="p-4">
      <h1 className="text-2xl font-medium text-[#00254B] mb-4">
        Candidatos/Nuevos Candidatos
      </h1>

      {!showForm ? (
        <div className="space-y-6">
          {/* Opción para agregar candidato sin vacante específica */}
          <div
            className="flex flex-col items-center justify-center cursor-pointer py-16 border-2 border-dashed border-gray-300 rounded-lg hover:bg-gray-50"
            onClick={() => handleShowForm()}
          >
            <div className="mb-2">
              <img
                src={crearUser || "/placeholder.svg"}
                alt="crearUser"
                className="ml-8"
              />
            </div>
            <span className="text-lg font-medium">Nuevo Candidato</span>
          </div>

          {/* Lista de vacantes del reclutador */}
          {vacancies.length > 0 && (
            <div className="mt-8">
              <h2 className="text-xl font-medium text-[#00254B] mb-4">
                Mis Vacantes
              </h2>
              <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
                {vacancies.map((vacancy) => (
                  <div
                    key={vacancy.id}
                    className="border rounded-lg p-4 cursor-pointer hover:shadow-md transition-shadow"
                    onClick={() => handleShowForm(vacancy.id)}
                  >
                    <h3 className="font-medium">
                      {vacancy.nombre || vacancy.title}
                    </h3>
                    <p className="text-sm text-gray-600 mt-2">
                      {vacancy.descripcion || vacancy.description}
                    </p>
                    <div className="mt-4 flex justify-between items-center">
                      <span className="text-xs text-gray-500">
                        Candidatos: {vacancy.applicationsCount || 0}
                      </span>
                      <button
                        className="bg-green-600 text-white px-3 py-1 rounded text-sm hover:bg-green-700"
                        onClick={(e) => {
                          e.stopPropagation();
                          handleShowForm(vacancy.id);
                        }}
                      >
                        + Agregar Candidato
                      </button>
                    </div>
                  </div>
                ))}
              </div>
            </div>
          )}
        </div>
      ) : (
        <div className="w-full">
          <FormCandidatos
            onClose={handleHideForm}
            vacancyId={selectedVacancy}
            isRecruiter={true}
          />
        </div>
      )}
    </div>
  );
};

export default CandidatosView;
