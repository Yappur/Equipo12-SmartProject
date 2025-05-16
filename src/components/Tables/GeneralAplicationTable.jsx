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
  const [nombreVacante, setNombreVacante] = useState("");


  const obtenerNombreVacante = async (id) => {
    try {
      const response = await axiosConfig.get(`/vacancies/${id}`);
      console.log("Nombre de la vacante:", response.data);
      return response.data.puesto; // 👈 Aquí se obtiene el nombre
    } catch (error) {
      console.error("Error al obtener el nombre de la vacante:", error);
      return "Sin nombre";
    }
  };


  useEffect(() => {
    obtenerNombreVacante();
  }, []);

  useEffect(() => {
    obtenerPostulaciones();
  }, []);

  const obtenerPostulaciones = async () => {
    try {
      setLoading(true);
      const response = await axiosConfig.get("/applications/all",{
        params: {
        limit: 100,
        page: 1, // Puedes modificar el número de página si lo necesitas
      },}
      ); // 👈 sin parámetro
      setPostulaciones(response.data);
      console.log("Postulaciones obtenidas:", response.data);
    } catch (error) {
      console.error("Error al obtener postulaciones:", error);
    } finally {
      setLoading(false);
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
      name: "Vacante",
      cell: (row) => {
        const [nombreVacante, setNombreVacante] = useState("Cargando...");

        useEffect(() => {
          const fetchNombre = async () => {
            try {
              const nombre = await obtenerNombreVacante(row.vacancyId);
              setNombreVacante(nombre || "Sin título");
            } catch (error) {
              console.error("Error al obtener el nombre de la vacante:", error);
              setNombreVacante("Sin título");
            }
          };
          fetchNombre();
        }, [row.vacancyId]);

        return (
          <div className="group relative">
            <a
              href={`/reclutador/Descriptionvacancy/${row.vacancyId}`}
              className="text-black hover:underline cursor-pointer font-medium"
              title={`Ver dashboard de ${nombreVacante}`}
            >
              {nombreVacante}
            </a>
          </div>
        );
      },
      sortable: true,
    },

    {
      name: "Fecha",
      selector: (row) => {
        if (row.createdAt) {
          // Si es un timestamp de Firebase
          if (row.createdAt._seconds) {
            const fecha = new Date(row.createdAt._seconds * 1000);
            return fecha.toLocaleDateString('es-ES', {
              year: 'numeric',
              month: '2-digit',
              day: '2-digit',
            });
          } else {
            // Si es un string ISO
            const fecha = new Date(row.createdAt);
            if (!isNaN(fecha)) {
              return fecha.toLocaleDateString('es-ES', {
                year: 'numeric',
                month: '2-digit',
                day: '2-digit',
              });
            }
          }
        }
        return "Sin fecha";
      },
      sortable: true,
    },


    {
      name: "Estado",
      cell: (row) => {
        let colorClass = "bg-gray-200 text-gray-800";
        if (row.status === "Finalista") colorClass = "bg-[#A9EDC8] text-black";
        if (["Recibido", "En revisión"].includes(row.status))
          colorClass = "bg-[#FCFFD2] text-black";
        if (row.status === "Entrevista") colorClass = "bg-[#D8E9FF] text-black";
        if (row.status === "Descartado") colorClass = "bg-[#FBAAB2] text-black";

        return (
          <span
            className={`text-[14px] rounded-full px-2 py-1 ${colorClass} w-28 text-center`}
          >
            {row.status}
          </span>
        );
      },
      sortable: false,
    },
    {
      name: "Contacto",
      cell: (row) => (
        <div className="flex flex-col">
          <span>{row.phone}</span>
        </div>
      ),
    },
    {
      name: "CV",
      cell: (row) => (

        <button
          onClick={() => handleViewCV(row.cvUrl)}
          className="text-blue-600 underline hover:text-blue-800 flex items-center cursor-pointer"
        >
          <img src={IconoCV} alt="Icono de CV" />
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
      <div className="bg-white rounded-lg">
        <div className="flex justify-between items-center mb-6">
          <h1 className="text-2xl poppins text-[#152D53]">Candidatos</h1>
        </div>
        <SearchBar
          value={filtrarPostulaciones}
          onChange={setFiltrarPostulaciones}
          disabled={loading}
        />

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

export default GeneralApplicationsTable;
