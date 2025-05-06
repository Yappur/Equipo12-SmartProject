import { useState, useEffect } from "react";
import { Link, useParams } from "react-router-dom";
import DataTable from "react-data-table-component";
import Modal from "../Modal";
import axiosConfig from "../../helpers/axios.config";
import { a } from "framer-motion/client";

const customStyles = {
  headCells: {
    style: {
      backgroundColor: "#f8fafc",
      color: "#152D53",
      fontWeight: "bold",
      fontSize: "14px",
      borderBottom: "1px solid #e2e8f0",
      paddingLeft: "16px",
      paddingRight: "16px",
    },
  },
  rows: {
    style: {
      fontSize: "14px",
      minHeight: "56px",
      borderBottom: "1px solid #f1f5f9",
      "&:hover": {
        backgroundColor: "#f8fafc",
      },
      paddingLeft: "16px",
      paddingRight: "16px",
    },
  },
  pagination: {
    style: {
      backgroundColor: "#ffffff",
      borderTop: "1px solid #e2e8f0",
    },
  },
};

const ApplicationsTable = () => {
  const { id } = useParams();
  const [postulaciones, setPostulaciones] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    if (id) {
      obtenerPostulaciones(id);
    }
  }, [id]);

  const obtenerPostulaciones = async (vacancyId) => {
    try {
      setLoading(true);
      const response = await axiosConfig.get("/applications", {
        params: { vacancyId },
      });
      setPostulaciones(response.data);
      setLoading(false);
    } catch (error) {
      console.error("Error al obtener postulaciones:", error);
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
        if (row.status === "Recibido" || row.status === "En revisión")
          colorClass = "bg-yellow-200 text-yellow-800";
        if (row.status === "Entrevista")
          colorClass = "bg-blue-200 text-blue-800";
        if (row.status === "Descartado") colorClass = "bg-red-200 text-red-800";

        return (
          <div className="flex flex-col">
            <select
              value={row.status}
              onChange={(e) => actualizarEstado(row.id, e.target.value, id)}
              className={`text-sm border border-gray-300 rounded-4xl px-2 py-1 ${colorClass}  `}
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
        <Link to={`${row.file}`} target="_blank">
          Ver CV
        </Link>
      ),
    },
  ];

  return (
    <>
      <div className="bg-white p-6 rounded-lg shadow-sm mx-50 my-30 ">
        <div className="flex  items-center mb-4">
          <div>
            <h1 className="text-2xl font-bold text-gray-600">
              Lista de Postulaciones de la Vacante
            </h1>
            <p>Cantidad de postulados: {postulaciones.length}</p>
          </div>
        </div>
        <div className="">
          <DataTable
            columns={columns}
            data={postulaciones}
            pagination
            highlightOnHover
            customStyles={customStyles}
            noDataComponent="No hay postulantes disponibles"
            progressPending={loading}
            progressComponent={<div>Cargando datos...</div>}
          />
        </div>
      </div>
    </>
  );
};

export default ApplicationsTable;
