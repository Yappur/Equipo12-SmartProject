import { useState, useEffect } from "react";
import { Link, useParams, Navigate } from "react-router-dom";
import DataTable from "react-data-table-component";
import axiosConfig from "../../helpers/axios.config";
// import PdfModal from "../Modals/PdfModal";
import SearchBar from "./SearchBar";
import customStyles from "./DashboardsStyles";
import flechasIcon from "../../assets/img/TableCandidatosIcon.png";
import cvIcon from "../../assets/img/cvIcon.png";
import { FaWhatsapp } from "react-icons/fa";

const ApplicationsTable = () => {
  const { id } = useParams();

  if (!id) {
    return <Navigate to="/reclutador/dashboard" replace />;
  }

  const [postulaciones, setPostulaciones] = useState([]);
  const [filtrarPostulaciones, setFiltrarPostulaciones] = useState("");
  const [loading, setLoading] = useState(true);
  const [selectedCV, setSelectedCV] = useState(null);
  const [showModal, setShowModal] = useState(false);
  const [showAnalysisModal, setShowAnalysisModal] = useState(false);
  const [cvCount, setCvCount] = useState(1);

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
    } catch (error) {
      console.error("Error al actualizar el estado:", error);
    }
  };

  // // Maneja la visualización del CV en el modal
  // const handleViewCV = (cvUrl) => {
  //   setSelectedCV(cvUrl);
  //   setShowModal(true);
  // };

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

  const handleStartAnalysis = () => {
    console.log(`Comenzando análisis de ${cvCount} currículums`);
    handleCloseAnalysisModal();
  };

  const columns = [
    {
      name: (
        <div className="flex justify-center items-center gap-2 p-3">
          <span></span>
          <span className="flex justify-center items-center gap-2">Nombre</span>
          <img src={flechasIcon} alt="icono correo" className="w-4 h-4" />
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
          <FaWhatsapp className="text-green-500" />
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
          <img src={flechasIcon} alt="icono correo" className="w-4 h-4" />
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

        let colorClass = "bg-green-200 text-gray-800 w-41 h-7";
        if (row.status === "Finalista")
          colorClass = "bg-green-200 text-green-800 w-41 h-7";
        if (["Recibido", "En revisión"].includes(row.status))
          colorClass = "bg-yellow-200 text-yellow-800 w-41 h-7";
        if (row.status === "Entrevista")
          colorClass = "bg-blue-200 text-blue-800 w-41 h-7";
        if (row.status === "Descartado")
          colorClass = "bg-red-200 text-red-800 w-41 h-7";

        return (
          <div className="flex flex-col">
            <select
              value={row.status}
              onChange={(e) => actualizarEstado(row.id, e.target.value, id)}
              className={`text-sm border border-gray-300 rounded-4xl px-2 py-1 ${colorClass}`}
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
        <div className="w-full flex items-center gap-3 p-3">
          {/* Botón para abrir en nueva pestaña */}
          <button
            onClick={() => window.open(row.cvUrl, "_blank")}
            className="flex items-center gap-1 p-2 rounded-lg cursor-pointer duration-500 transform hover:scale-[1.22]"
            title="Abrir en nueva pestaña"
          >
            <img src={cvIcon} alt="CV" />
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

  return (
    <>
      <div className="bg-white rounded-lg shadow-sm">
        <button
          onClick={handleOpenAnalysisModal}
          className="bg-blue-600 hover:bg-blue-700 text-white mb-4 font-medium py-2 px-4 rounded-lg transition duration-300"
        >
          Analizar Currículums
        </button>
        <div className="">
          <SearchBar
            placeholder="Buscar candidatos..."
            valor={filtrarPostulaciones}
            onChange={(e) => setFiltrarPostulaciones(e.target.value)}
          />
        </div>
        <DataTable
          columns={columns}
          data={filtrarData}
          pagination
          highlightOnHover
          customStyles={customStyles}
          noDataComponent="No hay postulantes disponibles"
          progressPending={loading}
          progressComponent={<div>Cargando datos...</div>}
        />

        {/* {showModal && (
          <>
            <div className="fixed inset-0 z-40 bg-black/50"></div>
            <div className="fixed inset-0 flex justify-center items-center z-50">
              <div className="bg-white rounded-lg p-4 w-11/12 h-5/6 max-w-4xl relative flex flex-col">
                <PdfModal cvUrl={selectedCV} onClose={handleCloseModal} />
              </div>
            </div>
          </>
        )} */}

        {showAnalysisModal && (
          <>
            <div className="fixed inset-0 z-40 bg-black/50"></div>
            <div className="fixed inset-0 flex justify-center items-center z-50">
              <div className="bg-white rounded-lg p-6 w-11/12 max-w-md relative flex flex-col">
                <div className="flex justify-between items-center mb-4">
                  <h2 className="text-xl font-bold text-gray-800">
                    Analizar Currículums
                  </h2>
                  <button
                    onClick={handleCloseAnalysisModal}
                    className="text-gray-500 hover:text-gray-700"
                  >
                    <svg
                      className="w-6 h-6"
                      fill="none"
                      stroke="currentColor"
                      viewBox="0 0 24 24"
                      xmlns="http://www.w3.org/2000/svg"
                    >
                      <path
                        strokeLinecap="round"
                        strokeLinejoin="round"
                        strokeWidth="2"
                        d="M6 18L18 6M6 6l12 12"
                      ></path>
                    </svg>
                  </button>
                </div>

                <div className="mb-6">
                  <label className="block text-gray-700 text-sm font-medium mb-2">
                    ¿Cuántos currículums deseas analizar?
                  </label>
                  <div className="flex items-center">
                    <button
                      onClick={() => setCvCount(Math.max(1, cvCount - 1))}
                      className="bg-gray-200 hover:bg-gray-300 text-gray-800 font-bold py-2 px-4 rounded-l"
                    >
                      -
                    </button>
                    <input
                      type="number"
                      min="1"
                      max={postulaciones.length}
                      value={cvCount}
                      onChange={(e) =>
                        setCvCount(Math.max(1, parseInt(e.target.value) || 1))
                      }
                      className="w-16 py-2 px-3 text-center border-t border-b border-gray-300"
                    />
                    <button
                      onClick={() => setCvCount(cvCount + 1)}
                      className="bg-gray-200 hover:bg-gray-300 text-gray-800 font-bold py-2 px-4 rounded-r"
                    >
                      +
                    </button>
                  </div>
                </div>

                <div className="text-center">
                  <button
                    onClick={handleStartAnalysis}
                    className="bg-blue-600 hover:bg-blue-700 text-white font-medium py-2 px-8 rounded-lg transition duration-300"
                  >
                    Comenzar Prueba
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
