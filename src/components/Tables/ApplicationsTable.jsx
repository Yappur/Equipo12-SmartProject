import { useState, useEffect } from "react";
import { Link, useParams, Navigate } from "react-router-dom";
import DataTable from "react-data-table-component";
import axiosConfig from "../../helpers/axios.config";
import PdfModal from "../Modals/PdfModal";
import SearchBar from "./SearchBar";
import { customStyles, paginationOptions } from "./DashboardsStyles";
import cvIcon from "../../assets/img/cvIcon.png";
import { FaSave } from "react-icons/fa";
import Loader from "../Common/Loader";
import { showToast } from "../Modals/CustomToaster";

const ApplicationsTable = () => {
  const { id } = useParams();

  if (!id) {
    return <Navigate to="/reclutador/dashboard" replace />;
  }

  const [postulaciones, setPostulaciones] = useState([]);
  const [filtrarPostulaciones, setFiltrarPostulaciones] = useState("");
  const [loading, setLoading] = useState(true);
  const [analyzing, setAnalyzing] = useState(false);
  const [selectedCV, setSelectedCV] = useState(null);
  const [showModal, setShowModal] = useState(false);
  const [showAnalysisModal, setShowAnalysisModal] = useState(false);
  const [cvCount, setCvCount] = useState(1);
  const [analysisResults, setAnalysisResults] = useState(null);
  const [showResultModal, setShowResultModal] = useState(false);

  useEffect(() => {
    obtenerPostulaciones(id);
  }, [id]);

  const obtenerPostulaciones = async (vacancyId) => {
    try {
      setLoading(true);
      const response = await axiosConfig.get("/applications", {
        params: { vacancyId },
      });
      setPostulaciones(response.data);
    } catch (error) {
      console.error("Error al obtener postulaciones:", error);
    } finally {
      setLoading(false);
    }
  };

  const actualizarEstado = async (id, status, vacancyId) => {
    try {
      await axiosConfig.patch(`/applications/${id}/status`, { status });
      obtenerPostulaciones(vacancyId);
      showToast("Estado actualizado correctamente", "success");
    } catch (error) {
      console.error("Error al actualizar el estado:", error);
    }
  };

  const handleViewCV = (cvUrl) => {
    setSelectedCV(cvUrl);
    setShowModal(true);
  };

  const handleCloseModal = () => {
    setShowModal(false);
    setSelectedCV(null);
  };

  const handleOpenAnalysisModal = () => {
    setShowAnalysisModal(true);
  };

  const handleCloseAnalysisModal = () => {
    setShowAnalysisModal(false);
  };

  const handleStartAnalysis = async () => {
    try {
      setAnalyzing(true);
      handleCloseAnalysisModal();

      const candidatosRecibidos = postulaciones.filter(
        (p) => p.status === "Recibido"
      );

      if (candidatosRecibidos.length === 0) {
        alert("No hay candidatos en estado 'Recibido' para analizar");
        setAnalyzing(false);
        return;
      }

      const response = await fetch(
        "https://backend-foo-talent.onrender.com/recruitment/result_vacancies",
        {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
          },
          body: JSON.stringify({
            vacancyId: id,
            amount: cvCount,
          }),
        }
      );

      if (response.ok) {
        const resultData = await response.json();
        setAnalysisResults(resultData);
        setShowResultModal(true);

        await obtenerPostulaciones(id);
      } else {
        console.error("Error en el análisis:", await response.text());
        alert("Hubo un error al procesar los currículums");
      }
    } catch (error) {
      console.error("Error al analizar los currículums:", error);
      alert("Hubo un error al procesar los currículums");
    } finally {
      setAnalyzing(false);
    }
  };

  const handleCloseResultModal = () => {
    setShowResultModal(false);
  };

  const columns = [
    {
      name: (
        <div className="flex justify-center items-center gap-2 p-3">
          <span></span>
          <span className="flex justify-center items-center gap-2">Nombre</span>
        </div>
      ),
      selector: (row) => row.fullName,
      sortable: true,
    },
    {
      name: "Correo",
      selector: (row) => row.email,
      sortable: true,
    },
    {
      name: "Contacto",
      cell: (row) => (
        <div
          className="flex items-center gap-2 text-green-600 hover:text-green-700 cursor-pointer"
          onClick={() => window.open(`https://wa.me/${row.phone}`, "_blank")}
        >
          <span className="text-gray-800 hover:text-green-700 font-medium">
            {row.phone.startsWith("+") ? row.phone : `+${row.phone}`}
          </span>
        </div>
      ),
      sortable: true,
    },
    {
      name: (
        <div className="flex items-center gap-2">
          <span>Estado</span>
        </div>
      ),
      cell: (row) => {
        const estados = [
          "Recibido",
          "En revisión",
          "Entrevista",
          "Finalista",
          "Descartado",
        ];

        let colorClass = "bg-[#ECE8DC] text-black";
        if (row.status === "Entrevista") colorClass = "bg-[#D8E9FF] text-black";
        if (row.status === "Finalista") colorClass = "bg-[#A9EDC8] text-black";
        if (row.status === "Descartado") colorClass = "bg-[#FBAAB2] text-black";
        if (row.status === "En revisión")
          colorClass = "bg-[#FCFFD2] text-black";

        return (
          <div className="flex flex-col">
            <select
              value={row.status}
              onChange={(e) => actualizarEstado(row.id, e.target.value, id)}
              className={`text-[14px] rounded-full px-2 py-1  ${colorClass}`}
            >
              {estados.map((estado) => (
                <option key={estado} value={estado}>
                  {estado}
                </option>
              ))}
            </select>
          </div>
        );
      },
      sortable: false,
      center: true,
    },
    {
      name: (
        <div className="">
          <span>CV</span>
        </div>
      ),
      cell: (row) => (
        <div className="flex items-center  ">
          <button
            onClick={() => handleViewCV(row.cvUrl)}
            className="flex items-center gap-1 p-4 rounded-lg cursor-pointer duration-500 transform hover:scale-110"
            title="Ver CV"
          >
            <img src={cvIcon} alt="CV" className="w-5" />
          </button>
        </div>
      ),
    },
  ];

  const filtrarData = postulaciones.filter((postulacion) => {
    const searchTerm = filtrarPostulaciones.toLowerCase();
    const nombre = (postulacion.fullName || "").toLowerCase();
    const correo = (postulacion.email || "").toLowerCase();
    const telefono = (postulacion.phone || "").toLowerCase();

    return (
      nombre.includes(searchTerm) ||
      correo.includes(searchTerm) ||
      telefono.includes(searchTerm)
    );
  });

  const totalRecibidos = postulaciones.filter(
    (p) => p.status === "Recibido"
  ).length;
  const totalEnRevision = postulaciones.filter(
    (p) => p.status === "En revisión"
  ).length;
  const totalDescartados = postulaciones.filter(
    (p) => p.status === "Descartado"
  ).length;

  return (
    <>
      <div className=" rounded-lg p-4">
        <div className="flex justify-between items-center mb-4">
          <button
            onClick={handleOpenAnalysisModal}
            disabled={analyzing || totalRecibidos === 0}
            className={`${
              analyzing || totalRecibidos === 0
                ? "bg-gray-400 cursor-not-allowed"
                : "bg-[#152d53] hover:bg-[#192435]"
            } text-white font-medium py-2 px-4 rounded-lg transition duration-300 flex items-center gap-2`}
          >
            {analyzing ? (
              <>
                <svg
                  className="animate-spin h-5 w-5 text-white"
                  xmlns="http://www.w3.org/2000/svg"
                  fill="none"
                  viewBox="0 0 24 24"
                >
                  <circle
                    className="opacity-25"
                    cx="12"
                    cy="12"
                    r="10"
                    stroke="currentColor"
                    strokeWidth="4"
                  ></circle>
                  <path
                    className="opacity-75"
                    fill="currentColor"
                    d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"
                  ></path>
                </svg>
                Analizando...
              </>
            ) : (
              "Analizar Currículums"
            )}
          </button>
        </div>
        <div className="w-full">
          <SearchBar
            value={filtrarPostulaciones}
            onChange={setFiltrarPostulaciones}
            disabled={loading}
          />
        </div>

        <DataTable
          columns={columns}
          data={filtrarData}
          pagination
          customStyles={customStyles}
          paginationComponentOptions={paginationOptions}
          noDataComponent="No hay postulantes disponibles"
          progressPending={loading}
          progressComponent={<Loader />}
        />

        {showModal && (
          <>
            <div className="fixed inset-0 z-40 bg-black/50"></div>
            <div className="fixed inset-0 flex justify-center items-center z-50">
              <div className="bg-white rounded-lg p-4 w-11/12 h-5/6 max-w-4xl relative flex flex-col">
                <PdfModal cvUrl={selectedCV} onClose={handleCloseModal} />
              </div>
            </div>
          </>
        )}

        {/* Modal para configurar el análisis */}
        {showAnalysisModal && (
          <>
            <div className="fixed inset-0 z-40 bg-black/50"></div>
            <div className="fixed inset-0 text-center flex flex-col justify-center items-center z-50">
              <div className="bg-white rounded-lg p-6 w-11/12 max-w-md relative flex flex-col items-center">
                <div className="mb-4 flex flex-col items-center">
                  <div className="flex h-18 w-18 items-center justify-center rounded-full bg-[#AFCEFF] mb-3">
                    <FaSave className="h-9 w-9 text-[#3D75CE]" />
                  </div>
                  <h2 className="text-xl font-semibold text-gray-800 text-center">
                    ¿Cuántos CVs deseas analizar?
                  </h2>
                </div>

                <div className="mb-6 w-full">
                  <p className="text-gray-600 mb-2 text-center">
                    Se analizarán los CVs en estado "Recibido" y se cambiarán a
                    "En revisión" o "Descartado" según los resultados.
                  </p>

                  <div className="flex items-center justify-center ">
                    <button
                      onClick={() => setCvCount(Math.max(1, cvCount - 1))}
                      className="bg-gray-200 hover:bg-gray-300 text-gray-800 font-bold py-2 px-4 rounded-l flex items-center justify-center"
                    >
                      -
                    </button>
                    <input
                      type="number"
                      min="1"
                      max={totalRecibidos}
                      value={cvCount}
                      onChange={(e) =>
                        setCvCount(
                          Math.max(
                            1,
                            Math.min(
                              parseInt(e.target.value) || 1,
                              totalRecibidos
                            )
                          )
                        )
                      }
                      className="w-16 py-2 px-3 text-center border-t border-b border-gray-300"
                    />
                    <button
                      onClick={() =>
                        setCvCount(Math.min(cvCount + 1, totalRecibidos))
                      }
                      className="bg-gray-200 hover:bg-gray-300 text-gray-800 font-bold py-2 px-4 rounded-r flex items-center justify-center"
                    >
                      +
                    </button>
                  </div>
                </div>

                <div className="text-center w-full">
                  <button
                    onClick={handleStartAnalysis}
                    disabled={totalRecibidos === 0}
                    className={`${
                      totalRecibidos === 0
                        ? "bg-gray-400 cursor-not-allowed"
                        : "bg-[#152d53] hover:bg-[#192435]"
                    } text-white font-medium py-2 px-8 rounded-lg transition duration-300 w-full sm:w-auto`}
                  >
                    Comenzar Análisis
                  </button>
                </div>
              </div>
            </div>
          </>
        )}

        {/* Modal de resultados del análisis */}
        {showResultModal && analysisResults && (
          <>
            <div className="fixed inset-0 z-40 bg-black/50"></div>
            <div className="fixed inset-0 flex justify-center items-center z-50">
              <div className="bg-white rounded-lg p-6 w-11/12 max-w-lg relative flex flex-col">
                <div className="flex justify-between items-center mb-4">
                  <h2 className="text-xl font-semibold text-gray-800">
                    Resultados del Análisis
                  </h2>
                </div>

                <div className="mb-6">
                  <div className="grid grid-cols-2 gap-4">
                    <div className="bg-blue-50 p-4 rounded-lg">
                      <h3 className="text-xl font-medium text-blue-800">
                        Total procesados
                      </h3>
                      <p className="text-2xl font-semibold">
                        {analysisResults.processedCount}
                      </p>
                    </div>
                    <div className="bg-green-50 p-4 rounded-lg">
                      <h3 className="text-xl font-medium text-green-800">
                        Exitosos
                      </h3>
                      <p className="text-2xl font-semibold">
                        {analysisResults.successfulCount}
                      </p>
                    </div>
                    <div className="bg-red-50 p-4 rounded-lg">
                      <h3 className="text-xl font-medium text-red-800">
                        Fallidos
                      </h3>
                      <p className="text-2xl font-semibold">
                        {analysisResults.failureCount}
                      </p>
                    </div>
                    <div className="bg-yellow-50 p-4 rounded-lg">
                      <h3 className="text-xl font-medium text-yellow-800">
                        Pendientes
                      </h3>
                      <p className="text-2xl font-semibold">
                        {analysisResults.totalApplications -
                          analysisResults.processedCount}
                      </p>
                    </div>
                  </div>
                </div>

                <div className="text-center">
                  <button
                    onClick={handleCloseResultModal}
                    className="bg-[#152d53] hover:bg-[#192435] text-white font-normal py-2 px-8 rounded-lg transition duration-300"
                  >
                    Cerrar
                  </button>
                </div>
              </div>
            </div>
          </>
        )}
      </div>
    </>
  );
};

export default ApplicationsTable;
