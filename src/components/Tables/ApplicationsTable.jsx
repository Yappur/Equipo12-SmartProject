import { useState, useEffect } from "react";
import { Link, useParams, Navigate } from "react-router-dom"; // 👈 Añadido Navigate
import DataTable from "react-data-table-component";
import Modal from "../Modals/Modal";
import axiosConfig from "../../helpers/axios.config";
import PdfModal from "../Modals/PdfModal";
import SearchBar from "./SearchBar";
import customStyles from "./DashboardsStyles";
import flechasIcon from "../../assets/img/TableCandidatosIcon.png"; 
import cvIcon from "../../assets/img/cvIcon.png";// O el nombre de la imagen que vayas a usar


const   ApplicationsTable = () => {
  const { id } = useParams();

  if (!id) {
    return <Navigate to="/reclutador/dashboard" replace />;
  }

  const [postulaciones, setPostulaciones] = useState([]);
  const [filtrarPostulaciones, setFiltrarPostulaciones] = useState("");
  const [loading, setLoading] = useState(true);
  const [selectedCV, setSelectedCV] = useState(null);
  const [showModal, setShowModal] = useState(false);

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
      name: (
    <div className="flex justify-center items-center gap-2 p-3">
      <span></span><span  className="flex justify-center items-center gap-2">Nombre</span>
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
      name: "Telefono",
      selector: (row) => row.phone,
      sortable: true,
    },
    {

      name:(
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
    /*{
      name: "Correo",
      selector: (row) => row.email,
      sortable: true,
    },*/
    {
      name: "Contacto",
      selector: (row) => row.phone,
      sortable: true,
    },
    /*{
      name: "Habilidades",
      selector: (row) => row.skills,
      sortable: true,
    },*/
    
     {
      name: (
        <div className="">
          <span>CV</span>
   
        </div>
      ),
      
      cell: (row) => (
        <div className="w-full flex p-3">
          <button
            onClick={() => handleViewCV(row.cvUrl)}
            className="flex items-center gap-1 text-blue-600 hover:text-blue-800 underline"
          >
            <img src={cvIcon} alt="icono cv" className="w-4 h-4" />
           
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
      <div className="bg-white p-6 rounded-lg shadow-sm">
        <div className="flex justify-between items-center mb-6">
          
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
      </div>
    </>
  );
};

export default ApplicationsTable;
