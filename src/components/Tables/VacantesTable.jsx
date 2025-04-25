import React, { useState, useEffect } from "react";
import DataTable from "react-data-table-component";
import axiosConfig from "../../helpers/axios.config";

const customStyles = {
  headCells: {
    style: {
      backgroundColor: "#f97316",
      color: "white",
      fontWeight: "bold",
      fontSize: "16px",
    },
  },
  rows: {
    style: {
      fontSize: "14px",
      minHeight: "48px",
      "&:hover": {
        backgroundColor: "#fef3c7",
      },
    },
  },
  pagination: {
    style: {
      backgroundColor: "#f1f5f9",
    },
  },
};

const Loader = () => (
  <div className="flex justify-center items-center py-20">
    <div className="w-10 h-10 border-4 border-blue-500 border-t-transparent rounded-full animate-spin"></div>
    <p className="ml-4 text-gray-600 font-medium">Cargando Vacantes...</p>
  </div>
);

const VacantesTable = () => {
  const [filtrarVacantes, setFiltrarVacantes] = useState("");
  const [vacantes, setVacantes] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [refreshCounter, setRefreshCounter] = useState(0); // Contador para forzar actualizaciones

  const obtenerVacantes = async () => {
    try {
      setLoading(true);
      setError(null);

      console.log("Solicitando vacantes al servidor...");
      const response = await axiosConfig.get("/vacancies");
      console.log("Respuesta del servidor:", response);

      if (response.data) {
        let vacantesData = [];

        if (Array.isArray(response.data)) {
          vacantesData = response.data;
        } else if (
          response.data.vacantes &&
          Array.isArray(response.data.vacantes)
        ) {
          vacantesData = response.data.vacantes;
        } else if (typeof response.data === "object") {
          vacantesData = Object.values(response.data).filter(
            (item) => item && typeof item === "object"
          );
        }

        console.log("Vacantes procesadas:", vacantesData);

        // Corregir problemas con las imágenes
        const vacantesCorregidas = await Promise.all(
          vacantesData.map(async (vacante) => {
            // Asegurarse de que el ID existe
            if (!vacante.id && vacante._id) {
              vacante.id = vacante._id;
            }

            // Manejar el caso específico de "[object Object]"
            if (vacante.image === "[object Object]") {
              // Intentar recuperar la URL correcta de Firebase
              try {
                // Si sabemos que la imagen está en Firebase, podríamos intentar reconstruir la URL
                // Esto es un ejemplo y necesitaría adaptarse a tu estructura específica
                console.log(
                  `Intentando recuperar URL para vacante ${vacante.id}`
                );

                // Si tienes alguna forma de obtener el nombre del archivo original
                // Podrías intentar algo como esto:
                if (vacante.imagePath || vacante.fileName) {
                  const storage = getStorage();
                  const imagePath =
                    vacante.imagePath || `vacancies/${vacante.fileName}`;
                  const imageRef = ref(storage, imagePath);
                  const url = await getDownloadURL(imageRef);
                  vacante.imageUrl = url;
                } else {
                  vacante.imageUrl = null;
                }
              } catch (error) {
                console.error(
                  `Error recuperando URL para ${vacante.id}:`,
                  error
                );
                vacante.imageUrl = null;
              }
            }
            // Si la imagen ya es una URL válida
            else if (
              typeof vacante.image === "string" &&
              vacante.image.startsWith("http")
            ) {
              vacante.imageUrl = vacante.image;
            } else {
              vacante.imageUrl = null;
            }

            return vacante;
          })
        );

        setVacantes(vacantesCorregidas);
      } else {
        setVacantes([]);
        setError("No se recibieron datos del servidor");
      }
    } catch (error) {
      console.error("Error al obtener vacantes:", error);
      setError(`Error al cargar las vacantes: ${error.message}`);
      setVacantes([]);
    } finally {
      setLoading(false);
    }
  };
  // Efecto para cargar vacantes al inicio y cuando cambie refreshCounter
  useEffect(() => {
    obtenerVacantes();
  }, [refreshCounter]);

  // Función para forzar una actualización
  const refreshVacantes = () => {
    setRefreshCounter((prev) => prev + 1);
  };

  const handleDelete = async (id) => {
    if (!id) {
      alert("ID de vacante no válido");
      return;
    }

    const confirm = window.confirm(
      "¿Estás seguro de que querés eliminar la vacante?"
    );

    if (!confirm) return;

    try {
      setLoading(true);
      console.log(`Eliminando vacante con ID: ${id}`);

      const response = await axiosConfig.delete(`/vacancies/${id}`);
      console.log("Respuesta al eliminar:", response);

      // Refrescar la lista después de eliminar
      refreshVacantes();
      alert("Vacante eliminada con éxito");
    } catch (error) {
      console.error("Error al eliminar la vacante:", error);
      alert(`Error al eliminar: ${error.message}`);
      setLoading(false);
    }
  };

  const columns = [
    {
      name: "Titulo",
      selector: (row) => row.nombre || "Sin título",
      sortable: true,
    },
    {
      name: "Descripcion",
      selector: (row) => {
        const desc = row.descripcion || "Sin descripción";
        // Limitar la longitud de la descripción para mejor visualización
        return desc.length > 50 ? `${desc.substring(0, 50)}...` : desc;
      },
      sortable: true,
    },
    {
      name: "Fecha",
      selector: (row) => {
        // Formato de fecha más legible
        try {
          const date = new Date(row.fecha);
          return date.toLocaleDateString("es-ES");
        } catch (e) {
          return row.fecha || "Fecha inválida";
        }
      },
      sortable: true,
    },
    {
      name: "Sector",
      selector: (row) => row.sector || "No especificado",
      sortable: true,
    },
    {
      name: "Estado",
      cell: (row) => {
        const estado = row.estado || "desconocido";
        let colorClass = "bg-gray-200 text-gray-800"; // Por defecto

        // Colores según el estado
        if (estado === "activo") colorClass = "bg-green-200 text-green-800";
        if (estado === "pausado") colorClass = "bg-yellow-200 text-yellow-800";
        if (estado === "borrador") colorClass = "bg-blue-200 text-blue-800";
        if (estado === "terminado" || estado === "cancelado")
          colorClass = "bg-red-200 text-red-800";

        return (
          <span
            className={`px-2 py-1 rounded-full text-xs font-medium ${colorClass}`}
          >
            {estado.charAt(0).toUpperCase() + estado.slice(1)}
          </span>
        );
      },
      sortable: true,
    },
    {
      name: "Imagen",
      cell: (row) => {
        // Usar imageUrl si existe, o intentar extraer una URL válida de row.image
        const imageUrl =
          row.imageUrl ||
          (typeof row.image === "string" && row.image.startsWith("http")
            ? row.image
            : null);

        if (imageUrl) {
          return (
            <div className="relative group">
              <img
                src={imageUrl}
                alt={`Imagen de ${row.nombre || "vacante"}`}
                className="w-16 h-16 object-cover rounded cursor-pointer transition-transform group-hover:scale-105"
                onError={(e) => {
                  console.error(
                    `Error al cargar imagen para vacante ${row.id || "sin ID"}`
                  );
                  e.target.onerror = null;
                  e.target.src = "/placeholder-image.png";
                  e.target.className =
                    "w-16 h-16 object-cover rounded opacity-50";
                }}
              />
              <div className="absolute inset-0 bg-black bg-opacity-0 group-hover:bg-opacity-20 rounded transition-all"></div>
            </div>
          );
        }
        return <span className="text-gray-400">Sin imagen</span>;
      },
      sortable: false,
    },
    {
      name: "Acciones",
      cell: (row) => (
        <div className="flex space-x-2">
          <button
            className="bg-red-500 hover:bg-red-700 text-white font-bold py-2 px-4 rounded"
            onClick={() => handleDelete(row.id || row._id)}
          >
            Eliminar
          </button>
        </div>
      ),
    },
  ];

  const filtrarData = vacantes.filter((vacante) => {
    const searchTerm = filtrarVacantes.toLowerCase();
    const nombre = (vacante.nombre || "").toLowerCase();
    const descripcion = (vacante.descripcion || "").toLowerCase();

    return nombre.includes(searchTerm) || descripcion.includes(searchTerm);
  });

  return (
    <>
      <div className="flex justify-between items-center mb-4">
        <div>
          <h1 className="text-2xl font-bold text-gray-600">
            Lista de Vacantes
          </h1>
          <p className="text-gray-500 text-sm">
            {vacantes.length} vacantes en total
          </p>
        </div>

        <div className="flex items-center space-x-2">
          <input
            className="border border-gray-400 rounded py-2 px-4"
            type="text"
            placeholder="Buscar por nombre o descripción"
            value={filtrarVacantes}
            onChange={(e) => setFiltrarVacantes(e.target.value)}
            disabled={loading}
          />

          <button
            onClick={refreshVacantes}
            className="bg-blue-500 hover:bg-blue-700 text-white py-2 px-4 rounded flex items-center"
            disabled={loading}
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
                d="M4 4v5h.582m15.356 2A8.001 8.001 0 004.582 9m0 0H9m11 11v-5h-.581m0 0a8.003 8.003 0 01-15.357-2m15.357 2H15"
              />
            </svg>
            Actualizar
          </button>
        </div>
      </div>

      {error && (
        <div className="bg-red-100 border border-red-400 text-red-700 px-4 py-3 rounded mb-4">
          {error}
          <button
            onClick={refreshVacantes}
            className="ml-4 bg-red-500 hover:bg-red-700 text-white py-1 px-2 rounded text-sm"
          >
            Reintentar
          </button>
        </div>
      )}

      {loading ? (
        <Loader />
      ) : (
        <div className="bg-white rounded-lg shadow">
          <DataTable
            columns={columns}
            data={filtrarData}
            pagination
            highlightOnHover
            pointerOnHover
            customStyles={customStyles}
            noDataComponent={
              <div className="p-6 text-center text-gray-500">
                No hay vacantes disponibles
              </div>
            }
            progressPending={loading}
          />
        </div>
      )}
    </>
  );
};

export default VacantesTable;
