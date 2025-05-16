import { useState, useEffect } from "react";
import DataTable from "react-data-table-component";
import Modal from "../Modals/Modal";
import axiosConfig from "../../helpers/axios.config";
import SearchBar from "./SearchBar";
import { customStyles, paginationOptions } from "./DashboardsStyles";

const GeneralApplicationsTable = () => {
  const [postulaciones, setPostulaciones] = useState([]);
  const [filtrarPostulaciones, setFiltrarPostulaciones] = useState("");
  const [loading, setLoading] = useState(true);
  const [selectedCV, setSelectedCV] = useState(null);
  const [showModal, setShowModal] = useState(false);

  useEffect(() => {
    obtenerPostulaciones();
  }, []);

  const obtenerPostulaciones = async () => {
    try {
      setLoading(true);
      const response = await axiosConfig.get("/applications"); // 👈 sin parámetro
      setPostulaciones(response.data);
    } catch (error) {
      console.error("Error al obtener postulaciones:", error);
    } finally {
      setLoading(false);
    }
  };

  const actualizarEstado = async (id, status) => {
    try {
      await axiosConfig.patch(`/applications/${id}/status`, { status });
      obtenerPostulaciones(); // 👈 se refresca la lista general
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

  const columns = [
    {
      name: "Nombre",
      selector: (row) => row.fullName,
      sortable: true,
    },
    {
      name: "Correo",
      selector: (row) => row.email,
      sortable: true,
    },
    {
      name: "Telefono",
      selector: (row) => row.phone,
      sortable: true,
    },
    {
      name: "Habilidades",
      selector: (row) => row.skills,
      sortable: true,
    },
    {
      name: "Estado",
      cell: (row) => {
        const estados = [
          "Recibido",
          "En revisión",
          "Entrevista",
          "Finalista",
          "Descartado",
        ];

        let colorClass = "bg-gray-200 text-gray-800";
        if (row.status === "Finalista")
          colorClass = "bg-green-200 text-green-800";
        if (["Recibido", "En revisión"].includes(row.status))
          colorClass = "bg-yellow-200 text-yellow-800";
        if (row.status === "Entrevista")
          colorClass = "bg-blue-200 text-blue-800";
        if (row.status === "Descartado") colorClass = "bg-red-200 text-red-800";

        return (
          <div className="flex flex-col">
            <select
              value={row.status}
              onChange={(e) => actualizarEstado(row.id, e.target.value)}
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
    },
    {
      name: "CV",
      cell: (row) => (
        <button
          onClick={() => handleViewCV(row.cvUrl)}
          className="text-blue-600 underline hover:text-blue-800 flex items-center"
        >
          <svg
            xmlns="http://www.w3.org/2000/svg"
            className="h-4 w-4 mr-1"
            fill="none"
            viewBox="0 0 24 24"
            stroke="currentColor"
          >
            <path
              strokeLinecap="round"
              strokeLinejoin="round"
              strokeWidth={2}
              d="M15 12a3 3 0 11-6 0 3 3 0 016 0z"
            />
            <path
              strokeLinecap="round"
              strokeLinejoin="round"
              strokeWidth={2}
              d="M2.458 12C3.732 7.943 7.523 5 12 5c4.478 0 8.268 2.943 9.542 7-1.274 4.057-5.064 7-9.542 7-4.477 0-8.268-2.943-9.542-7z"
            />
          </svg>
          Ver CV
        </button>
      ),
    },
  ];

  const filtrarData = postulaciones.filter((postulacion) => {
    const searchTerm = filtrarPostulaciones.toLowerCase();
    const nombre = (postulacion.fullName || "").toLowerCase();
    const correo = (postulacion.email || "").toLowerCase();
    const telefono = (postulacion.phone || "").toLowerCase();
    let habilidades = "";

    if (Array.isArray(postulacion.skills)) {
      habilidades = postulacion.skills.join(" ").toLowerCase();
    } else if (typeof postulacion.skills === "string") {
      habilidades = postulacion.skills.toLowerCase();
    }

    return (
      nombre.includes(searchTerm) ||
      correo.includes(searchTerm) ||
      telefono.includes(searchTerm) ||
      habilidades.includes(searchTerm)
    );
  });

  return (
    <>
      <div className="bg-white p-6 rounded-lg shadow-sm">
        <div className="flex justify-between items-center mb-6">
          <h1 className="text-2xl font-bold">Lista General de Postulaciones</h1>
        </div>
        <SearchBar
          value={filtrarPostulaciones}
          onChange={setFiltrarPostulaciones}
          disabled={loading}
        />
        <div>
          <p>Cantidad de postulados: {postulaciones.length}</p>
        </div>
        <DataTable
          columns={columns}
          data={filtrarData}
          pagination
          paginationComponentOptions={paginationOptions}
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
      </div>
    </>
  );
};

export default GeneralApplicationsTable;
