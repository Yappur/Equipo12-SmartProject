import React, { useState, useEffect } from "react";
import DataTable from "react-data-table-component";
import SearchBar from "./SearchBar";
import { Link } from "react-router-dom";
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

const VacanciesTable = () => {
  const [filtrarVacantes, setFiltrarVacantes] = useState("");
  const [vacantes, setVacantes] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  const obtenerVacantes = async () => {
    try {
      setLoading(true);
      setError(null);

      const response = await axiosConfig.get("/vacancies");
      setVacantes(response.data);
    } catch (error) {
      setError(`Error al cargar las vacantes: ${error.message}`);
      setVacantes([]);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    obtenerVacantes();
  }, []);

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
      const response = await axiosConfig.delete(`/vacancies/${id}`);
      refreshVacantes();
      alert("Vacante eliminada con éxito");
    } catch (error) {
      alert(`Error al eliminar: ${error.message}`);
      setLoading(false);
    }
  };

  const columns = [
    {
      name: "Titulo",
      cell: (row) => (
        <div className="group relative">
          <a
            href={`/reclutador/ver/candidatos/${row.id}`}
            className="text-blue-600 hover:text-blue-800 hover:underline cursor-pointer font-medium"
            title={`Ver dashboard de ${row.nombre || "Sin título"}`}
          >
            {row.nombre || "Sin título"}
          </a>
        </div>
      ),
      sortable: true,
    },
    {
      name: "Descripcion",
      selector: (row) => {
        const desc = row.descripcion || "Sin descripción";
        return desc.length > 50 ? `${desc.substring(0, 50)}...` : desc;
      },
      sortable: true,
    },
    {
      name: "Fecha",
      selector: (row) => {
        try {
          return new Date(row.fecha).toLocaleDateString("es-AR");
        } catch {
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
      name: "Modalidad",
      selector: (row) => row.sector || "No especificado",
      sortable: true,
    },
    {
      name: "Estado",
      cell: (row) => {
        const estado = row.estado || "desconocido";
        let colorClass = "bg-gray-200 text-gray-800";

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
        if (row.imageUrl) {
          return (
            <div className="relative group">
              <img
                src={row.imageUrl}
                alt={`Imagen de ${row.nombre || "vacante"}`}
                className="w-16 h-16 object-cover rounded cursor-pointer transition-transform group-hover:scale-105"
                onError={(e) => {
                  e.target.onerror = null;
                  e.target.src = "";
                  e.target.className =
                    "w-16 h-16 object-cover rounded opacity-50";
                }}
              />
              <div className="absolute inset-0 bg-opacity-0 group-hover:bg-opacity-20 rounded transition-all"></div>
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
          <SearchBar
            value={filtrarVacantes}
            onChange={setFiltrarVacantes}
            disabled={loading}
          />
          <p className="text-gray-500 text-sm">
            {vacantes.length} vacantes en total
          </p>
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

export default VacanciesTable;
