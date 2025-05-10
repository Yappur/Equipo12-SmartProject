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
  const [error, setError] = useState(null);

  const fetchVacancies = async () => {
    if (!idUser?.id) {
      setLoading(false);
      return;
    }

    try {
      setLoading(true);
      setError(null);
      console.log("Obteniendo vacantes para el usuario:", idUser.id);
      const response = await axiosConfig.get("/vacancies");
      console.log("Todas las vacantes:", response.data);

      const recruiterVacancies = response.data.filter((vacancy) => {
        console.log(`Comparando: ${vacancy.userId} con ${idUser.id}`);

        return String(vacancy.userId) === String(idUser.id);
      });

      console.log("Vacantes filtradas del reclutador:", recruiterVacancies);
      setVacancies(recruiterVacancies);
    } catch (error) {
      console.error("Error al cargar vacantes:", error);
      setError("Error al cargar vacantes. Por favor, inténtelo de nuevo.");
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchVacancies();
  }, [idUser]);

  const handleShowForm = (vacancyId = null) => {
    console.log("Mostrando formulario con vacancyId:", vacancyId);
    setSelectedVacancy(vacancyId);
    setShowForm(true);
  };

  const handleHideForm = () => {
    console.log("Ocultando formulario");
    setShowForm(false);
    setSelectedVacancy(null);
    fetchVacancies();
  };

  if (loading) {
    return <div className="p-4">Cargando vacantes...</div>;
  }

  if (error) {
    return (
      <div className="p-4 text-red-500">
        {error}
        <button
          onClick={fetchVacancies}
          className="ml-4 px-3 py-1 bg-blue-500 text-white rounded"
        >
          Reintentar
        </button>
      </div>
    );
  }
  return (
    <div className="max-w-4xl mx-auto p-4">
      <h1 className="text-2xl font-semibold text-[#00254B] mb-4">
        Candidatos/Nuevos Candidatos
      </h1>

      {!showForm ? (
        <div className="space-y-6">
          <div
            className="flex flex-col items-center justify-center cursor-pointer py-16"
            onClick={() => handleShowForm()}
          >
            <div className="relative mb-2">
              <img
                src={crearUser || "/placeholder.svg"}
                alt="crearUser"
                className="ml-8"
              />
            </div>
            <span className="text-lg font-medium">Nuevo Candidato</span>
          </div>

          {/* Lista de vacantes del reclutador */}
          {/* {vacancies.length > 0 ? (
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
                      {vacancy.nombre || vacancy.title || "Vacante sin título"}
                    </h3>
                    <p className="text-sm text-gray-600 mt-2 line-clamp-2">
                      {vacancy.descripcion ||
                        vacancy.description ||
                        "Sin descripción"}
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
          ) : (
            <div className="mt-8 p-4 border rounded-lg bg-yellow-50 text-yellow-800">
              <h2 className="text-xl font-medium mb-2">No tienes vacantes</h2>
              <p>
                Debes crear vacantes primero antes de poder agregar candidatos a
                ellas.
              </p>
            </div>
          )} */}
        </div>
      ) : (
        <div className="">
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
