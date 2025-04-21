import React, { useState, useEffect } from "react";
import DataTable from "react-data-table-component";
import axiosConfig from "../../helpers/axios.config";

const columns = [
  {
    name: "Nombre",
    selector: (row) => row.name,
    sortable: true,
  },
  {
    name: "Email",
    selector: (row) => row.email,
    sortable: true,
  },
  {
    name: "Rol",
    selector: (row) => (
      <select
        value={row.role || "reclutador"}
        onChange={(e) => handleChangeRol(row.id, e.target.value)}
      >
        <option value="superAdmin">Super Admin</option>
        <option value="reclutador">Reclutador</option>
      </select>
    ),
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
const UserTable = () => {
  const [filtrarUsuarios, setFiltrarUsuarios] = useState("");
  const [usuarios, setUsuarios] = useState([]);

  const obtenerUsuarios = async () => {
    try {
      console.log("Intentando obtener usuarios...");
      const response = await axiosConfig.get("/users");
      console.log("Respuesta exitosa:", response);

      if (response.data && Array.isArray(response.data)) {
        setUsuarios(response.data);
      } else if (response.data && Array.isArray(response.data.users)) {
        setUsuarios(response.data.users);
      } else {
        console.error("Formato de respuesta inesperado:", response.data);
        setUsuarios([]);
      }
    } catch (error) {
      console.error("Error al obtener usuarios:", error);
      console.log("URL que causó el error:", error.config?.url);
      console.log("Método:", error.config?.method);
    }
  };

  useEffect(() => {
    obtenerUsuarios();
  }, []);

  const filtrarData = usuarios.filter(
    (user) =>
      user.name.toLowerCase().includes(filtrarUsuarios.toLowerCase()) ||
      user.email.toLowerCase().includes(filtrarUsuarios.toLowerCase())
  );

  return (
    <div className="container mx-auto ">
      <div className="flex justify-between items-center mt-5">
        <h1 className="text-2xl font-bold text-gray-600 mb-4">
          Lista de Usuarios
        </h1>
        <input
          className="border border-gray-400 rounded py-2 px-4 mb-4"
          type="text"
          placeholder="Buscar Nombre o Email"
          value={filtrarUsuarios}
          onChange={(e) => setFiltrarUsuarios(e.target.value)}
        />
      </div>
      <DataTable
        columns={columns}
        data={filtrarData}
        pagination
        highlightOnHover
        customStyles={customStyles}
        noDataComponent="No hay usuarios disponibles"
      />
    </div>
  );
};

export default UserTable;
