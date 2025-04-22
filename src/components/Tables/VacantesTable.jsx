import React, { useState, useEffect } from "react";
import DataTable from "react-data-table-component";
import axiosConfig from "../../helpers/axios.config";

const columns = [
  {
    name: "Titulo",
    selector: (row) => row.nombre,
    sortable: true,
  },
  {
    name: "Descripcion",
    selector: (row) => row.descripcion,
    sortable: true,
  },
  {
    name: "Fecha",
    selector: (row) => row.fecha,
    sortable: true,
  },
  {
    name: "Estado",
    selector: (row) => row.estado,
    sortable: true,
  },
  {
    name: "Imagen",
    selector: (row) => row.img,
    sortable: true,
  },
  {
    name: "Acciones",
    cell: (row) => (
      <button
        className="bg-red-500 hover:bg-red-900 text-white font-bold py-2 px-4 rounded"
        onClick={() => handleEliminar(row.id)}
      >
        Eliminar
      </button>
    ),
  },
];

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

  const obtenerVacantes = async () => {
    try {
      setLoading(true);
      setError(null);
      const response = await axiosConfig.get("/products");

      if (response.data && Array.isArray(response.data)) {
        setVacantes(response.data);
      } else if (response.data && Array.isArray(response.data.vacantes)) {
        setVacantes(response.data.vacantes);
      } else {
        setVacantes([]);
        setError("No se pudieron cargar los datos correctamente");
      }
    } catch (error) {
      setError("Error al cargar los vacantes. Intente nuevamente.");
      setVacantes([]);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    obtenerVacantes();
  }, []);

  const filtrarData = vacantes.filter(
    (vacantes) =>
      (vacantes.nombre?.toLowerCase() || "").includes(
        filtrarVacantes.toLowerCase()
      ) ||
      (vacantes.descripcion?.toLowerCase() || "").includes(
        filtrarVacantes.toLowerCase()
      )
  );

  return (
    <div className="container mx-auto my-20">
      <div className="flex justify-between items-center ">
        <h1 className="text-2xl font-bold text-gray-600 mb-4">
          Lista de Vacantes
        </h1>
        <input
          className="border border-gray-400 rounded py-2 px-4 mb-4"
          type="text"
          placeholder="Buscar Nombre o Email"
          value={filtrarVacantes}
          onChange={(e) => setFiltrarVacantes(e.target.value)}
          disabled={loading}
        />
      </div>

      {error && (
        <div className="bg-red-100 border border-red-400 text-red-700 px-4 py-3 rounded mb-4">
          {error}
          <button
            onClick={obtenerVacantes}
            className="ml-4 bg-red-500 hover:bg-red-700 text-white py-1 px-2 rounded text-sm"
          >
            Reintentar
          </button>
        </div>
      )}

      {loading ? (
        <Loader />
      ) : (
        <DataTable
          columns={columns}
          data={filtrarData}
          pagination
          highlightOnHover
          customStyles={customStyles}
          noDataComponent="No hay Vacantes disponibles"
        />
      )}
    </div>
  );
};

export default VacantesTable;
